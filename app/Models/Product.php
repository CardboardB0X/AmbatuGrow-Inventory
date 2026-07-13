<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'product_id';

    protected $fillable = ['sku', 'name', 'description', 'category_id', 'uom_id', 'currency_id', 'base_price', 'min_quantity_threshold', 'lead_time_days'];

    protected $casts = [
        'base_price' => 'float',
        'min_quantity_threshold' => 'float',
    ];


    public function category() {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }
    public function uom() {
        return $this->belongsTo(UnitOfMeasure::class, 'uom_id', 'uom_id');
    }
    public function currency() {
        return $this->belongsTo(Currency::class, 'currency_id', 'currency_id');
    }
    public function inventoryLocations() {
        return $this->hasMany(InventoryLocation::class, 'product_id', 'product_id');
    }
    public function stockTransactions() {
        return $this->hasMany(StockTransaction::class, 'product_id', 'product_id');
    }

        
}
