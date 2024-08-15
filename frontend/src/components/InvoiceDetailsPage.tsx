import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Invoice } from "../interfaces/Invoice";
import { fetchInvoiceById } from "../api/invoiceApi";

const InvoiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    async function getInvoiceDetails() {
      if (id) {
        try {
          const data = await fetchInvoiceById(id);
          setInvoice(data);
        } catch (error) {
          console.error("Erro ao buscar detalhes da fatura", error);
        }
      }
    }
    getInvoiceDetails();
  }, [id]);

  if (!invoice) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Detalhes da Nota Fiscal</h2>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">
          Informações da Nota Fiscal
        </h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Número da Nota:</strong> {invoice.invoice_number}
          </li>
          <li>
            <strong>Data:</strong> {invoice.date}
          </li>
          <li>
            <strong>Valor Total:</strong> {invoice.total_value}
          </li>
          <li>
            <strong>Número do Protocolo:</strong> {invoice.protocol_number}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Emitente</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Nome:</strong> {invoice.emitter.name}
          </li>
          <li>
            <strong>CNPJ:</strong> {invoice.emitter.cnpj}
          </li>
          <li>
            <strong>Endereço:</strong> {invoice.emitter.street},{" "}
            {invoice.emitter.number}, {invoice.emitter.cep},{" "}
            {invoice.emitter.uf}, {invoice.emitter.country_code}
          </li>
          <li>
            <strong>Telefone:</strong> {invoice.emitter.phone}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Destinatário</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Nome:</strong> {invoice.recipient.name}
          </li>
          <li>
            <strong>CNPJ:</strong> {invoice.recipient.cnpj}
          </li>
          <li>
            <strong>Endereço:</strong> {invoice.recipient.street},{" "}
            {invoice.recipient.number}, {invoice.recipient.cep},{" "}
            {invoice.recipient.uf}, {invoice.recipient.country_code}
          </li>
          <li>
            <strong>Telefone:</strong> {invoice.recipient.phone}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Itens da Nota Fiscal</h3>
        <ul className="list-disc pl-6">
          {invoice.items.map((item, index) => (
            <li key={item.id} className="mb-4">
              <p className="text-xl">
                <strong>Item {index + 1}</strong>
              </p>
              <p>
                <strong>Código do Produto:</strong> {item.product_code}
              </p>
              <p>
                <strong>Nome do Produto:</strong> {item.product_name}
              </p>
              <p>
                <strong>Quantidade:</strong> {item.quantity}
              </p>
              <p>
                <strong>Valor Unitário:</strong> {item.unit_value}
              </p>
              <p>
                <strong>Valor Total:</strong> {item.total_value}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Pagamentos</h3>
        <ul className="list-disc pl-6">
          {invoice.payments.map((payment) => (
            <li key={payment.id} className="mb-4">
              <p>
                <strong>Tipo de Pagamento:</strong> {payment.payment_type}
              </p>
              <p>
                <strong>Valor do Pagamento:</strong> {payment.payment_value}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Transportes</h3>
        <ul className="list-disc pl-6">
          {invoice.transports.map((transport) => (
            <li key={transport.id} className="mb-4">
              <p>
                <strong>Tipo de Frete:</strong> {transport.freight_type}
              </p>
              <p>
                <strong>Quantidade de Volume:</strong>{" "}
                {transport.volume_quantity}
              </p>
              <p>
                <strong>Descrição do Volume:</strong>{" "}
                {transport.volume_description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default InvoiceDetailsPage;
