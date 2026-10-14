<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Surah extends Model
{
    protected $fillable = ['name_arabic', 'transliteration', 'meaning', 'number', 'verses', 'reflection', 'url', 'sort_order', 'is_visible'];

    protected function casts(): array
    {
        return ['number' => 'integer', 'verses' => 'integer', 'is_visible' => 'boolean'];
    }
}
