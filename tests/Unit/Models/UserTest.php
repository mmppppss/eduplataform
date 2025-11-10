
<?php

use App\Models\User;

it('crea una instancia del modelo User sin tocar la base de datos', function () {
    $user = new User(['email' => 'pedro@example.com']);
    expect($user->email)->toBe('pedro@example.com');
});

