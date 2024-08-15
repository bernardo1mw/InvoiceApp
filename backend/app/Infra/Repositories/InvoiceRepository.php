<?php

namespace App\Infra\Repositories;

use App\Domain\Repositories\InvoiceRepositoryInterface;
use App\Models\Invoice;

class InvoiceRepository implements InvoiceRepositoryInterface
{
    public function save(Invoice $invoice): Invoice
    {
        $existingInvoice = Invoice::where('invoice_number', $invoice->invoice_number)->first();

    if ($existingInvoice) {
        // Atualiza o registro existente
        $existingInvoice->update([
            'date' => $invoice->date,
            'total_value' => $invoice->total_value,
            'protocol_number' => $invoice->protocol_number,
            'emitter_id' => $invoice->emitter_id,
            'dest_id' => $invoice->dest_id,
        ]);
        return $existingInvoice;
    } else {
        // Cria um novo registro
        $invoice->save();
        return $invoice;
    }
    }

    public function findById(int $id): ?Invoice
    {
        return Invoice::find($id);
    }

    public function findAll(): array
    {
        return Invoice::paginate(100)->items();
    }
}
