<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Person;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

use RefreshDatabase;

it('puede crear una persona', fn(){
        $authUser = User::factory()->create();
        actingAs($authUser);

        $data = [
            'name' => 'Juan',
            'last_name' => 'Pérez',
            'ci' => '12345678',
            'phone' => '76543210',
            'address' => 'Av. Siempre Viva 123',
            'birth_date' => '1990-01-01',
            'role' => 'profesor',
            'email' => 'juanperez@example.com',
        ];

        $response = ost('/personas/store', $data);

        $response->assertStatus(302);
        $response->assertRedirect(route('persons.index'));

        assertDatabaseHas('persons', [
            'name' => 'Juan',
            'last_name' => 'Pérez',
            'ci' => '12345678',
            'role' => 'profesor',
        ]);

        $person = Person::where('ci', '12345678')->first();
        assertNotNull($person);

        assertDatabaseHas('users', [
            'email' => 'juanperez@example.com',
            'person_id' => $person->id,
        ]);

        $user = User::where('email', 'juanperez@example.com')->first();
        assertTrue(Hash::check('12345678', $user->password));
});
