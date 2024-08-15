<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    // Nome da tabela associada ao modelo
    protected $table = 'company';  // Certifique-se de que o nome da tabela corresponda à sua migração

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'cnpj',
        'name',
        'street',
        'number',
        'cep',
        'uf',
        'country_code',
        'phone',
    ];

    // Definir o nome da chave primária (se não for "id")
    protected $primaryKey = 'id';

    // Se a chave primária não é um inteiro autoincrementável
    public $incrementing = true;

    // Se a tabela usa timestamps (created_at, updated_at)
    public $timestamps = true;

    // Se o modelo deve usar o formato de data do Laravel
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    // Se a tabela não tem o campo "id" como chave primária
    // protected $keyType = 'string';

    // Se o campo "id" não é incrementável
    // public $incrementing = false;

    // Se a tabela não tem timestamps (created_at, updated_at)
    // public $timestamps = false;
    public function emittedInvoices()
    {
        return $this->hasMany(Invoice::class, 'emitter_id');
    }

    /**
     * Define o relacionamento com invoices como destinatário.
     */
    public function receivedInvoices()
    {
        return $this->hasMany(Invoice::class, 'dest_id');
    }
}
