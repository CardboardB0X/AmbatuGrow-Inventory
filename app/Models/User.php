<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'user_id';

    protected $fillable = ['username', 'password_hash', 'email', 'role_id', 'status'];


    public function role() {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

        
}
