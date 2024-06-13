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
        Schema::create('DigitalVideoDiscs', function (Blueprint $table) {
            $table->id();
            $table->enum('disc_type', ['Blu-ray', 'HD-DVD']);
            $table->json('director');
            $table->json('actors')->nullable();
            $table->json('writer')->nullable();
            $table->string('runtime')->nullable();
            $table->string('language')->nullable();
            $table->string('country')->nullable();
            $table->timestamp('release_date')->nullable();

            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DigitalVideoDiscs');
    }
};
