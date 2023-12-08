<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    use HasFactory;

    protected $table = 'pais';
    protected $primaryKey = 'ID';

    protected $fillable = [
        'NOME_PAIS',
        'NUMERO_PAIS',
        'CONTINENTE',
    ];
}
