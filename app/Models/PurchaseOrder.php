<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    protected $table = 'purchase_orders';
    protected $primaryKey = 'po_id';

    protected $fillable = ['po_number', 'supplier_id', 'requisition_id', 'payment_term_id', 'currency_id', 'status', 'order_date', 'created_by'];


    public function supplier() {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }
    public function paymentTerm() {
        return $this->belongsTo(PaymentTerm::class, 'payment_term_id', 'payment_term_id');
    }
    public function currency() {
        return $this->belongsTo(Currency::class, 'currency_id', 'currency_id');
    }
    public function creator() {
        return $this->belongsTo(User::class, 'created_by', 'user_id');
    }
    public function items() {
        return $this->hasMany(PoItem::class, 'po_id', 'po_id');
    }
    public function invoices() {
        return $this->hasMany(SupplierInvoice::class, 'po_id', 'po_id');
    }
        
}
