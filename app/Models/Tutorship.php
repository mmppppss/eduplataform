<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tutorship extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutor_id',
        'estudiante_id',
    ];
    public function tutor()
    {
        return $this->belongsTo(Person::class, 'tutor_id');
    }

    public function estudiante()
    {
        return $this->belongsTo(Person::class, 'estudiante_id');
    }
}
