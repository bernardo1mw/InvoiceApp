import React from 'react';
import { Invoice } from '../interfaces/Invoice';

interface InvoiceDetailsProps {
  invoice: Invoice;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice }) => {
  return (
    <div className="invoice-details">
      <h3>Invoice Details</h3>
      <p><strong>Invoice Number:</strong> {invoice.invoice_number}</p>
      <p><strong>Date:</strong> {invoice.date}</p>
      {/* <p><strong>Emitter:</strong> {invoice.emitter.CNPJ}</p> */}
      {/* <p><strong>Recipient:</strong> {invoice.recipient.CNPJ}</p> */}
      <p><strong>Total Value:</strong> {invoice.total_value}</p>
      {/* <a href={`http://localhost/storage/${invoice.xml_path}`} download>Download XML</a> */}
    </div>
  );
};

export default InvoiceDetails;
