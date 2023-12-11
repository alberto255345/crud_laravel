<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller
{
    public function index()
    {
        $usuarios = Usuarios::leftjoin('telefones', 'usuarios.ID', '=', 'telefones.USUARIO_ID')->select('usuarios.*', 'telefones.TELEFONE')->get();
        return response()->json($usuarios);
    }

    public function show($id)
    {
        $usuario = Usuarios::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        return response()->json($usuario);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'cpf' => 'required|cpf|unique:usuarios',
            'telefoneinput' => ''
            // Adicione outras regras de validação conforme necessário
        ]);

        $usuario = Usuarios::create([
            'NOME' => $request->nome,
            'CPF' => $request->cpf,
        ]);

        // Verifique se o telefone foi enviado e se é válido, telefone é um array
        if (isset($request->telefoneinput) && is_array($request->telefoneinput)) {
            foreach ($request->telefoneinput as $index => $telefone) {
                // Acesse diretamente o código e o telefone usando o índice
                $code = $request->ddiinput[$index];

                $usuario->telefones()->create([
                    'TELEFONE' => $telefone,
                    'COUNTRY_CODE' => $code
                ]);
            }
        }

        return response()->json($usuario, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required',
            'cpf' => 'required|CPF|unique:usuarios,'.$id,
        ]);

        $usuario = Usuarios::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $usuario->update($request->all());

        return response()->json($usuario);
    }

    public function destroy($id)
    {
        $usuario = Usuarios::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['message' => 'Usuário excluído com sucesso']);
    }
}
