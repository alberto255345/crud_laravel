<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UsuariosRepositoryInterface;
use App\Repositories\UsuariosRepository;
use App\Repositories\TelefoneRepositoryInterface;
use App\Repositories\TelefoneRepository;
use App\Repositories\PaisRepositoryInterface;
use App\Repositories\PaisRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind(UsuariosRepositoryInterface::class, UsuariosRepository::class);
        $this->app->bind(TelefoneRepositoryInterface::class, TelefoneRepository::class);
        $this->app->bind(PaisRepositoryInterface::class, PaisRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
