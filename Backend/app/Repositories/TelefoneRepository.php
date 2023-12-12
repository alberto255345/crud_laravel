<?php 

namespace App\Repositories;

use App\Models\Telefone;
use App\Repositories\TelefoneRepositoryInterface;

class TelefoneRepository implements TelefoneRepositoryInterface
{
    public function findTelefonesByUsuarioId($usuarioId)
    {
        $telefones = Telefone::where('USUARIO_ID', $usuarioId)->get();
        
        return $telefones;
    }
}