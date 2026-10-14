<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\GalleryImage;
use App\Models\PersonalQuote;
use App\Models\Profile;
use App\Models\Song;
use App\Models\Surah;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function profile(): JsonResponse
    {
        $profile = Profile::query()->first();

        if (! $profile) {
            return response()->json(['message' => 'Profile has not been configured yet.'], 404);
        }

        return response()->json(['data' => $profile]);
    }

    public function songs(): JsonResponse
    {
        return $this->collection(Song::query()->where('is_visible', true)->orderBy('sort_order')->orderBy('id')->get());
    }

    public function destinations(): JsonResponse
    {
        return $this->collection(Destination::query()->where('is_visible', true)->orderBy('sort_order')->orderBy('id')->get());
    }

    public function surahs(): JsonResponse
    {
        return $this->collection(Surah::query()->where('is_visible', true)->orderBy('sort_order')->orderBy('id')->get());
    }

    public function gallery(): JsonResponse
    {
        return $this->collection(GalleryImage::query()->where('is_visible', true)->orderBy('sort_order')->orderBy('id')->get());
    }

    public function quotes(): JsonResponse
    {
        return $this->collection(PersonalQuote::query()->where('is_visible', true)->orderBy('sort_order')->orderBy('id')->get());
    }

    private function collection($items): JsonResponse
    {
        return response()->json(['data' => $items]);
    }
}
