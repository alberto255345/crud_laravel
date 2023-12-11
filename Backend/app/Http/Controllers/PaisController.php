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
}
