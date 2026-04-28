<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{

    protected $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $result =  $this->authService->attemptLogin($credentials);

        if (!$result) {
            return response()->json(['message' => 'Forkert email eller password'], 401);
        }

        return response()->json([
            'message' => 'Bruger logget ind',
            'user' => $user
        ]);
    }
}
