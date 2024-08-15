<?php

namespace App\Http\Controllers;

use App\Application\UseCases\UploadInvoiceUseCase;
use App\Domain\Repositories\InvoiceRepositoryInterface;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InvoiceController extends Controller
{
    private $uploadInvoiceUseCase;
    private $invoiceRepository;

    public function __construct(
        UploadInvoiceUseCase $uploadInvoiceUseCase,
        InvoiceRepositoryInterface $invoiceRepository
    ) {
        $this->uploadInvoiceUseCase = $uploadInvoiceUseCase;
        $this->invoiceRepository = $invoiceRepository;
    }

    public function upload(Request $request)
    {
        try {

        $request->validate([
            'file' => 'required|file',
        ]);
        $this->uploadInvoiceUseCase->execute($request->file('file'));
        return response()->json(['message'=> 'SUCCESS'], 200);

        } catch (\Throwable $th) {
            return response()->json(['message'=> $th->getMessage()], 400);
        }

    }

    public function index()
    {
        $invoices = Invoice::with('emitter', 'recipient', 'items')->paginate(10);

        return response()->json($invoices);
    }

    public function show($id)
    {
        $invoice = Invoice::with([
            'emitter',
            'recipient',
            'items',
            'payments',
            'transports'
        ])->findOrFail($id);

        return response()->json($invoice);
    }

    public function download($filename): StreamedResponse
    {
        $filePath = 'public/uploads/' . $filename;

        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        } else {
            return abort(404, 'File not found');
        }
    }
}
