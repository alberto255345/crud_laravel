<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/', function(){
    return response()->json(['sucesso' => true]);
})->name('index');

Route::get('/usuarios', 'UsuariosController@index')->name('index.usuarios');
Route::get('/usuarios/{cpf}', 'UsuariosController@validcpf')->name('validcpf.usuarios');
Route::post('/usuarios', 'UsuariosController@store')->name('store.usuarios');
Route::delete('/usuarios/{id}', 'UsuariosController@destroy')->name('destroy.usuarios');
Route::get('/pais', 'PaisController@index')->name('index.pais');
Route::get('/telefone/{id}', 'TelefonesController@show')->name('show.usuarios');