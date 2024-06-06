<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class RestrictProductDeletion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $today = Carbon::today();

        $deletionsToday = DB::table('product_histories')
            ->where('action', 'deleted')
            ->whereDate('done_at', $today)
            ->count();

        if ($deletionsToday >= 5) {
            return to_route('products.manage')->with('fail', 'Delete products are allow only a maximum of 5 products per day.');
        }

        return $next($request);
    }
}
