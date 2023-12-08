<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaisesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Exemplo de dados - você precisa adicionar os dados reais aqui
        $paises = [
            ['NOME_PAIS' => 'Brasil', 'NUMERO_PAIS' => '+55', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Argentina', 'NUMERO_PAIS' => '+54', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Chile', 'NUMERO_PAIS' => '+56', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Paraguai', 'NUMERO_PAIS' => '+51', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Uruguai', 'NUMERO_PAIS' => '+598', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Peru', 'NUMERO_PAIS' => '+51', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Colombia', 'NUMERO_PAIS' => '+57', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Venezuela', 'NUMERO_PAIS' => '+58', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Espanha', 'NUMERO_PAIS' => '+34', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Portugal', 'NUMERO_PAIS' => '+351', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'França', 'NUMERO_PAIS' => '+33', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Itália', 'NUMERO_PAIS' => '+39', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Alemanha', 'NUMERO_PAIS' => '+49', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Egito', 'NUMERO_PAIS' => '+20', 'CONTINENTE' => 'África'],
            ['NOME_PAIS' => 'Libéria', 'NUMERO_PAIS' => '+218', 'CONTINENTE' => 'África'],
            ['NOME_PAIS' => 'Sudão', 'NUMERO_PAIS' => '+249', 'CONTINENTE' => 'África'],
            ['NOME_PAIS' => 'Tunísia', 'NUMERO_PAIS' => '+216', 'CONTINENTE' => 'África'],
            ['NOME_PAIS' => 'Marrocos', 'NUMERO_PAIS' => '+212', 'CONTINENTE' => 'África'],
            ['NOME_PAIS' => 'Croácia', 'NUMERO_PAIS' => '+385', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Dinamarca', 'NUMERO_PAIS' => '+45', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Irlanda', 'NUMERO_PAIS' => '+353', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Reino Unido', 'NUMERO_PAIS' => '+44', 'CONTINENTE' => 'Europa'],
            ['NOME_PAIS' => 'Austrália', 'NUMERO_PAIS' => '+61', 'CONTINENTE' => 'Oceania'],
            ['NOME_PAIS' => 'Nova Zelândia', 'NUMERO_PAIS' => '+64', 'CONTINENTE' => 'Oceania'],
            ['NOME_PAIS' => 'Fiji', 'NUMERO_PAIS' => '+679', 'CONTINENTE' => 'Oceania'],
            ['NOME_PAIS' => 'Samoa', 'NUMERO_PAIS' => '+685', 'CONTINENTE' => 'Oceania'],
            ['NOME_PAIS' => 'Tonga', 'NUMERO_PAIS' => '+676', 'CONTINENTE' => 'Oceania'],
            ['NOME_PAIS' => 'Tuvalu', 'NUMERO_PAIS' => '+688', 'CONTINENTE' => 'Oceania'],
            ['NOME_PAIS' => 'Costa Rica', 'NUMERO_PAIS' => '+506', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'México', 'NUMERO_PAIS' => '+52', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Panamá', 'NUMERO_PAIS' => '+507', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Guatemala', 'NUMERO_PAIS' => '+502', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Honduras', 'NUMERO_PAIS' => '+504', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'El Salvador', 'NUMERO_PAIS' => '+503', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Nicarágua', 'NUMERO_PAIS' => '+505', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Cuba', 'NUMERO_PAIS' => '+53', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Haiti', 'NUMERO_PAIS' => '+509', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Guiana', 'NUMERO_PAIS' => '+594', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Guyana', 'NUMERO_PAIS' => '+592', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Suriname', 'NUMERO_PAIS' => '+597', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Bolívia', 'NUMERO_PAIS' => '+591', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Belize', 'NUMERO_PAIS' => '+501', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Jamaica', 'NUMERO_PAIS' => '+1876', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Camarões', 'NUMERO_PAIS' => '+1664', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Martinica', 'NUMERO_PAIS' => '+1664', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Trinidad e Tobago', 'NUMERO_PAIS' => '+1868', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Puerto Rico', 'NUMERO_PAIS' => '+1939', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Bahamas', 'NUMERO_PAIS' => '+1242', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Aruba', 'NUMERO_PAIS' => '+297', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Barbados', 'NUMERO_PAIS' => '+1246', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Cuba', 'NUMERO_PAIS' => '+53', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Haiti', 'NUMERO_PAIS' => '+509', 'CONTINENTE' => 'América'],
            ['NOME_PAIS' => 'Guiana', 'NUMERO_PAIS' => '+594', 'CONTINENTE' => 'América'],
            

            // Adicione outros países aqui
        ];

        foreach ($paises as $pais) {
            DB::table('pais')->insert($pais);
        }
    }
}
