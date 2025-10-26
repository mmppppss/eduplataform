<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class HtmlMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $subject;
    public $data;
    public $setup;   // Configuración desde setup.json
    public $logoBase64;
    /**
     * Crear una nueva instancia del Mailable.
     *
     * @param string $subject
     * @param array $data
     */
    public function __construct(string $subject, array $data = [])
    {
        $this->subject = $subject;
        $this->data = $data;
        $this->setup = config('setup', []); // Carga setup.json desde config/setup.php
    }

    /**
     * Construir el correo.
     */
    public function build()
    {
        return $this->subject($this->subject)
            ->html(view('emails.html-mail', [
                'data' => $this->data,
                'setup' => $this->setup,
            ])->render());
    }
}
