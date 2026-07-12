<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoItem extends Model
{
    protected $table = 'po_items';
    protected $primaryKey = 'po_item_id';

    protected $fillable = ['po_id', 'product_id', 'quantity', 'uom_id', 'unit_price'];


    public function purchaseOrder() {
        return $this->belongsTo(PurchaseOrder::class, 'po_id', 'po_id');
    }
    public function product() {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
    public function uom() {
        return $this->belongsTo(UnitOfMeasure::class, 'uom_id', 'uom_id');
    }
        
}
