<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $table = 'warehouses';
    protected $primaryKey = 'warehouse_id';

    protected $fillable = ['name', 'address_id', 'capacity_sqm'];


    public function address() {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }
    public function zones() {
        return $this->hasMany(WarehouseZone::class, 'warehouse_id', 'warehouse_id');
    }
    public function inventoryLocations() {
        return $this->hasMany(InventoryLocation::class, 'warehouse_id', 'warehouse_id');
    }
    public function stockTransactions() {
        return $this->hasMany(StockTransaction::class, 'warehouse_id', 'warehouse_id');
    }
        
}
