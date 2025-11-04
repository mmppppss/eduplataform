<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('persons', function (Blueprint $table) {
            $table->renameColumn('nombres', 'name');
            $table->renameColumn('apellidos', 'last_name');
            $table->renameColumn('telefono', 'phone');
            $table->renameColumn('direccion', 'address');
            $table->renameColumn('fecha_nacimiento', 'birth_date');
            $table->renameColumn('rol', 'role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('persons', function (Blueprint $table) {
            $table->renameColumn('first_name', 'nombres');
            $table->renameColumn('last_name', 'apellidos');
            $table->renameColumn('phone', 'telefono');
            $table->renameColumn('address', 'direccion');
            $table->renameColumn('birth_date', 'fecha_nacimiento');
            $table->renameColumn('role', 'rol');
        });
    }
};
