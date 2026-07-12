<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillingDetail extends Model
{
    protected $table = 'billing_details';
    protected $primaryKey = 'billing_id';

    protected $fillable = ['order_id', 'address_id', 'payment_method'];


    public function salesOrder() {
        return $this->belongsTo(SalesOrder::class, 'order_id', 'order_id');
    }
    public function address() {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }
        
}
