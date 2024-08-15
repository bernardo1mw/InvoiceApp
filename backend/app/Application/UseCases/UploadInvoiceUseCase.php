<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\InvoiceRepositoryInterface;
use App\Models\Company;
use App\Models\Invoice;
use Exception;

class UploadInvoiceUseCase
{
    private $invoiceRepository;

    public function __construct(
        InvoiceRepositoryInterface $invoiceRepository
    ) {
        $this->invoiceRepository = $invoiceRepository;
    }

    public function execute($xmlFile): bool
    {
        // Validate file type
        if ($xmlFile->getClientOriginalExtension() !== 'xml') {
            throw new Exception("Invalid file type.");
        }

        // Load XML file
        $xml = simplexml_load_file($xmlFile);

        // Register namespaces
        $namespaces = $xml->getNamespaces(true);
        $xml->registerXPathNamespace('nfe', $namespaces['http://www.portalfiscal.inf.br/nfe'] ?? '');
        $xml->registerXPathNamespace('ds', $namespaces['http://www.w3.org/2000/09/xmldsig#'] ?? '');

        // $protNFe = $xml->protNFe;

        $emitenteCNPJ = isset($xml->NFe->infNFe->emit->CNPJ) ? (string) $xml->NFe->infNFe->emit->CNPJ : null;
        $nProt = isset($xml->protNFe->infProt->nProt) ? $xml->protNFe->infProt->nProt : null;

        if (!$emitenteCNPJ || $emitenteCNPJ !== "09066241000884") {
            throw new Exception("CNPJ Inválido.");
        }

        if (!$nProt) {

            throw new Exception("Protocolo de autorização ausente.");
        }

        // Get emitter data
        $emit = $xml->NFe->infNFe->emit;
        $emitterData = [
            'cnpj' => (string)$emit->CNPJ,
            'name' => (string)$emit->xNome,
            'street' => (string)$emit->enderEmit->xLgr ?? '',
            'number' => (string)$emit->enderEmit->nro ?? '',
            'cep' => (string)$emit->enderEmit->CEP ?? '',
            'uf' => (string)$emit->enderEmit->UF ?? '',
            'country_code' => (string)$emit->enderEmit->cPais ?? '',
        ];

        // Get recipient data
        $dest = $xml->NFe->infNFe->dest;
        $recipientData = [
            'cnpj' => (string)$dest->CNPJ,
            'name' => (string)$dest->xNome,
            'street' => (string)$dest->enderDest->xLgr ?? '',
            'number' => (string)$dest->enderDest->nro ?? '',
            'cep' => (string)$dest->enderDest->CEP ?? '',
            'uf' => (string)$dest->enderDest->UF ?? '',
            'country_code' => (string)$dest->enderDest->cPais ?? '',
            'phone' => (string)$dest->enderDest->fone ?? '',
        ];

        // Save or get existing company for emitter
        $emitter = Company::updateOrCreate(
            ['cnpj' => $emitterData['cnpj']],
            $emitterData
        );

        // Save or get existing company for recipient
        $recipient = Company::updateOrCreate(
            ['cnpj' => $recipientData['cnpj']],
            $recipientData
        );


        $date = explode("T",(string) $xml->NFe->infNFe->ide->dhEmi)[0] ?? '';
        $xml_path = $xmlFile->getClientOriginalName();
        print_r($xml_path);
        $invoice = new Invoice([
            'invoice_number' => (string)$xml->NFe->infNFe->ide->nNF,
            'date' => $date,
            'total_value' => (float)$xml->NFe->infNFe->total->ICMSTot->vNF,
            'protocol_number' => (string)$xml->protNFe->infProt->nProt,
            'emitter_id' => $emitter->id,
            'dest_id' => $recipient->id,
            'xml_path' => $xml_path
        ]);

        $invoice = $this->invoiceRepository->save($invoice);

        $items = $xml->NFe->infNFe->det;
        foreach ($items as $item) {
            $invoice->items()->create([
                'item_number' => (int) $item['nItem'],
                'product_code' => (string) $item->prod->cProd,
                'product_name' => (string) $item->prod->xProd,
                'quantity' => (float) $item->prod->qCom,
                'unit_value' => (float) $item->prod->vUnCom,
                'total_value' => (float) $item->prod->vProd,
                'tax_info' => json_encode([
                    'ICMS' => $item->imposto->ICMS->ICMS00 ?? null,
                    'IPI' => $item->imposto->IPI->IPINT ?? null,
                    'PIS' => $item->imposto->PIS->PISAliq ?? null,
                    'COFINS' => $item->imposto->COFINS->COFINSAliq ?? null
                ])
            ]);
        }

        $transports = $xml->NFe->infNFe->transp;
        foreach ($transports as $transport) {
            $invoice->transports()->create([
                'freight_type' => (int) $transport->modFrete,
                'volume_quantity' => (float) $transport->vol->qVol ?? null,
                'volume_description' => (string) $transport->vol->esp ?? null,
            ]);
        }

        $payments = $xml->NFe->infNFe->pag->detPag;
        foreach ($payments as $payment) {
            $invoice->payments()->create([
                'payment_type' => (int) $payment->tPag,
                'payment_value' => (float) $payment->vPag
            ]);
        }

        // Save XML file
        $path = $xmlFile->storeAs('public/uploads', $xmlFile->getClientOriginalName());

        return $path;
        // return true;
    }
}
