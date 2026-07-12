<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitOfMeasure extends Model
{
    protected $table = 'units_of_measure';
    protected $primaryKey = 'uom_id';

    protected $fillable = ['uom_code', 'uom_name', 'description'];


    public function products() {
        return $this->hasMany(Product::class, 'uom_id', 'uom_id');
    }

        
}
