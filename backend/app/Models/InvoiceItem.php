<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $fillable = [
        'invoice_id',
        'item_number',
        'product_code',
        'product_name',
        'quantity',
        'unit_value',
        'total_value',
        'tax_info',
    ];

    protected $casts = [
        'tax_info' => 'array',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
