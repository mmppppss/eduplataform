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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')
                ->constrained('enrollments')
                ->onDelete('cascade');

            // Fecha de la asistencia
            $table->date('date')->index();

            // Estado de asistencia
            $table->enum('state', ['asistió', 'retraso', 'licencia', 'falta'])
                ->default('asistió');

            $table->timestamps();

            // Evitar duplicados: un estudiante no puede tener dos asistencias el mismo día
            $table->unique(['enrollment_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
