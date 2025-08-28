# 📚 EduPlataform Base

Starter kit basado en **Laravel + Inertia.js + React** para construir aplicaciones educativas modernas y configurables.

---

## ⚙️ Configuración inicial

Toda la configuración del proyecto se maneja desde el archivo `setup.json` ubicado en la raíz del proyecto.

Ejemplo de `setup.json`:

```json
{
    "name": "EduPlataform Base",
    "icon": "/public/images/logo.png"
}
```

### Variables disponibles

* `name` → Nombre de la plataforma (string).
* `icon` → Ruta de un ícono o logo (`.png`, `.jpg`, `.svg`).

> ⚠️ Cada vez que modifiques `setup.json`, recuerda limpiar la caché de configuración si estás en producción:

```bash
php artisan config:clear
```

---

## 🚀 Instalación y ejecución en desarrollo

Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/eduplataform-base.git
cd eduplataform-base
```

Instalar dependencias de Laravel:

```bash
composer install
```

Instalar dependencias de Node:

```bash
npm install
```

Ejecutar migraciones (si aplica):

```bash
php artisan migrate
```

Compilar assets y levantar servidor de desarrollo:

```bash
npm run dev
php artisan serve
```

La aplicación estará disponible en:
👉 [http://localhost:8000](http://localhost:8000)

---

## 🛠️ Despliegue en producción

1. Instalar dependencias optimizadas:

```bash
composer install --optimize-autoloader --no-dev
```

2. Compilar frontend:

```bash
npm run build
```

3. Exportar base de datos (si aplica):

```bash
php artisan migrate --force
```

4. Servir la aplicación con Apache/Nginx apuntando a `public/index.php`.

---

## 📂 Estructura principal del proyecto

* `setup.json` → Configuración editable de la plataforma.
* `config/setup.php` → Carga automática de variables desde `setup.json`.
* `resources/js/` → Código React (Inertia).
* `resources/views/` → Vistas base Blade.
* `routes/web.php` → Rutas principales.
* `app/` → Backend en Laravel.

---

## 🤝 Política de colaboración

Este proyecto sigue un flujo de trabajo basado en **GitFlow simplificado**:

* **`main`** → Rama estable en producción.
* **`dev`** → Rama de desarrollo donde se integran nuevas funciones.
* **Ramas de trabajo** → Cada nuevo cambio debe hacerse en una rama individual:

  * `feat/*` → Nuevas funcionalidades.
  * `fix/*` → Correcciones de errores.
  * `test/*` → Pruebas y experimentos.

### Flujo de trabajo recomendado

1. Crear una rama desde `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/nueva-funcion
   ```
2. Realizar cambios y subirlos:

   ```bash
   git add .
   git commit -m "feat: agregar nueva funcionalidad X"
   git push origin feat/nueva-funcion
   ```
3. Crear un **Pull Request** hacia `dev`.
4. Una vez probado e integrado en `dev`, se hace **merge hacia `main`** para publicar en producción.

> ⚠️ No hacer commits directamente en `main`. Todos los cambios deben pasar por `dev`.

---

## 📜 Licencia

Este proyecto se distribuye bajo licencia GPL.


---



