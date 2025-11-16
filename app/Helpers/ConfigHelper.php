<?php

namespace App\Helpers;

use App\Models\Config;

class ConfigHelper
{
    public static function get($key, $default = null)
    {
        $config = Config::where('key', $key)->first();
        return $config ? $config->value : $default;
    }

    public static function getBool($key, $default = false)
    {
        $value = self::get($key, $default);
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }
}
