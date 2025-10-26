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
        Schema::table('users', function (Blueprint $table) {
            // Si no existe la columna person_id, la agregamos
            if (!Schema::hasColumn('users', 'person_id')) {
                $table->foreignId('person_id')->nullable()->after('id');
            }

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'person_id')) {
                $table->dropForeign(['person_id']);
                $table->dropColumn('person_id');
            }

        });
    }
};

