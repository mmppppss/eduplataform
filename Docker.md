# Docker

## Levantar

```bash
docker compose up --build
```

Para correr en segundo plano:

```bash
docker compose up --build -d
```

## Detener

```bash
docker compose down
```

Esto detiene los contenedores pero conserva los datos de MySQL (volumen `mysql_data`).

## Detener y borrar datos

```bash
docker compose down -v
```

Esto detiene los contenedores **y elimina el volumen** de MySQL, perdiendo la base de datos.

## Reconstruir desde cero

```bash
docker compose down -v
docker compose up --build
```

## Ver logs

```bash
docker compose logs -f
```

## Acceder al contenedor

```bash
docker compose exec app sh
```

## Comandos útiles dentro del contenedor

```bash
php artisan migrate:fresh --seed   # Reinicia DB y corre seeders
php artisan db:seed                # Solo seeders
php artisan queue:listen           # Procesar colas
```

## Credenciales por defecto

- **Email:** `admin@email.com`
- **Contraseña:** `admin`
