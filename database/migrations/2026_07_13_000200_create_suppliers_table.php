<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            
            $table->id('supplier_id');
            $table->string('supplier_name', 255);
            $table->string('category', 100);
            $table->string('email', 100);
            $table->string('phone', 20);
            $table->foreignId('address_id')->constrained('addresses', 'address_id');
            $table->enum('status', ['Active', 'Inactive', 'Blacklisted'])->default('Active');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
