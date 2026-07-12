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
        Schema::create('shipments', function (Blueprint $table) {
            
            $table->id('shipment_id');
            $table->enum('reference_type', ['Inbound', 'Outbound']);
            $table->unsignedBigInteger('reference_id');
            $table->foreignId('destination_address_id')->constrained('addresses', 'address_id');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
