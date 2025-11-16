<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS create_payments_after_enrollment');

        DB::unprepared('
            CREATE TRIGGER create_payments_after_enrollment
            AFTER INSERT ON enrollments
            FOR EACH ROW
            BEGIN
                DECLARE lab_amount DECIMAL(8,2);
                DECLARE mens_amount DECIMAL(8,2);
                DECLARE libro_amount DECIMAL(8,2);

                SELECT COALESCE(
                    (SELECT CAST(value AS DECIMAL(8,2)) FROM configs WHERE `key` = "amount_laboratorio"),
                    20.00
                ) INTO lab_amount;

                SELECT COALESCE(
                    (SELECT CAST(value AS DECIMAL(8,2)) FROM configs WHERE `key` = "amount_mensualidad"),
                    200.00
                ) INTO mens_amount;

                SELECT COALESCE(
                    (SELECT CAST(value AS DECIMAL(8,2)) FROM configs WHERE `key` = "amount_libro"),
                    500.00
                ) INTO libro_amount;

                INSERT INTO payments (enrollment_id, date, amount, type, created_at, updated_at)
                VALUES (NEW.id, CURDATE(), lab_amount, "laboratorio", NOW(), NOW());

                INSERT INTO payments (enrollment_id, date, amount, type, created_at, updated_at)
                VALUES (NEW.id, CURDATE(), mens_amount, "mensualidad", NOW(), NOW());

                INSERT INTO payments (enrollment_id, date, amount, type, created_at, updated_at)
                VALUES (NEW.id, CURDATE(), libro_amount, "libro", NOW(), NOW());
            END
        ');
    }

    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS create_payments_after_enrollment');
    }
};
