<?php 

namespace App\Repositories;

use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\UsuariosRepositoryInterface;

class UsuariosRepository implements UsuariosRepositoryInterface
{
    public function getAllUsuarios()
    {
        $usuarios = DB::table('usuarios')
        ->leftJoin('telefones', 'usuarios.ID', '=', 'telefones.USUARIO_ID')
        ->leftJoin('pais', 'pais.ID', '=', 'telefones.COUNTRY_CODE')
        ->select('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF', DB::raw('GROUP_CONCAT(CONCAT(pais.NUMERO_PAIS, " ", telefones.TELEFONE)) as TELEFONE'), 'usuarios.created_at')
        ->groupBy('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF')
        ->get();

        return $usuarios;
    }

    public function getUsuarioById($id)
    {
        $usuario = Usuarios::leftJoin('telefones', 'usuarios.ID', '=', 'telefones.USUARIO_ID')
        ->leftJoin('pais', 'pais.ID', '=', 'telefones.COUNTRY_CODE')
        ->select('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF', DB::raw('GROUP_CONCAT(CONCAT(pais.NUMERO_PAIS, " ", telefones.TELEFONE)) as TELEFONE'), 'usuarios.created_at')
        ->groupBy('usuarios.ID', 'usuarios.NOME', 'usuarios.CPF')
        ->where('usuarios.ID', $id)
        ->first();

        return $usuario;
    }

    public function getUsuarioByCpf($cpf)
    {
        $usuario = Usuarios::where('CPF', $cpf)->first();

        // Verifica se o usuário existe
        if (!$usuario) {
            return false;
        }else{
            return true;
        }

    }

    public function createUsuario(Request $request)
    {
        // A validação deve ocorrer no nível do Controller
        $usuario = Usuarios::create([
            'NOME' => $request->nome,
            'CPF' => $request->cpf,
        ]);

        if (isset($request->telefoneinput) && is_array($request->telefoneinput)) {
            foreach ($request->telefoneinput as $index => $telefone) {
                $code = $request->ddiinput[$index] ?? null; // Ajuste conforme sua lógica de negócio

                $usuario->telefones()->create([
                    'TELEFONE' => $telefone,
                    'COUNTRY_CODE' => $code
                ]);
            }
        }

        // É importante isolar o método de recuperação para que ele também possa ser reutilizado
        $usuario = $this->getUsuarioById($usuario->ID);

        return $usuario;
    }

    public function deleteUsuario($id)
    {
        $usuario = Usuarios::find($id);

        if (!$usuario) {
            return false;
        }

        $usuario->delete();

        return true;
    }
}