<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Config;

class ConfigSeeder extends Seeder
{
    public function run()
    {
        $configs = [
            ['key' => 'amount_mensualidad', 'value' => '200'],
            ['key' => 'amount_laboratorio', 'value' => '20'],
            ['key' => 'amount_libro', 'value' => '500'],
            ['key' => 'twofa_user', 'value' => 'true'],
            ['key' => 'twofa_admin', 'value' => 'true'],
        ];

        foreach ($configs as $config) {
            Config::create($config);
        }
    }
}
