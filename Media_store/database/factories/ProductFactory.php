<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
        $type = ['book', 'cd', 'dvd'];
        $genre = ['fiction', 'comedy', 'drama', 'action', 'horror', 'romance', 'thriller'];
        return [
            'name' => fake()->sentence(),
            'type' => fake()->randomElement($type),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'price' => fake()->numberBetween(10, 100) * 1000,
            'in_stock' => fake()->numberBetween(0, 100),
            'genre' => fake()->randomElement($genre),
            'weight' => fake()->numberBetween(100, 1000),
            'created_at' => fake()->dateTimeBetween('-1 year', '-6 months'),
            'updated_at' => fake()->dateTimeBetween('-6 months', 'now')
        ];
    }
}
