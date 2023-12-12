<?php 

namespace App\Repositories;

interface TelefoneRepositoryInterface
{
    public function findTelefonesByUsuarioId($usuarioId);
}