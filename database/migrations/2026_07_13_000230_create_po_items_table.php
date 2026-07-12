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
        Schema::create('po_items', function (Blueprint $table) {
            
            $table->id('po_item_id');
            $table->foreignId('po_id')->constrained('purchase_orders', 'po_id')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products', 'product_id');
            $table->decimal('quantity', 10, 2);
            $table->foreignId('uom_id')->constrained('units_of_measure', 'uom_id');
            $table->decimal('unit_price', 10, 2);
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('po_items');
    }
};
