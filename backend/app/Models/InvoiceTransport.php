<?php


// app/Models/InvoiceTransport.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceTransport extends Model
{
    protected $fillable = [
        'invoice_id',
        'freight_type',
        'volume_quantity',
        'volume_description',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
