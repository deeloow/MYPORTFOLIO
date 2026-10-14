<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('about:portfolio', function () {
    $this->comment('Personal Portfolio API is ready for local development.');
})->purpose('Display a short portfolio API status message');
