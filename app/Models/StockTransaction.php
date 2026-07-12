<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockTransaction extends Model
{
    protected $table = 'stock_transactions';
    protected $primaryKey = 'transaction_id';

    protected $fillable = ['product_id', 'warehouse_id', 'transaction_type', 'quantity', 'transaction_date', 'reference_id', 'reference_type'];


    public function product() {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
    public function warehouse() {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'warehouse_id');
    }
    public function reference() {
        return $this->morphTo();
    }
        
}
