<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BookSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books_path = Storage::disk('public')->path('json_data/books.json');
        if (file_exists($books_path)) {
            $books = json_decode(file_get_contents($books_path), true);
            foreach ($books as $book) {
                $product = Product::create(
                    [
                        'name' => $book['name'],
                        'type' => 'book',
                        'image_path' => $book['image_path'] . ".jpg",
                        'description' => $book['description'],
                        'price' => rand(10, 100) * 1000,
                        'in_stock' => rand(5, 1000),
                        'genre' => $book['genre'],
                        'weight' => rand(100, 500),
                        'avgRating' => (float) $book['avgRating'],
                        'ratingsCount' => (int) $book['ratingsCount'],
                        'sold' => rand($book['ratingsCount'], $book['ratingsCount'] * 2),
                    ]
                );
                $product->book()->create([
                    'authors' => $book['authors'],
                    'cover_type' => fake()->randomElement(['paperback', 'hardcover']),
                    'publisher' => $book['publisher'],
                    'pages' => (int) $book['pageCount'],
                    'language' => $book['language'],
                    'publication_date' => date('Y-m-d', strtotime($book['publishedDate'])),
                ]);
            }
        } else {
            $this->command->error('books.json file not found');
        }
    }
}
