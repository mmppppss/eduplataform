
<?php

use App\Models\User;

it('crea una instancia del modelo User sin tocar la base de datos', function () {
    $user = new User(['name' => 'Pedro', 'email' => 'pedro@example.com']);
    expect($user->name)->toBe('Pedro');
});

