<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/', 'dashboard');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/add-to-cart/{product}', [ProductController::class, 'addToCart'])->name('product.addToCart');
    Route::get('/remove-from-cart/{product}', [ProductController::class, 'removeFromCart'])->name('product.removeFromCart');
    Route::get('/product-change-quantity/{product}', [ProductController::class, 'changeQuantity'])->name('product.changeQuantity');
    Route::resource('products', ProductController::class);
    Route::resource('cart', CartController::class)->only(['index', 'store', 'destroy']);
    Route::resource('orders', OrderController::class)->only(['index', 'store', 'show']);
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
