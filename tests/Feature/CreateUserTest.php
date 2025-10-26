<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;


it('puede crear un usuario válido', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    expect($user->email)->toBe('test@example.com');
});
