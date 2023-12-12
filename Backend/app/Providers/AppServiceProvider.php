<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UsuariosRepositoryInterface;
use App\Repositories\UsuariosRepository;
use App\Repositories\TelefoneRepositoryInterface;
use App\Repositories\TelefoneRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind(UsuariosRepositoryInterface::class, UsuariosRepository::class);
        $this->app->bind(TelefoneRepositoryInterface::class, TelefoneRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
