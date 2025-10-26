<?php
use App\Mail\HtmlMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

it('envía el código por correo de forma asíncrona', function () {
    // Evitar envíos reales
    Mail::fake();

    $user = User::factory()->create();
    $code = '123456';
    $data = ['contenido' => 'Tu código es: <strong>'.$code.'</strong>'];

    // Simula el envío (asincrónico)
    Mail::to($user->email)->queue(new HtmlMail('Código de prueba', $data));

    // Verifica que se encoló
    Mail::assertQueued(HtmlMail::class, function ($mail) use ($user, $data) {
        return $mail->data['contenido'] === $data['contenido']
            && $mail->hasTo($user->email);
    });
});

?>
