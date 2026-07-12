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
        Schema::create('sales_orders', function (Blueprint $table) {
            
            $table->id('order_id');
            $table->foreignId('customer_id')->constrained('customers', 'customer_id');
            $table->unsignedBigInteger('rep_id')->nullable();
            $table->datetime('order_date');
            $table->string('status', 50);
            $table->foreignId('payment_term_id')->constrained('payment_terms', 'payment_term_id');
            $table->foreignId('currency_id')->constrained('currencies', 'currency_id');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_orders');
    }
};
