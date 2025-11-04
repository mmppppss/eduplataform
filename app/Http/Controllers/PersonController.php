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
        $users = User::all();
        return  Inertia::render('personas', [
            'users' => $users
        ]);
    }
    function store(Request $request)
    {
        $validatedPerson = $request->validate([
            'name'      => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'ci'        => 'required|numeric|unique:persons,ci',
            'tel'       => 'required|string|max:20',
            'dir'       => 'nullable|string|max:255',
            'date'      => 'nullable|date',
            'rol'       => 'required|string|max:50',
        ]);

        $validatedUser = $request->validate([
            'mail' => 'required|email|unique:users,email',
        ]);
        $person = Person::create([
            'nombres' => $request->name,
            'apellidos' => $request->lastname,
            'ci' => $request->ci,
            'telefono' => $request->tel,
            'direccion' => $request->dir,
            'fecha_nacimiento' => $request->date,
            'rol' => $request->rol,
        ]);

        $user = User::create([
            'name' => $request->name . ' ' . $request->lastname,
            'email' => $request->mail,
            'password' => Hash::make($request->ci),
            'person_id' => $person->id,
        ]);
        return redirect()->back()->with('success', 'Persona agregada correctamente.');
    }
}
