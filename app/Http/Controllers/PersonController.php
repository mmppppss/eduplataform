<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Person;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class PersonController extends Controller
{
    function index()
    {
        $persons = Person::with('user')->get();
        return  Inertia::render('personas', [
            'persons' => $persons
        ]);
    }

    public function store(Request $request)
    {
        // 1️⃣ Validar datos
        $validatedPerson = $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'ci' => 'required|numeric|unique:persons,ci',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'role' => 'required|string|max:50',
        ]);

        $validatedUser = $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $person = Person::create($validatedPerson);

        $user = User::create([
            'name' => $request->name . ' ' . $request->last_name,
            'email' => $validatedUser['email'],
            'password' => Hash::make($request->ci), // contraseña temporal
            'person_id' => $person->id,
        ]);

        return redirect()->route('persons.index')
            ->with('success', 'Persona y usuario creados correctamente');
    }
}
