<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\UsuariosRepositoryInterface;

class UsuariosController extends Controller
{
    protected $usuarios;

    public function __construct(UsuariosRepositoryInterface $usuarios)
    {
        $this->usuarios = $usuarios;
    }

    public function index()
    {
        $usuarios = $this->usuarios->getAllUsuarios();
        return response()->json($usuarios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'cpf' => 'required|cpf|unique:usuarios',
            'telefoneinput' => ''
            // Adicione outras regras de validação conforme necessário
        ]);

        $usuario = $this->usuarios->store($request);

        return response()->json($usuario, 201);
    }

    public function destroy($id)
    {
        $deleted = $this->usuarios->deleteUsuario($id);

        if ($deleted) {
            return response()->json(['message' => 'Usuário excluído com sucesso']);
        } else {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }
    }
}