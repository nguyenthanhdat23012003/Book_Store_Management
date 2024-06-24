<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Gate::forUser(auth()->user())->denies('admin')) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Gate::forUser(auth()->user())->denies('admin')) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string|in:manager,customer',
            'message' => 'nullable|string',
        ]);

        // dd($data);

        // $rawPass = substr(md5(rand()), 0, 8);
        $rawPass = '12345678';
        $data['password'] = bcrypt($rawPass);
        $data['email_verified_at'] = now();

        User::create($data);

        return to_route('users.index')->with('success', 'User created successfully');
    }

    public function index()
    {
        $query = User::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_dir', 'asc');

        if (request('name')) {
            $query->where('name', 'LIKE', '%' . request('name') . '%');
        }

        if (request('email')) {
            $query->where('email', 'LIKE', '%' . request('email') . '%');
        }

        if (request('role') && request('role') !== 'all') {
            $query->where('role', request('role'));
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->appends(request()->query())->onEachSide(1);

        return Inertia::render('Users/Manage', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }

    public function changeRole(User $user)
    {
        if (Gate::forUser(auth()->user())->denies('admin')) {
            abort(403, 'Unauthorized action.');
        }
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
        if (Gate::forUser(auth()->user())->denies('admin')) {
            abort(403, 'Unauthorized action.');
        }
        $user->update([
            'blocked_at' => $user->blocked_at ? null : now(),
        ]);

        $message = $user->blocked_at ? 'This account has been blocked' : 'This account has been activated';

        return response()->json([
            'message' => $message,
        ]);
    }
}
