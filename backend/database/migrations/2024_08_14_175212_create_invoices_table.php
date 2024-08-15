<?php
// database/migrations/xxxx_xx_xx_create_invoices_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->dateTime('date');
            $table->decimal('total_value', 15, 2);
            $table->string('protocol_number');
            $table->timestamps();
            $table->foreignId('emitter_id')->constrained('company');
            $table->foreignId('dest_id')->constrained('company');
            $table->string('xml_path')->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
