<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Telefone;

class TelefonesController extends Controller
{
    // Exibir um telefone específico
    public function show($id)
    {
        // where com o USUARIO_ID
        $telefone = Telefone::where('USUARIO_ID', $id)->get();

        if (!$telefone) {
            return response()->json(['message' => 'Telefone não encontrado'], 404);
        }

        return response()->json($telefone);
    }
}
