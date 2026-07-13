<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'currencies';
    protected $primaryKey = 'currency_id';

    protected $fillable = ['currency_code', 'currency_name', 'exchange_rate'];

    protected $casts = [
        'exchange_rate' => 'float',
    ];


    public function products() {
        return $this->hasMany(Product::class, 'currency_id', 'currency_id');
    }

        
}
