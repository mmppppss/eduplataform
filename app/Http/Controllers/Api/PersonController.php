<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PersonController extends Controller
{
    public function index()
    {
        return response()->json(Person::with('user')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'ci' => 'required|numeric|unique:persons,ci',
            'phone' => 'required|max:20',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'role' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
        ]);

        $person = Person::create($validated);

        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['ci']),
            'person_id' => $person->id,
        ]);

        return response()->json([
            'success' => true,
            'person' => $person->load('user'),
        ], 201);
    }

    public function update(Request $request, Person $person)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|max:20',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'role' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email,' . $person->user?->id,
        ]);

        $person->update($validated);

        if ($person->user) {
            $person->user->update(['email' => $validated['email']]);
        }

        return response()->json([
            'success' => true,
            'person' => $person->load('user'),
        ]);
    }

    public function destroy(Person $person)
    {
        if ($person->user) {
            $person->user->delete();
        }
        $person->delete();

        return response()->json(['success' => true]);
    }
}