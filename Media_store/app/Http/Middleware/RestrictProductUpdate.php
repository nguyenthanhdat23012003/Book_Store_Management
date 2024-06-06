<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class RestrictProductUpdate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $productID = $request->route('product');
        $today = Carbon::today();

        $updatesToday = DB::table('product_histories')
            ->where('product_id', $productID)
            ->where('action', 'updated')
            ->whereDate('done_at', $today)
            ->count();

        if ($updatesToday >= 2) {
            return to_route('products.manage')->with('fail', 'Product updates are allowed only 2 times per day.');
        }
        return $next($request);
    }
}
