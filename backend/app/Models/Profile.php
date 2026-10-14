<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'photo_url', 'professional_title', 'nursing_school', 'graduation_year',
        'nickname', 'age', 'birthday', 'hometown', 'education', 'bio', 'interests',
        'personality', 'nursing_interests', 'personal_values', 'nursing_journey',
        'nursing_philosophy', 'skills', 'goals', 'email', 'social_links',
    ];

    protected function casts(): array
    {
        return [
            'interests' => 'array',
            'personality' => 'array',
            'nursing_interests' => 'array',
            'personal_values' => 'array',
            'skills' => 'array',
            'social_links' => 'array',
        ];
    }
}
