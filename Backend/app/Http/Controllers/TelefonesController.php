<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\TelefoneRepositoryInterface;

class TelefonesController extends Controller
{
    protected $telefoneRepository;

    public function __construct(TelefoneRepositoryInterface $telefoneRepository)
    {
        $this->telefoneRepository = $telefoneRepository;
    }

    public function show($id)
    {
        $telefone = $this->telefoneRepository->findTelefonesByUsuarioId($id);

        if ($telefone->isEmpty()) {
            return response()->json(['message' => 'Telefone não encontrado'], 404);
        }

        return response()->json($telefone);
    }
}