<?php

use App\Mail\HtmlMail;
use Illuminate\Support\Facades\Mail;

it('envía correctamente un correo HTML', function () {
    Mail::fake();

    $mail = new HtmlMail('Título de Prueba', ['<p>Contenido del correo</p>']);

    Mail::to('user@example.com')->send($mail);

    Mail::assertQueued(HtmlMail::class, function ($sentMail) {
        return $sentMail->subject === 'Título de Prueba';
    });
});
