<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\PaisRepositoryInterface;

class PaisController extends Controller
{
    protected $paisRepository;

    public function __construct(PaisRepositoryInterface $paisRepository)
    {
        $this->paisRepository = $paisRepository;
    }

    public function index()
    {
        $paises = $this->paisRepository->getAll();
        return response()->json($paises);
    }
}