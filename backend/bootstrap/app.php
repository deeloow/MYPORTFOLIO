<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Public portfolio API; no browser session or authentication middleware is required.
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Laravel's default JSON exception handling is retained for API requests.
    })->create();
