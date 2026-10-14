<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = ['name', 'country', 'description', 'reason', 'image', 'landmarks', 'url', 'is_favorite', 'sort_order', 'is_visible'];

    protected function casts(): array
    {
        return ['landmarks' => 'array', 'is_favorite' => 'boolean', 'is_visible' => 'boolean'];
    }
}
