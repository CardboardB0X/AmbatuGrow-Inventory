<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $primaryKey = 'customer_id';

    protected $fillable = ['first_name', 'last_name', 'email', 'phone', 'address_id'];


    public function address() {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }
    public function salesOrders() {
        return $this->hasMany(SalesOrder::class, 'customer_id', 'customer_id');
    }
    public function tickets() {
        return $this->hasMany(Ticket::class, 'customer_id', 'customer_id');
    }
        
}
