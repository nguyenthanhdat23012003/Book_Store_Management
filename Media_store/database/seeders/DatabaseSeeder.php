<?php

namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Cart;
use App\Models\User;
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

        User::factory()->has(Cart::factory()->count(1))->create([
            'name' => 'daicy',
            'email' => 'icy@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => now(),
        ]);

        $this->call([
            BookSeeder::class,
            CDSeeder::class,
            DVDSeeder::class,
        ]);
    }
}
