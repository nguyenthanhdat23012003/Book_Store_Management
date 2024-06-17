<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductHistoryController;

Route::get('/', [HomeController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    // routing for cart
    Route::post('/add-to-cart/{product}', [CartController::class, 'addToCart'])->name('cart.addToCart');
    Route::post('/remove-from-cart/{product}', [CartController::class, 'removeFromCart'])->name('cart.removeFromCart');
    Route::get('/product-change-quantity/{product}', [CartController::class, 'updateCart'])->name('cart.changeQuantity');

    // routing for manage products, orders, deliveries
    Route::get('/products/manage', [ProductController::class, 'manage'])->name('products.manage');
    Route::get('/orders/manage', [OrderController::class, 'manage'])->name('orders.manage');
    Route::get('/deliveries/manage', [DeliveryController::class, 'manage'])->name('deliveries.manage');

    Route::post('/order/{order}/confirm', [OrderController::class, 'confirm'])->name('order.confirm');
    Route::post('/order/{order}/reject', [OrderController::class, 'reject'])->name('order.reject');

    Route::post('/buy-again/{order}', [OrderController::class, 'buyAgain'])->name('order.buyAgain');
    Route::post('/confirm-receipt/{order}', [OrderController::class, 'confirmReceipt'])->name('order.confirmReceipt');

    Route::get('/products-history', [ProductHistoryController::class, 'index'])->name('products.history');

    // routing for resource 
    Route::resource('cart', CartController::class)->only(['index', 'store']);
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

    Route::post('/restore-product/{product}', [ProductController::class, 'restore'])->name('products.restore');

    Route::get('/checkout/{order_id}', [PaymentController::class, 'checkout'])->name('checkout');
    Route::get('/vn-pay-bill', [PaymentController::class, 'getBill'])->name('vnPay.getBill');

    // routing for delivery
    Route::post('/delivery/{delivery}/confirm', [DeliveryController::class, 'confirm'])->name('delivery.confirm');
    Route::post('/delivery/{delivery}/reject', [DeliveryController::class, 'reject'])->name('delivery.reject');
    Route::post('/delivery/{delivery}/complete', [DeliveryController::class, 'complete'])->name('delivery.complete');

    // routing for admin actions
    Route::middleware('admin')->group(function () {
        Route::get('/users', [UserController::class, 'manage'])->name('users.manage');
        Route::post('/users/{user}/change-role', [UserController::class, 'changeRole'])->name('users.changeRole');
        Route::post('/users/{user}/change-active', [UserController::class, 'block'])->name('users.changeActive');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
