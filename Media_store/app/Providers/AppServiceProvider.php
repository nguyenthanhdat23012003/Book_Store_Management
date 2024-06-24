<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Policies\OrderPolicy;
use App\Policies\ProductPolicy;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(
            \App\Repositories\Product\ProductRepositoryInterface::class,
            \App\Repositories\Product\ProductEloquentRepository::class,
            \App\Repositories\Order\OrderEloquentRepository::class,
            \App\Repositories\Order\OrderRepositoryInterface::class,
            \App\Repositories\Cart\CartEloquentRepository::class,
            \App\Repositories\Cart\CartRepositoryInterface::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('admin', function (User $user) {
            return $user->role === 'admin';
        });
        Gate::policy(Product::class, ProductPolicy::class);
        Gate::policy(Order::class, OrderPolicy::class);
        Product::observe(\App\Observers\ProductObserver::class);
        Order::observe(\App\Observers\OrderObserver::class);
        User::observe(\App\Observers\UserObserver::class);
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
