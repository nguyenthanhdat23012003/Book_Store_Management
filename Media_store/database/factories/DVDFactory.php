<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DVD>
 */
class DVDFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'disc_type' => fake()->randomElement(['Blu-ray', 'HD-DVD']),
            'director' => fake()->name(),
            'runtime' => rand(60, 180), // Random runtime between 1 and 3 hours
            'studio' => fake()->company(),
            'language' => fake()->languageCode(),
            'release_date' => fake()->date(),
        ];
    }
}
