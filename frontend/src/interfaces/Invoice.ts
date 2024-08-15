
export interface Company {
  id: number;
  cnpj: string;
  name: string;
  street: string;
  number: string;
  cep: string;
  uf: string;
  country_code: string;
  phone: string;
}


export interface Invoice {
  id: number;
  invoice_number: string;
  date: string;
  total_value: number;
  protocol_number: string;
  emitter: Company;
  recipient: Company;
  xml_path: string;
  items: InvoiceItem[];
  payments: InvoicePayment[];
  transports: InvoiceTransport[];
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  item_number: number;
  product_code: string;
  product_name: string;
  quantity: number;
  unit_value: string;
  total_value: string;
  tax_info: Record<string, any>;
}

export interface InvoicePayment {
  id: number;
  invoice_id: number;
  payment_type: string;
  payment_value: string;
}

export interface InvoiceTransport {
  id: number;
  invoice_id: number;
  freight_type: string;
  volume_quantity: number;
  volume_description: string;
}
