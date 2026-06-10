<?php 

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AccService {

    public function ChangeName($id, $newName) {
        $user = User::find($id);

        if (!$user) {
            throw new \Exception('Brugeren blev ikke fundet');
        }

        $user->update(['name' => $newName]);

        return $user;
    }

    public function ChangeEmail($id, $newEmail) {
        $user = User::find($id);

        if (!$user) {
            throw new \Exception('Brugeren blev ikke fundet');
        }

        $user->update(['email' => $newEmail]);

        return $user;
    }
}