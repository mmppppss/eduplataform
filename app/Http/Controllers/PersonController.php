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
        $validatedPerson = $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'ci' => 'required|numeric|unique:persons,ci',
            'phone' => 'required|max:20',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'role' => 'required|string|max:50',
        ]);

        $validatedUser = $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        // Crear la persona
        $person = Person::create($validatedPerson);

        // Crear el usuario asociado
        $user = User::create([
            'email' => $validatedUser['email'],
            'password' => Hash::make($validatedPerson['ci']), // contraseña temporal = CI
            'person_id' => $person->id,
        ]);

        return redirect()->route('personas.index')->with('success', 'Persona creada exitosamente.');
    }


    public function update(Request $request, Person $person)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'last_name'   => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email,' . $person->user->id,
            'phone'       => 'required|max:20',
            'address'     => 'nullable|string|max:255',
            'birth_date'  => 'nullable|date',
            'role'        => 'required|string|max:50',
        ]);
        if(!$validated){
            return redirect()->back()->with('error', 'Error al actualizar la persona.');
        }


        // Actualizamos los campos internos del modelo Person
        $person->update([
            'name'   => $validated['name'],
            'last_name'    => $validated['last_name'],
            'phone'        => $validated['phone'],
            'address'      => $validated['address'] ?? null,
            'birth_date'   => $validated['birth_date'] ?? null,
            'role'         => $validated['role'],
        ]);

        // Y sincronizamos los datos del usuario relacionado
        $person->user->update([
            'email' => $validated['email'],
        ]);

        return redirect()->route('personas.index')->with('success', 'Persona actualizada exitosamente.');
    }
    public function destroy(Person $person)
    {
        if ($person->user) {
            $person->user->delete();
        }
        $person->delete();

        return redirect()->route('personas.index')->with('success', 'Persona eliminada exitosamente.');
    }
}
