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
        ]);

        $usuario = $this->usuarios->createUsuario($request);

        return response()->json($usuario, 201);
    }

    private function validarCPF($cpf) {
        // Remover caracteres não numéricos
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
    
        // Verificar se o CPF possui 11 dígitos
        if (strlen($cpf) != 11) {
            return false;
        }
    
        // Verificar se todos os dígitos são iguais
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }
    
        // Calcular os dígitos verificadores
        for ($i = 9, $j = 0, $soma1 = 0, $soma2 = 0; $i > 0; $i--, $j++) {
            $soma1 += $cpf[$i - 1] * $i;
            $soma2 += $cpf[$j] * $i;
        }
    
        $rest1 = $soma1 % 11;
        $rest2 = $soma2 % 11;
    
        $dv1 = ($rest1 < 2) ? 0 : 11 - $rest1;
        $dv2 = ($rest2 < 2) ? 0 : 11 - $rest2;
    
        // Verificar se os dígitos verificadores estão corretos
        if ($dv1 == $cpf[9] && $dv2 == $cpf[10]) {
            return true;
        } else {
            return false;
        }
    }

    public function validcpf($cpf)
    {
        // confirma que o cpf possui 11 caracteres ou seja
        if (strlen($cpf) != 14 && $this->validarCPF($cpf) == false) {
            return response()->json([
                'message' => 'CPF inválido',
                'success' => false
            ], 200);
        }

        // valida se o cpf já está cadastrado no banco de dados
        $usuario = $this->usuarios->getUsuarioByCpf($cpf);

        if ($usuario) {
            return response()->json([
                'message' => 'CPF já cadastrado',
                'success' => false
            ], 200);
        } else {
            return response()->json([
                'message' => 'CPF válido',
                'success' => true,
            ], 200);
        }
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