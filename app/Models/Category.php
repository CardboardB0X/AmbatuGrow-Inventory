<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    protected $fillable = ['category_name', 'parent_category_id'];


    public function parent() {
        return $this->belongsTo(Category::class, 'parent_category_id', 'category_id');
    }
    public function children() {
        return $this->hasMany(Category::class, 'parent_category_id', 'category_id');
    }
    public function products() {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }
        
}
