<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DVDSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dvds_path = Storage::disk('public')->path('json_data/dvds.json');
        if (file_exists($dvds_path)) {
            $dvds = json_decode(file_get_contents($dvds_path), true);
            foreach ($dvds as $dvd) {
                $product = Product::create(
                    [
                        'name' => $dvd['name'],
                        'type' => 'dvd',
                        'image_path' => $dvd['image_path'] . ".jpg",
                        'description' => $dvd['description'],
                        'price' => rand(10, 100) * 1000,
                        'in_stock' => rand(5, 1000),
                        'genre' => $dvd['genre'],
                        'weight' => rand(100, 500),
                        'avgRating' => (float) $dvd['avgRating'],
                        'ratingsCount' => (int) str_replace(",", "", $dvd['ratingsCount']),
                        'sold' => rand(0, 100000),
                    ]
                );
                $release_date = Carbon::createFromFormat('d M Y', $dvd['releasedDate'])->toDateString();
                $product->dvd()->create([
                    'disc_type' => fake()->randomElement(['Blu-ray', 'HD-DVD']),
                    'director' => $dvd['director'],
                    'actors' => $dvd['actors'],
                    'writer' => $dvd['writer'],
                    'runtime' => $dvd['runtime'],
                    'language' => $dvd['language'],
                    'release_date' => date('Y-m-d', strtotime($release_date)),
                    'country' => $dvd['country'],
                ]);
            }
        } else {
            $this->command->error('dvds.json file not found');
        }
    }
}
