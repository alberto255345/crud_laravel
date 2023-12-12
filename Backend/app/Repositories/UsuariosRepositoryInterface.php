<?php 

namespace App\Repositories;

use Illuminate\Http\Request;

interface UsuariosRepositoryInterface
{
    public function getAllUsuarios();
    public function getUsuarioById($id);
    public function createUsuario(Request $request);
    public function deleteUsuario($id);
}