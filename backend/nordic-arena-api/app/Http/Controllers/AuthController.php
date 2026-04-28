<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Validation\Rules\Password;

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

        if (!$result['success']) {
            return response()->json(['message' => $result['message']], 401);
        }

        return response()->json([
            'message' => $result['message'],
            'user' => $result['user']
        ], 200);
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => [
                'required',
                'regex:/^([0-9\s\-\+\(\)]*)$/',
                'min:8',
                'max:20' 
            ],
            'password' => [
                'required',
                Password::min(8)
                    ->letters()      // Must have at least one letter
                    ->mixedCase()    // Must have both uppercase and lowercase
                    ->numbers()      // Must have at least one number
                    ->symbols()      // Must have at least one special character (@, #, $, etc.)
                    ->uncompromised(), // The "Magic" rule: checks if the password has been leaked in a data breach!
            ],
        ]);

        $result = $this->authService->Register($request->name, $request->email, $request->phone, $request->password);

        if (!$result['success']) {
            return response()->json([
                'message' => $result['message']
            ], 403);
        }

        return response()->json([
            'message' => $result['message'],
        ]);
    }
}
