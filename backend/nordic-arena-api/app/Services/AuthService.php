<?php 

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthService { 
    public function attemptLogin(array $credentials) {
        $user = User::where('email', $credentials['email'])->first(); //gets a user with the inputed email

        if (!$user || !Hash::check($credentials['password'], $user->password)) { //checks if the passwords match
            return ['success' => false, 'message' => 'Forkert email eller password'];
        }

        return ['success' => true, 'message' => 'Bruger logget ind', 'user' => $user];
    }

    public function Register(String $name, String $email, String $phone, String $password) {
        $doesEmailExist = DB::table('users')->where('email', $email)->first();

        if ($doesEmailExist) {
            return ['success' => false, 'message' => 'Mailen er allerede i brug'];
        }

        User::create([
            'token' => $this->generateToken(),
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'password' => Hash::make($password)
        ]);

        return ['success' => true, 'message' => 'User oprettet'];

    }

    function generateToken() {
        return uniqid();
    }
}