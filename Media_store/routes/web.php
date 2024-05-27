<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CORSMiddleware;

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
    Route::resource('order', OrderController::class)->only(['index', 'show', 'store', 'update']);
    Route::get('/products/manage', [ProductController::class, 'manage'])->name('products.manage');

    Route::get('/checkout/{order_id}', [PaymentController::class, 'checkout'])->name('checkout');
    Route::get('/vn-pay-bill', [PaymentController::class, 'getBill'])->name('vnPay.getBill');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
