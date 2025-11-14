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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('enrollment_id')
                  ->constrained('enrollments')
                  ->cascadeOnDelete();
            $table->string('state')->default('no pagado');
            $table->date('date');
            $table->decimal('amount', 12, 2)->default(0);
            $table->enum('type', ['libro', 'mensualidad', 'laboratorio', 'other'])->default('other');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
