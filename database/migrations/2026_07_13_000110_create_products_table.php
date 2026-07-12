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
        Schema::create('products', function (Blueprint $table) {
            
            $table->id('product_id');
            $table->string('sku', 50)->unique();
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->foreignId('category_id')->constrained('categories', 'category_id');
            $table->foreignId('uom_id')->constrained('units_of_measure', 'uom_id');
            $table->foreignId('currency_id')->constrained('currencies', 'currency_id');
            $table->decimal('base_price', 10, 2);
            $table->decimal('min_quantity_threshold', 10, 2);
            $table->integer('lead_time_days');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
