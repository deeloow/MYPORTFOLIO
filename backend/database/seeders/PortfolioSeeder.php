<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\GalleryImage;
use App\Models\PersonalQuote;
use App\Models\Profile;
use App\Models\Song;
use App\Models\Surah;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        Profile::query()->updateOrCreate(['id' => 1], [
            'name' => '[Your name]',
            'photo_url' => '/photo.jpg.jpg',
            'professional_title' => 'Bachelor of Science in Nursing Graduate',
            'nursing_school' => '[Nursing school or university]',
            'graduation_year' => '[Graduation year]',
            'nickname' => '[Nickname]',
            'age' => '[Age]',
            'birthday' => '[Birthday]',
            'hometown' => '[Hometown]',
            'education' => 'Bachelor of Science in Nursing',
            'bio' => '[Write a short biography about your nursing education, interests, and personal story.]',
            'interests' => ['[Add a personal hobby]'],
            'personality' => ['[Add a personal quality]'],
            'nursing_interests' => ['[Add a nursing interest]'],
            'personal_values' => [
                ['title' => 'Compassion', 'description' => '[Describe what compassion means to you.]'],
                ['title' => 'Empathy', 'description' => '[Describe how you want to practice empathy.]'],
                ['title' => 'Patient-centered care', 'description' => '[Add your own patient-centered care principle.]'],
                ['title' => 'Responsibility', 'description' => '[Describe what responsibility means to you.]'],
                ['title' => 'Professionalism', 'description' => '[Add a personal professionalism principle.]'],
                ['title' => 'Lifelong learning', 'description' => '[Describe how you hope to keep learning.]'],
            ],
            'nursing_journey' => '[Share experiences and lessons from your nursing education. Do not include confidential patient information.]',
            'nursing_philosophy' => '[Write your personal nursing philosophy before publishing; this prompt is not a statement of your beliefs.]',
            'skills' => [
                ['title' => 'Nursing knowledge and clinical learning', 'description' => '[Add verified coursework or educational learning.]', 'label' => 'Educational learning placeholder'],
                ['title' => 'Communication and teamwork', 'description' => '[Describe learning you can accurately verify.]', 'label' => 'Editable learning placeholder'],
                ['title' => 'Patient safety awareness', 'description' => '[Add safety-related education you have completed.]', 'label' => 'Educational learning placeholder'],
                ['title' => 'Health education', 'description' => '[Describe relevant coursework or learning.]', 'label' => 'Editable learning placeholder'],
                ['title' => 'Documentation and organization', 'description' => '[Add verified educational experience only.]', 'label' => 'Educational learning placeholder'],
                ['title' => 'Continuing professional development', 'description' => '[Add a learning goal or verified development activity.]', 'label' => 'Editable learning placeholder'],
            ],
            'goals' => '[Add your career goals or personal aspirations]',
            'email' => 'your.email@example.com',
            'social_links' => [],
        ]);

        $songs = [
            ['A song that feels like home', 'Add your favorite artist', 'Favorite Songs', 'Write why this song matters to you.', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85', 'https://open.spotify.com/'],
            ['A softer kind of day', 'Add your favorite artist', 'Chill', 'A note about the feeling or memory behind this song.', 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85', 'https://www.youtube.com/'],
            ['Words for the heart', 'Add an artist or nasheed', 'Islamic Nasheeds', 'Replace with a nasheed and your own reflection.', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85', 'https://www.youtube.com/'],
        ];
        foreach ($songs as $index => [$title, $artist, $category, $description, $cover_image, $url]) {
            Song::query()->updateOrCreate(['title' => $title], compact('artist', 'category', 'description', 'cover_image', 'url') + ['sort_order' => $index]);
        }

        $destinations = [
            ['A city on your list', 'Add a country', 'Add a place you hope to experience one day.', 'What draws you there?', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=85', ['A place to explore', 'A view to remember'], 'https://www.google.com/maps'],
            ['Somewhere by the sea', 'Add a country', 'Keep a note of the kind of journey you imagine.', 'Why it belongs on your list.', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85', ['A quiet coastline'], 'https://www.google.com/maps'],
            ['A landscape to wander', 'Add a country', 'A little space for a future adventure.', 'What you would love to discover.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', ['A favorite trail'], 'https://www.google.com/maps'],
        ];
        foreach ($destinations as $index => [$name, $country, $description, $reason, $image, $landmarks, $url]) {
            Destination::query()->updateOrCreate(['name' => $name], compact('country', 'description', 'reason', 'image', 'landmarks', 'url') + ['is_favorite' => $index === 0, 'sort_order' => $index]);
        }

        Surah::query()->where('number', 18)->update(['is_visible' => false]);
        Surah::query()->updateOrCreate(['number' => 93], [
            'name_arabic' => 'الضحى',
            'transliteration' => 'Ad-Duha',
            'meaning' => 'The Morning Brightness',
            'verses' => 11,
            'reflection' => '[Add your own reflection on Surah Ad-Duha; this prompt does not represent personal beliefs.]',
            'url' => 'https://quran.com/ad-duhaa',
            'sort_order' => 0,
        ]);

        $photos = [
            ['https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85', 'Morning light across a quiet landscape', 'A moment to keep'],
            ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85', 'Sunlight over a mountain valley', 'Somewhere peaceful'],
            ['https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85', 'A cabin beside a still lake', 'A slower kind of day'],
            ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85', 'A winding path through a green valley', 'A place to return to'],
        ];
        foreach ($photos as $index => [$image, $alt, $caption]) {
            GalleryImage::query()->updateOrCreate(['image' => $image], compact('alt', 'caption') + ['sort_order' => $index]);
        }

        $quotes = [
            'Let your life be shaped by what you choose to give your attention to.',
            'Small acts, done with care, can make an ordinary day meaningful.',
            'Make room for the things that bring you closer to who you want to be.',
        ];
        foreach ($quotes as $index => $text) {
            PersonalQuote::query()->updateOrCreate(['text' => $text], ['author' => null, 'sort_order' => $index]);
        }
    }
}
