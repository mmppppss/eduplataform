<?php

use App\Models\Person;
use Illuminate\Foundation\Testing\RefreshDatabase;


it('puede crear una persona', function () {
    $person = Person::factory()->create([
        'name' => 'Juan',
        'last_name' => 'Pérez',
        'ci' => '12345678',
        'phone' => '76543210',
        'address' => 'Av. Siempre Viva 123',
        'birth_date' => '1990-01-01',
        'role' => 'profesor',
    ]);

    expect($person->ci)->toBe('12345678');
});
