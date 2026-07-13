<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\ApiController;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// WMS Database API Endpoints
Route::get('/api/state', [ApiController::class, 'getLatestState']);
Route::post('/api/products', [ApiController::class, 'storeProduct']);
Route::put('/api/products/{id}', [ApiController::class, 'updateProduct']);
Route::delete('/api/products/{id}', [ApiController::class, 'deleteProduct']);
Route::post('/api/transfers', [ApiController::class, 'executeTransfer']);
Route::post('/api/adjustments', [ApiController::class, 'adjustStock']);

