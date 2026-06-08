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
        if (User::where('email', 'admin@email.com')->exists()) {
            $this->command->info('Usuario admin ya existe, saltando seeder.');
            return;
        }

        $person = Person::create([
            'name' => 'Admin',
            'last_name' => 'Admin',
            'ci' => '12345678',
            'phone' => '71688979',
            'address' => 'Dirección administrativa',
            'birth_date' => '2003-09-19',
            'role' => 'administrador',
        ]);

        User::create([
            'email' => 'admin@email.com',
            'password' => Hash::make('admin'),
            'person_id' => $person->id,
        ]);

        $this->command->info('Usuario admin creado exitosamente!');
        $this->command->info('Email: admin@email.com');
        $this->command->info('Contraseña: admin');
    }
}
