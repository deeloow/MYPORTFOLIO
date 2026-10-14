<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalQuote extends Model
{
    protected $fillable = ['text', 'author', 'sort_order', 'is_visible'];

    protected function casts(): array
    {
        return ['is_visible' => 'boolean'];
    }
}
