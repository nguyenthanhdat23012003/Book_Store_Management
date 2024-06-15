<?php

namespace Database\Seeders;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CDSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cds_path = Storage::disk('public')->path('json_data/cds.json');
        if (file_exists($cds_path)) {
            $cds = json_decode(file_get_contents($cds_path), true);
            foreach ($cds as $cd) {
                $product = Product::create(
                    [
                        'name' => $cd['name'],
                        'type' => 'cd',
                        'image_path' => $cd['image_path'] . ".jpg",
                        'description' => 'No description',
                        'price' => rand(10, 100) * 1000,
                        'in_stock' => rand(5, 1000),
                        'genre' => $cd['genre'],
                        'weight' => rand(100, 500),
                        'avgRating' => rand(10, 50) / 10,
                        'ratingsCount' => rand(10, 100),
                        'sold' => rand(100, 1000),
                    ]
                );
                $year = $cd['year'];
                $month = rand(1, 12);
                $day = rand(1, Carbon::parse("$year-$month-01")->daysInMonth);
                $release_date = Carbon::create($year, $month, $day)->toDateString();
                $product->cd()->create([
                    'collections' => $cd['collections'],
                    'albums' => $cd['albums'],
                    'artists' => $cd['artist'],
                    'record_label' => $cd['label'],
                    'track_list' => $cd['tracklist'],
                    'videos' => $cd['videos'],
                    'country' => $cd['country'],
                    'release_date' => date('Y-m-d', strtotime($release_date))
                ]);
            }
        } else {
            $this->command->error('cds.json file not found');
        }
    }
}
