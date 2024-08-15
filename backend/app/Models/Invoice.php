<?php
// app/Models/Invoice.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_number',
        'date',
        'total_value',
        'protocol_number',
        'emitter_id',
        'dest_id',
        'xml_path'
    ];


    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function transports()
    {
        return $this->hasMany(InvoiceTransport::class);
    }

    public function payments()
    {
        return $this->hasMany(InvoicePayment::class);
    }


    public function emitter()
    {
        return $this->belongsTo(Company::class, 'emitter_id');
    }

    /**
     * Define o relacionamento com o destinatário (company).
     */
    public function recipient()
    {
        return $this->belongsTo(Company::class, 'dest_id');
    }
}
