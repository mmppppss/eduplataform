#!/bin/sh
set -e

chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

echo "Waiting for database..."
for i in $(seq 1 30); do
    if php -r "
        try {
            new PDO('mysql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}');
            echo 'ok';
        } catch (PDOException \$e) {
            echo \$e->getMessage();
        }
    " 2>/dev/null | grep -q ok; then
        echo "Database ready."
        break
    fi
    echo "Attempt $i: waiting for database..."
    sleep 2
done

php artisan migrate --force
php artisan db:seed --force --class=UserPersonSeeder
php artisan db:seed --force --class=ConfigSeeder

php artisan serve --host=0.0.0.0 --port=8080
