<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Person extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombres',
        'apellidos',
        'ci',
        'telefono',
        'direccion',
        'fecha_nacimiento',
        'rol',
    ];
    protected $table = 'persons';
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'fecha_nacimiento' => 'date',
        ];
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
