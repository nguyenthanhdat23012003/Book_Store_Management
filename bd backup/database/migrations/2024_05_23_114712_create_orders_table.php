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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('shipping_fee');
            $table->integer('free_ship_discount');
            $table->integer('total_price');
            $table->enum('status', ['pending', 'completed', 'cancel'])->default('pending');
            $table->enum('delivery_type', ['normal', 'rush']);
            $table->timestamp('cancel_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->foreignId('cart_id')->constrained('carts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
