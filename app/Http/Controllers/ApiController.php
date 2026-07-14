<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\Address;
use App\Models\UnitOfMeasure;
use App\Models\Currency;
use App\Models\Category;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\WarehouseZone;
use App\Models\InventoryLocation;
use App\Models\StockTransaction;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    /**
     * Get the current state of the database.
     */
    public function getLatestState()
    {
        return response()->json([
            'roles' => Role::all(),
            'users' => User::all()->map(function($u) {
                $arr = $u->toArray();
                $arr['password'] = match($u->username) {
                    'admin' => 'admin123',
                    'officer' => 'officer123',
                    'procurement' => 'procure123',
                    'logistics' => 'logistics123',
                    'sales' => 'sales123',
                    'finance' => 'finance123',
                    default => 'password123'
                };
                $arr['name'] = match($u->username) {
                    'admin' => 'System Admin',
                    'officer' => 'Inventory Officer',
                    'procurement' => 'Procurement Officer',
                    'logistics' => 'Logistics Coordinator',
                    'sales' => 'Sales Manager',
                    'finance' => 'Finance Accountant',
                    default => 'User'
                };
                return $arr;
            }),
            'addresses' => Address::all(),
            'units_of_measure' => UnitOfMeasure::all(),
            'currencies' => Currency::all(),
            'categories' => Category::all(),
            'products' => Product::all()->map(function($p) {
                $arr = $p->toArray();
                $arr['status'] = 'Active';
                $arr['max_quantity_threshold'] = $p->min_quantity_threshold * 10;
                return $arr;
            }),
            'warehouses' => Warehouse::all(),
            'warehouse_zones' => WarehouseZone::all(),
            'inventory_locations' => InventoryLocation::all(),
            'stock_transactions' => StockTransaction::all(),
        ]);
    }

    /**
     * Add a new product + allocate initial stock + log transaction.
     */
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|unique:products,sku',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'category_id' => 'required|integer',
            'uom_id' => 'required|integer',
            'currency_id' => 'required|integer',
            'base_price' => 'required|numeric',
            'min_quantity_threshold' => 'required|numeric',
            'lead_time_days' => 'required|integer',
            'init_zone_id' => 'nullable|integer',
            'init_qty' => 'nullable|numeric',
            'init_expiration' => 'nullable|date',
        ]);

        return DB::transaction(function() use ($validated) {
            $product = Product::create([
                'sku' => $validated['sku'],
                'name' => $validated['name'],
                'description' => $validated['description'] ?? '',
                'category_id' => $validated['category_id'],
                'uom_id' => $validated['uom_id'],
                'currency_id' => $validated['currency_id'],
                'base_price' => $validated['base_price'],
                'min_quantity_threshold' => $validated['min_quantity_threshold'],
                'lead_time_days' => $validated['lead_time_days'],
            ]);

            $initZoneId = $validated['init_zone_id'] ?? null;
            $initQty = $validated['init_qty'] ?? 0;

            if ($initZoneId && $initQty > 0) {
                $zone = WarehouseZone::findOrFail($initZoneId);

                $location = InventoryLocation::create([
                    'product_id' => $product->product_id,
                    'warehouse_id' => $zone->warehouse_id,
                    'zone_id' => $zone->zone_id,
                    'quantity' => $initQty,
                    'expiration_date' => $validated['init_expiration'] ?? null,
                ]);

                StockTransaction::create([
                    'product_id' => $product->product_id,
                    'warehouse_id' => $zone->warehouse_id,
                    'transaction_type' => 'Stock-in',
                    'quantity' => $initQty,
                    'transaction_date' => now(),
                ]);
            }

            return response()->json($product, 201);
        });
    }

    /**
     * Update product details.
     */
    public function updateProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    /**
     * Discontinue and delete a product (and cascade deletion to locations & logs).
     */
    public function deleteProduct($id)
    {
        return DB::transaction(function() use ($id) {
            $product = Product::findOrFail($id);
            StockTransaction::where('product_id', $id)->delete();
            InventoryLocation::where('product_id', $id)->delete();
            $product->delete();
            return response()->json(null, 204);
        });
    }

    /**
     * Relocate stock between warehouse zones.
     */
    public function executeTransfer(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'source_zone_id' => 'required|integer',
            'dest_zone_id' => 'required|integer',
            'quantity' => 'required|numeric|min:0.01',
        ]);

        return DB::transaction(function() use ($validated) {
            $srcZone = WarehouseZone::findOrFail($validated['source_zone_id']);
            $destZone = WarehouseZone::findOrFail($validated['dest_zone_id']);
            $qty = $validated['quantity'];

            // Deduct from source
            $srcLoc = InventoryLocation::where('product_id', $validated['product_id'])
                ->where('zone_id', $srcZone->zone_id)
                ->firstOrFail();

            if ($srcLoc->quantity < $qty) {
                return response()->json(['error' => 'Insufficient stock in source zone.'], 422);
            }

            $srcLoc->quantity -= $qty;
            if ($srcLoc->quantity <= 0) {
                $srcLoc->delete();
            } else {
                $srcLoc->save();
            }

            // Add to destination
            $destLoc = InventoryLocation::where('product_id', $validated['product_id'])
                ->where('zone_id', $destZone->zone_id)
                ->first();

            if ($destLoc) {
                $destLoc->quantity += $qty;
                $destLoc->save();
            } else {
                InventoryLocation::create([
                    'product_id' => $validated['product_id'],
                    'warehouse_id' => $destZone->warehouse_id,
                    'zone_id' => $destZone->zone_id,
                    'quantity' => $qty,
                    'expiration_date' => $srcLoc->expiration_date ?? null,
                ]);
            }

            // Log Transaction
            StockTransaction::create([
                'product_id' => $validated['product_id'],
                'warehouse_id' => $destZone->warehouse_id,
                'transaction_type' => 'Transfer',
                'quantity' => $qty,
                'transaction_date' => now(),
            ]);

            return response()->json(['success' => true]);
        });
    }

    /**
     * Perform standard stock-in / stock-out adjustment.
     */
    public function adjustStock(Request $request)
    {
        $validated = $request->validate([
            'inventory_id' => 'required|integer',
            'action' => 'required|in:in,out',
            'quantity' => 'required|numeric|min:0.01',
        ]);

        return DB::transaction(function() use ($validated) {
            $loc = InventoryLocation::findOrFail($validated['inventory_id']);
            $qty = $validated['quantity'];
            $type = $validated['action'] === 'in' ? 'Stock-in' : 'Stock-out';

            if ($validated['action'] === 'in') {
                $loc->quantity += $qty;
                $loc->save();
            } else {
                if ($loc->quantity < $qty) {
                    return response()->json(['error' => 'Insufficient stock in target location.'], 422);
                }
                $loc->quantity -= $qty;
                if ($loc->quantity <= 0) {
                    $loc->delete();
                } else {
                    $loc->save();
                }
            }

            // Log Transaction
            StockTransaction::create([
                'product_id' => $loc->product_id,
                'warehouse_id' => $loc->warehouse_id,
                'transaction_type' => $type,
                'quantity' => $qty,
                'transaction_date' => now(),
            ]);

            return response()->json(['success' => true]);
        });
    }
}
