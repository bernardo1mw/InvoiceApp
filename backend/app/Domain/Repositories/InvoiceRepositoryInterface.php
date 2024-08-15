<?php

namespace App\Domain\Repositories;

use App\Models\Invoice;

interface InvoiceRepositoryInterface
{
    public function save(Invoice $invoice): Invoice;
    public function findById(int $id): ?Invoice;
    public function findAll(): array;
}
