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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->string('province');
            $table->string('address');
            $table->enum('status', ['inprogress', 'completed', 'rejected'])->default('inprogress');
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('rejected_at')->nullable();

            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
