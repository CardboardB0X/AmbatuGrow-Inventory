<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    protected $table = 'sales_orders';
    protected $primaryKey = 'order_id';

    protected $fillable = ['customer_id', 'rep_id', 'order_date', 'status', 'payment_term_id', 'currency_id'];


    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }
    public function paymentTerm() {
        return $this->belongsTo(PaymentTerm::class, 'payment_term_id', 'payment_term_id');
    }
    public function currency() {
        return $this->belongsTo(Currency::class, 'currency_id', 'currency_id');
    }
    public function billingDetails() {
        return $this->hasMany(BillingDetail::class, 'order_id', 'order_id');
    }
    public function tickets() {
        return $this->hasMany(Ticket::class, 'order_id', 'order_id');
    }
        
}
