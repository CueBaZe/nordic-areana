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

        return;
    }

    public function ChangeEmail($id, $newEmail) {
        $user = User::find($id);

        if (!$user) {
            throw new \Exception('Brugeren blev ikke fundet');
        }

        $user->update(['email' => $newEmail]);

        return;
    }

    public function ChangeNumber($id, $newNumber) {
        $user = User::find($id); 

        if (!$user) {
            throw new \Exception('Brugeren blev ikke fundet');
        }

        $user->update(['phone' => $newNumber]);

        return;

    }

    public function ChangePassword($id, $oldPassword, $newPassword, $repeatPassword) {
        $user = User::find($id);

        if (!$user) {
            throw new \Exception('Brugeren blev ikke fundet');
        }

        if (!Hash::check($oldPassword, $user->password)) { //checks if the old password match the one in the database
            throw new \Exception('Forkert nuværende password. Prøv igen.');
        }

        if ($newPassword == $oldPassword) {
            throw new \Exception('Det nye password må ikke være det samme som det nuværende password');
        }

        if ($newPassword != $repeatPassword) { //checks if newPassword and repeatPassword matches
            throw new \Exception('Nyt password og gentag password skal være ens.');
        }

        $hashedPassword = Hash::make($newPassword);
        $user->update(['password' => $hashedPassword]);

        return;

    }
}