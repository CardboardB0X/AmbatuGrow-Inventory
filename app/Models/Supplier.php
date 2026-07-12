<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $table = 'suppliers';
    protected $primaryKey = 'supplier_id';

    protected $fillable = ['supplier_name', 'category', 'email', 'phone', 'address_id', 'status'];


    public function address() {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }
    public function products() {
        return $this->belongsToMany(Product::class, 'product_supplier', 'supplier_id', 'product_id')
                    ->withPivot('supplier_sku', 'unit_price', 'lead_time_days', 'is_preferred')
                    ->withTimestamps();
    }
    public function purchaseOrders() {
        return $this->hasMany(PurchaseOrder::class, 'supplier_id', 'supplier_id');
    }
    public function invoices() {
        return $this->hasMany(SupplierInvoice::class, 'supplier_id', 'supplier_id');
    }
        
}
