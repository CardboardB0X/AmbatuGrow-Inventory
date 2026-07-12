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
        Schema::create('inventory_locations', function (Blueprint $table) {
            
            $table->id('inventory_id');
            $table->foreignId('product_id')->constrained('products', 'product_id');
            $table->foreignId('warehouse_id')->constrained('warehouses', 'warehouse_id');
            $table->foreignId('zone_id')->constrained('warehouse_zones', 'zone_id');
            $table->decimal('quantity', 10, 2);
            $table->date('expiration_date')->nullable();
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_locations');
    }
};
