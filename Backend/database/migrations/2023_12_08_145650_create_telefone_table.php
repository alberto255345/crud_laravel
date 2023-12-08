<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('telefones', function (Blueprint $table) {
            $table->integer('ID')->autoIncrement();
            $table->integer('COUNTRY_CODE')->nullable();
            $table->string('TELEFONE');
            $table->integer('USUARIO_ID')->nullable();
            $table->timestamps();
            $table->foreign('USUARIO_ID')->references('ID')->on('usuarios')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('COUNTRY_CODE')->references('ID')->on('pais')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telefones');
    }
};
