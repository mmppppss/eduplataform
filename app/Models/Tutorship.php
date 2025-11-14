<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tutorship extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutor_id',
        'student_id',
    ];
    public function tutor()
    {
        return $this->belongsTo(Person::class, 'tutor_id');
    }

    public function student()
    {
        return $this->belongsTo(Person::class, 'student_id');
    }
}
