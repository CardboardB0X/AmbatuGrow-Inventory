<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';
    protected $primaryKey = 'address_id';

    protected $fillable = ['street', 'city', 'province', 'zipcode', 'country'];


    public function users() {
        return $this->hasMany(User::class, 'address_id', 'address_id');
    }
    public function warehouses() {
        return $this->hasMany(Warehouse::class, 'address_id', 'address_id');
    }

        
}
