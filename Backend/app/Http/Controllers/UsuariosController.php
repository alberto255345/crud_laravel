<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use Illuminate\Support\Facades\DB;

class UsuariosController extends Controller
{
    public function index()
    {
        $usuarios = DB::table('usuarios')
        ->leftJoin('telefones', 'usuarios.ID', '=', 'telefones.USUARIO_ID')
        ->leftJoin('pais', 'pais.ID', '=', 'telefones.COUNTRY_CODE')
        ->select('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF', DB::raw('GROUP_CONCAT(CONCAT(pais.NUMERO_PAIS, " ", telefones.TELEFONE)) as TELEFONE'), 'usuarios.created_at')
        ->groupBy('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF')
        ->get();

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

        $usuario = Usuarios::leftJoin('telefones', 'usuarios.ID', '=', 'telefones.USUARIO_ID')
        ->leftJoin('pais', 'pais.ID', '=', 'telefones.COUNTRY_CODE')
        ->select('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF', DB::raw('GROUP_CONCAT(CONCAT(pais.NUMERO_PAIS, " ", telefones.TELEFONE)) as TELEFONE'), 'usuarios.created_at')
        ->groupBy('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF')
        ->where('usuarios.ID', $usuario->ID)
        ->first();

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
