<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared('
            CREATE TRIGGER create_payments_after_enrollment
            AFTER INSERT ON enrollments
            FOR EACH ROW
            BEGIN
                INSERT INTO payments (enrollment_id, date, amount, type, created_at, updated_at)
                VALUES (NEW.id, CURDATE(), 20.00, "laboratorio", NOW(), NOW());

                INSERT INTO payments (enrollment_id, date, amount, type, created_at, updated_at)
                VALUES (NEW.id, CURDATE(), 200.00, "mensualidad", NOW(), NOW());

                INSERT INTO payments (enrollment_id, date, amount, type, created_at, updated_at)
                VALUES (NEW.id, CURDATE(), 500.00, "libro", NOW(), NOW());
            END
        ');
    }

    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS create_payments_after_enrollment');
    }
};
