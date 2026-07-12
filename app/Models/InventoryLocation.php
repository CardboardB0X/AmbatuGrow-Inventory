<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryLocation extends Model
{
    protected $table = 'inventory_locations';
    protected $primaryKey = 'inventory_id';

    protected $fillable = ['product_id', 'warehouse_id', 'zone_id', 'quantity', 'expiration_date'];


    public function product() {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
    public function warehouse() {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'warehouse_id');
    }
    public function zone() {
        return $this->belongsTo(WarehouseZone::class, 'zone_id', 'zone_id');
    }
        
}
