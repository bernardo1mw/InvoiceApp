<?php
// database/migrations/xxxx_xx_xx_create_invoice_transports_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceTransportsTable extends Migration
{
    public function up()
    {
        Schema::create('invoice_transports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->integer('freight_type');
            $table->decimal('volume_quantity', 10, 2)->nullable();
            $table->string('volume_description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoice_transports');
    }
}
