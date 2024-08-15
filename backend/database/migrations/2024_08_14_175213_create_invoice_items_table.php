<?php
// database/migrations/xxxx_xx_xx_create_invoice_items_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceItemsTable extends Migration
{
    public function up()
    {
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->integer('item_number');
            $table->string('product_code');
            $table->string('product_name');
            $table->decimal('quantity', 10, 2);
            $table->decimal('unit_value', 15, 2);
            $table->decimal('total_value', 15, 2);
            $table->json('tax_info')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoice_items');
    }
}
