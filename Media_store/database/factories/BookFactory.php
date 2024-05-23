<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $authors = [];
        for ($i = 0; $i < rand(1, 3); $i++) {
            $authors[] = fake()->name();
        }
        return [
            'authors' => json_encode($authors),
            'cover_type' => fake()->randomElement(['hardcover', 'paperback']),
            'publisher' => fake()->company(),
            'pages' => fake()->numberBetween(100, 1000),
            'language' => fake()->languageCode(),
            'publication_date' => fake()->date(),
        ];
    }
}
