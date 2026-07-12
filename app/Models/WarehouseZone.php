<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WarehouseZone extends Model
{
    protected $table = 'warehouse_zones';
    protected $primaryKey = 'zone_id';

    protected $fillable = ['warehouse_id', 'zone_name', 'category'];


    public function warehouse() {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'warehouse_id');
    }
    public function inventoryLocations() {
        return $this->hasMany(InventoryLocation::class, 'zone_id', 'zone_id');
    }
        
}
