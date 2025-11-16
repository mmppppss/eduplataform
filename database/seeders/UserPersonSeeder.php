<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Person;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserPersonSeeder extends Seeder
{
    public function run()
    {
        // Crear la persona
        $person = Person::create([
            'name' => 'Admin',
            'last_name' => 'Admin',
            'ci' => '12345678',
            'phone' => '71688979',
            'address' => 'Dirección administrativa',
            'birth_date' => '2003-09-19',
            'role' => 'administrador',
        ]);

        // Crear el usuario asociado
        User::create([
            'email' => 'me@mpps.qzz.io',
            'password' => Hash::make('admin'),
            'person_id' => $person->id,
        ]);

        $this->command->info('Usuario admin creado exitosamente!');
        $this->command->info('Email: me@mpps.qzz.io');
        $this->command->info('Contraseña: admin');
    }
}
