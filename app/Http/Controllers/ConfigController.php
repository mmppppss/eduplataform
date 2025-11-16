<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todas las configuraciones y convertirlas a array clave-valor
        $configs = Config::all()->pluck('value', 'key')->toArray();
        return Inertia::render('config', [
            'configs' => $configs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Config $config)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Config $config)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $key)
    {
        $request->validate([
            'value' => 'required'
        ]);

        try {
            Config::updateOrCreate(
                ['key' => $key],
                ['value' => $request->value]
            );

            return redirect()->back()->with('success', 'Configuración actualizada correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al actualizar la configuración.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Config $config)
    {
        //
    }
}
