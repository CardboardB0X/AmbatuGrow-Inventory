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
        Schema::create('purchase_orders', function (Blueprint $table) {
            
            $table->id('po_id');
            $table->string('po_number', 50)->unique();
            $table->foreignId('supplier_id')->constrained('suppliers', 'supplier_id');
            $table->unsignedBigInteger('requisition_id')->nullable();
            $table->foreignId('payment_term_id')->constrained('payment_terms', 'payment_term_id');
            $table->foreignId('currency_id')->constrained('currencies', 'currency_id');
            $table->string('status', 50);
            $table->datetime('order_date');
            $table->foreignId('created_by')->constrained('users', 'user_id');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
