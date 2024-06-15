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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->string('image_path');
            $table->text('description')->nullable();
            $table->integer('price');
            $table->integer('in_stock');
            $table->json('genre');
            $table->integer('weight');
            $table->decimal('avgRating', 2, 1)->default(0);
            $table->integer('ratingsCount')->default(0);
            $table->integer('sold')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
