<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Prefer extends Model
{
    protected $table = 'prefers';
    protected $fillable = ['first_choice', 'second_choice', 'first_vote', 'second_vote'];
}