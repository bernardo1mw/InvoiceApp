<?php

namespace App\Providers;

use App\Application\UseCases\UploadInvoiceUseCase;
use App\Domain\Repositories\InvoiceRepositoryInterface;
use App\Infra\Repositories\InvoiceRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(InvoiceRepositoryInterface::class, InvoiceRepository::class);
        $this->app->bind(UploadInvoiceUseCase::class, UploadInvoiceUseCase::class);

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
