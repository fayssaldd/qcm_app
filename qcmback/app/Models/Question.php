<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = ['question', 'exam_id','image_url'];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }


    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
