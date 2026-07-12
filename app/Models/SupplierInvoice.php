<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierInvoice extends Model
{
    protected $table = 'supplier_invoices';
    protected $primaryKey = 'invoice_id';

    protected $fillable = ['supplier_id', 'po_id', 'invoice_number', 'invoice_date', 'due_date'];


    public function supplier() {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }
    public function purchaseOrder() {
        return $this->belongsTo(PurchaseOrder::class, 'po_id', 'po_id');
    }
        
}
