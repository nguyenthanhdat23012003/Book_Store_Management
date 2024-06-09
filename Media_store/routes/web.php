<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

Route::redirect('/', 'dashboard');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/add-to-cart/{product}', [CartController::class, 'addToCart'])->name('cart.addToCart');
    Route::get('/remove-from-cart/{product}', [CartController::class, 'removeFromCart'])->name('cart.removeFromCart');
    Route::get('/product-change-quantity/{product}', [CartController::class, 'updateCart'])->name('cart.changeQuantity');

    Route::get('/products/manage', [ProductController::class, 'manage'])->name('products.manage');
    Route::get('/orders/manage', [OrderController::class, 'manage'])->name('orders.manage');

    Route::put('/order/{order}/reject', [OrderController::class, 'reject'])->name('order.reject');
    Route::put('/order/{order}/confirm', [OrderController::class, 'confirm'])->name('order.confirm');

    Route::resource('cart', CartController::class)->only(['index', 'store', 'destroy']);
    Route::resource('order', OrderController::class)->except(['destroy']);
    Route::resource('products', ProductController::class)->except(['update', 'destroy', 'edit']);

    Route::middleware('restrict_product_updation')->group(function () {
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
            ->name('products.edit');
        Route::put('/products/{product}/update', [ProductController::class, 'update'])
            ->name('products.update');
    });

    Route::delete('/products/{product}/delete', [ProductController::class, 'destroy'])
        ->middleware('restrict_product_deletion')
        ->name('products.destroy');

    Route::get('/checkout/{order_id}', [PaymentController::class, 'checkout'])->name('checkout');
    Route::get('/vn-pay-bill', [PaymentController::class, 'getBill'])->name('vnPay.getBill');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
