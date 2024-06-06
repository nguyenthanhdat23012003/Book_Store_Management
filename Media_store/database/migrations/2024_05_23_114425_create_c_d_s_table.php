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
        Schema::create('CompactDiscs', function (Blueprint $table) {
            $table->id();
            $table->string('collections');
            $table->json('albums')->nullable();
            $table->json('artists')->nullable();
            $table->json('record_label')->nullable();
            $table->json('track_list')->nullable();
            $table->timestamp('release_date');

            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('CompactDiscs');
    }
};
