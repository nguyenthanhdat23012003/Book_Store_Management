<?php

namespace Database\Seeders;

use App\Models\CD;
use App\Models\DVD;
use App\Models\Book;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Cart;
use App\Models\Cart_item;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->has(Cart::factory()->count(1))->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        Product::factory(100)->create();

        User::factory()->has(Cart::factory()->count(1))->create([
            'name' => 'daicy',
            'email' => 'icy@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => now(),
        ]);

        $books = Product::where('type', 'book')->get();
        $cds = Product::where('type', 'cd')->get();
        $dvds = Product::where('type', 'dvd')->get();

        foreach ($books as $book) {
            Book::factory()->create(['product_id' => $book->id]);
        }

        foreach ($cds as $cd) {
            CD::factory()->create(['product_id' => $cd->id]);
        }

        foreach ($dvds as $dvd) {
            DVD::factory()->create(['product_id' => $dvd->id]);
        }
    }
}
