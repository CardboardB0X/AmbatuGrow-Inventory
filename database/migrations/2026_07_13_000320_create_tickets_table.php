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
        Schema::create('tickets', function (Blueprint $table) {
            
            $table->id('ticket_id');
            $table->foreignId('customer_id')->constrained('customers', 'customer_id');
            $table->foreignId('order_id')->nullable()->constrained('sales_orders', 'order_id')->nullOnDelete();
            $table->string('subject', 255);
            $table->enum('priority', ['Low', 'Medium', 'High', 'Critical']);
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
