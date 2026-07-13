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

class DashboardController extends Controller
{
    /**
     * Display the main inventory dashboard.
     */
    public function index()
    {
        $appState = [
            'isAuthenticated' => false,
            'currentUser' => null,
            'activeTab' => 'dashboard',
            'isDark' => false,
            'simActive' => false,
            'simInterval' => null,
            'currency' => 'PHP',
            
            // Database-driven tables
            'roles' => Role::all(),
            'users' => User::all()->map(function($u) {
                $arr = $u->toArray();
                $arr['password'] = $u->username === 'admin' ? 'admin123' : 'officer123';
                $arr['name'] = $u->username === 'admin' ? 'System Admin' : 'Inventory Officer';
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
        ];

        return view('dashboard', compact('appState'));
    }
}
