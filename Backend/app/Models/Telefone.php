<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Telefone extends Model
{
    use HasFactory;

    protected $table = 'telefones';
    protected $primaryKey = 'ID';
    protected $fillable = ['COUNTRY_CODE', 'TELEFONE', 'USUARIO_ID'];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'USUARIO_ID');
    }

    public function pais(): BelongsTo
    {
        return $this->belongsTo(Pais::class, 'COUNTRY_CODE');
    }
}
