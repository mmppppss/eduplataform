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
        'name',
        'last_name',
        'ci',
        'phone',
        'address',
        'birth_date',
        'role',
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
            'birth_date' => 'date',
        ];
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
    public function courses()
    {
        return $this->hasManyThrough(
            Course::class, // Modelo final
            User::class,   // Modelo intermedio
            'id',          // foreignKey en User (users.id)
            'teacher_id',  // foreignKey en Course (courses.teacher_id)
            'user_id',     // localKey en Person (persons.user_id)
            'id'           // localKey en User (users.id)
        );
    }
}
