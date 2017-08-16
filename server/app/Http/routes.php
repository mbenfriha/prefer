<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/



$app->group(['prefix' => 'prefer'], function($app) {
    $app->get('/random', 'App\Http\Controllers\Controller@getRandomPrefer');
    $app->get('/{id_prefer}/{choice}', 'App\Http\Controllers\Controller@setChoice');
});

$app->post('auth/login', 'AuthController@postLogin');