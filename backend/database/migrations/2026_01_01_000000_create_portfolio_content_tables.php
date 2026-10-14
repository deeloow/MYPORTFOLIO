<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table): void {
            $table->id();
            $table->string('name')->default('[Your name]');
            $table->string('photo_url', 2048)->nullable();
            $table->string('nickname')->nullable();
            $table->string('age')->nullable();
            $table->string('birthday')->nullable();
            $table->string('hometown')->nullable();
            $table->string('education')->nullable();
            $table->text('bio')->nullable();
            $table->json('interests')->nullable();
            $table->json('personality')->nullable();
            $table->text('goals')->nullable();
            $table->string('email')->nullable();
            $table->json('social_links')->nullable();
            $table->timestamps();
        });

        Schema::create('songs', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('artist');
            $table->string('category')->default('Favorite Songs');
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('url', 2048);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('destinations', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('country');
            $table->text('description')->nullable();
            $table->text('reason')->nullable();
            $table->string('image', 2048)->nullable();
            $table->json('landmarks')->nullable();
            $table->string('url', 2048)->nullable();
            $table->boolean('is_favorite')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('surahs', function (Blueprint $table): void {
            $table->id();
            $table->string('name_arabic');
            $table->string('transliteration');
            $table->string('meaning');
            $table->unsignedSmallInteger('number');
            $table->unsignedSmallInteger('verses');
            $table->text('reflection')->nullable();
            $table->string('url', 2048);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('gallery_images', function (Blueprint $table): void {
            $table->id();
            $table->string('image', 2048);
            $table->string('alt', 255);
            $table->string('caption')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('personal_quotes', function (Blueprint $table): void {
            $table->id();
            $table->text('text');
            $table->string('author')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 120);
            $table->string('email', 254);
            $table->string('subject', 160);
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('personal_quotes');
        Schema::dropIfExists('gallery_images');
        Schema::dropIfExists('surahs');
        Schema::dropIfExists('destinations');
        Schema::dropIfExists('songs');
        Schema::dropIfExists('profiles');
    }
};
