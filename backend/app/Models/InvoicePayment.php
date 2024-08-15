<?php



// app/Models/InvoicePayment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoicePayment extends Model
{
    protected $fillable = [
        'invoice_id',
        'payment_type',
        'payment_value',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
