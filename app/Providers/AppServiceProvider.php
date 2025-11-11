<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('setup', function () {
            return Config::get('setup');
        });
        //para que se vea el usuario logueado
        Inertia::share('profile', function () {
            if ($user = Auth::user()) {
                return [
                    'user' => $user,
                    'role' => $user->role(),
                ];
            }

            return null;
        });

        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ]);
    }
}
