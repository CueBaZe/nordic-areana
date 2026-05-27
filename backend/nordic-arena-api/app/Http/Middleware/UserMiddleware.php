<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $id = $request->route('id');

        $user = User::where('id', $id)
            ->where('token', $token)
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthoirzed!'
            ]);
        }

        return $next($request);
    }
}
