<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'tickets';
    protected $primaryKey = 'ticket_id';

    protected $fillable = ['customer_id', 'order_id', 'subject', 'priority'];


    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }
    public function salesOrder() {
        return $this->belongsTo(SalesOrder::class, 'order_id', 'order_id');
    }
        
}
