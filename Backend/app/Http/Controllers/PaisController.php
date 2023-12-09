<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;

class PaisController extends Controller
{
    public function index()
    {
        $paises = Pais::all();
        return response()->json($paises);
    }

    public function show($id)
    {
        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'País não encontrado'], 404);
        }

        return response()->json($pais);
    }

    public function store(Request $request)
    {
        $request->validate([
            'NOME_PAIS' => 'required',
            'NUMERO_PAIS' => 'required',
            'CONTINENTE' => 'required',
            // Adicione outras regras de validação conforme necessário
        ]);

        $pais = Pais::create($request->all());

        return response()->json($pais, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'NOME_PAIS' => 'required',
            'NUMERO_PAIS' => 'required',
            'CONTINENTE' => 'required',
            // Adicione outras regras de validação conforme necessário
        ]);

        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'País não encontrado'], 404);
        }

        $pais->update($request->all());

        return response()->json($pais);
    }

    public function destroy($id)
    {
        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'País não encontrado'], 404);
        }

        $pais->delete();

        return response()->json(['message' => 'País excluído com sucesso']);
    }
}
