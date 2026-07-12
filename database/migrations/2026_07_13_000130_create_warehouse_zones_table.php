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
        Schema::create('warehouse_zones', function (Blueprint $table) {
            
            $table->id('zone_id');
            $table->foreignId('warehouse_id')->constrained('warehouses', 'warehouse_id');
            $table->string('zone_name', 50);
            $table->string('category', 50);
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouse_zones');
    }
};
