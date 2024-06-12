<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'role' => 'required|string|in:manager,customer',
        ]);

        // $rawPass = substr(md5(rand()), 0, 8);
        $rawPass = '12345678';
        $data['password'] = bcrypt($rawPass);
        $data['email_verified_at'] = now();

        User::create($data);

        return redirect()->back()->with('success', 'User created successfully');
    }

    public function manage()
    {
        // 
    }

    public function changeRole(User $user)
    {
        $user->update([
            'role' => $user->role === 'manager' ? 'customer' : 'manager',
        ]);

        $message = $user->role === 'manager' ? 'User is now a manager' : 'User is now a customer';

        return response()->json([
            'message' => $message,
        ]);
    }

    public function block(User $user)
    {
        $user->update([
            'blocked_at' => $user->blocked_at ? null : now(),
        ]);

        $message = $user->blocked_at ? 'Your account has been blocked' : 'Your account has been activated';

        return response()->json([
            'message' => $message,
        ]);
    }
}
