<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentTerm extends Model
{
    protected $table = 'payment_terms';
    protected $primaryKey = 'payment_term_id';

    protected $fillable = ['term_code', 'description', 'net_days', 'discount_percent'];


    public function purchaseOrders() {
        return $this->hasMany(PurchaseOrder::class, 'payment_term_id', 'payment_term_id');
    }
    public function salesOrders() {
        return $this->hasMany(SalesOrder::class, 'payment_term_id', 'payment_term_id');
    }
        
}
