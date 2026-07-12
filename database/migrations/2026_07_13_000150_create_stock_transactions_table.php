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
        Schema::create('stock_transactions', function (Blueprint $table) {
            
            $table->id('transaction_id');
            $table->foreignId('product_id')->constrained('products', 'product_id');
            $table->foreignId('warehouse_id')->constrained('warehouses', 'warehouse_id');
            $table->enum('transaction_type', ['Stock-in', 'Stock-out', 'Transfer']);
            $table->decimal('quantity', 10, 2);
            $table->datetime('transaction_date');
            $table->nullableMorphs('reference');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_transactions');
    }
};
