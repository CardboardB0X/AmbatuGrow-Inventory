<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $table = 'shipments';
    protected $primaryKey = 'shipment_id';

    protected $fillable = ['reference_type', 'reference_id', 'destination_address_id'];


    public function destinationAddress() {
        return $this->belongsTo(Address::class, 'destination_address_id', 'address_id');
    }
        
}
