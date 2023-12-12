<?php 

namespace App\Repositories;

use App\Models\Pais;
use App\Repositories\PaisRepositoryInterface;

class PaisRepository implements PaisRepositoryInterface
{
    public function getAll()
    {
        return Pais::all();
    }
}