<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{{ $data['subject'] ?? $setup['name'] }}</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .header img { max-width: 120px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #888; }
        .button { display: inline-block; padding: 10px 20px; background: #1D4ED8; color: #fff; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{  config('app.url') . '/' . $setup['icon'] }}" alt="">
            <h1>{{ $setup['name'] ?? 'Institución' }}</h1>

        </div>

        <div class="content">
            {!! $data['contenido'] ?? '' !!}
        </div>

        <div class="footer">
            <p>Contactanos en:</p>
            <p>
                <a href="{{ $setup['web'] ?? '#' }}">Web</a> |
                <a href="{{ $setup['facebook'] ?? '#' }}">Facebook</a> |
                <a href="{{ $setup['whatsapp'] ?? '#' }}">Whatsapp</a>
            </p>
        </div>
    </div>
</body>
</html>
