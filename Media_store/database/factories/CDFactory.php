<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CD>
 */
class CDFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $numberOfTracks = rand(5, 15); // Random number of tracks
        $tracks = [];
        $track_list = [];
        $rand_min = 0;

        for ($i = 0; $i < $numberOfTracks; $i++) {
            $rand_min += rand(2, 5); // Randomly increment the duration by 2 to 5 minutes
            $duration = sprintf('%d:%02d', $rand_min, rand(0, 59)); // Generate random duration like "3:45"
            $title = fake()->sentence(rand(3, 5)); // Generate a random song title with 3-5 words
            $tracks[$duration] = $title;
            $track_list[] = "$title ($duration)";
        }


        return [
            'collections' => fake()->realText(20),
            'albums' => fake()->sentences(random_int(3, 5)),
            'artists' => fake()->words(random_int(1, 3)),
            'record_label' => $tracks,
            'track_list' => $track_list,
            'release_date' => fake()->date(),
        ];
    }
}
