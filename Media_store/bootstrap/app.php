<?php

use App\Http\Middleware\CORSMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Add alias middleware here
        $middleware->alias([
            'restrict_product_updation' => \App\Http\Middleware\RestrictProductUpdate::class,
            'restrict_product_deletion' => \App\Http\Middleware\RestrictProductDeletion::class,
            'admin' => \App\Http\Middleware\Admin::class,
            'active' => \App\Http\Middleware\ActiveMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
