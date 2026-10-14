<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/profile', [PortfolioController::class, 'profile']);
Route::get('/songs', [PortfolioController::class, 'songs']);
Route::get('/destinations', [PortfolioController::class, 'destinations']);
Route::get('/surahs', [PortfolioController::class, 'surahs']);
Route::get('/gallery', [PortfolioController::class, 'gallery']);
Route::get('/quotes', [PortfolioController::class, 'quotes']);
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');
