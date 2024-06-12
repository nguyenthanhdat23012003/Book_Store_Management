<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['book', 'cd', 'dvd']);
        $genre = ['fiction', 'comedy', 'drama', 'action', 'horror', 'romance', 'thriller'];
        $path = '';
        switch ($type) {
            case 'book':
                $files = Storage::disk('public')->allFiles('books');
                $path = $files[array_rand($files)];
                break;
            case 'cd':
                $files = Storage::disk('public')->allFiles('cds');
                $path = $files[array_rand($files)];
                break;
            case 'dvd':
                $files = Storage::disk('public')->allFiles('dvds');
                $path = $files[array_rand($files)];
                break;
        }
        return [
            'name' => fake()->sentence(rand(2, 4)),
            'type' => $type,
            'image_path' => $path,
            'description' => fake()->realText(),
            'price' => fake()->numberBetween(10, 100) * 1000,
            'in_stock' => fake()->numberBetween(0, 100),
            'genre' => fake()->randomElement($genre),
            'weight' => fake()->numberBetween(100, 1000),
            'rating' => fake()->randomFloat(1, 1, 5), // 'rating' => '1.0', 'rating' => '2.0', 'rating' => '3.0', 'rating' => '4.0', 'rating' => '5.0
            'sold' => fake()->numberBetween(0, 10000),
            'created_at' => fake()->dateTimeBetween('-1 year', '-6 months'),
            'updated_at' => fake()->dateTimeBetween('-6 months', 'now')
        ];
    }
}
