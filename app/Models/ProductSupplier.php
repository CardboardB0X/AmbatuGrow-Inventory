<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSupplier extends Model
{
    protected $table = 'product_supplier';


    protected $fillable = ['product_id', 'supplier_id', 'supplier_sku', 'unit_price', 'lead_time_days', 'is_preferred'];


    public function product() {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
    public function supplier() {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }
        
}
