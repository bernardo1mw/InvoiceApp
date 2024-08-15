// src/components/InvoiceList.tsx
import React, { useState, useEffect } from "react";
import { downloadInvoice, fetchInvoices } from "../api/invoiceApi";
import FilterBar from "./FilterBar";
import { Invoice } from "../interfaces/Invoice";
import { Link } from 'react-router-dom'; // Importe o Link do React Router


const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>("invoice_number");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    async function getInvoices() {
      const response = await fetchInvoices(currentPage);
      setInvoices(response.data);
      setFilteredInvoices(response.data);
      setCurrentPage(response.current_page);
      setTotalPages(response.last_page);
    }
    getInvoices();
  }, [currentPage]);

  const handleFilter = (query: string) => {
    const filtered = invoices.filter(
      (invoice) =>
        invoice.invoice_number.includes(query) ||
        invoice.emitter.name.toLowerCase().includes(query.toLowerCase()) ||
        invoice.recipient.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDownload = (invoice: Invoice) => {
    const fileName = invoice.xml_path; // Extrair o nome do arquivo
    if (fileName) {
      downloadInvoice(fileName);
    }
  };

  const handleSort = (column: string) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
      if (column === "date" || column === "total_value") {
        const aVal = column === "date" ? new Date(a[column]) : a[column];
        const bVal = column === "date" ? new Date(b[column]) : b[column];

        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
      } else if (column === "invoice_number") {
        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });

    setFilteredInvoices(sortedInvoices);
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <i className="fas fa-sort-up ml-2"></i>
      ) : (
        <i className="fas fa-sort-down ml-2"></i>
      );
    } else {
      return <i className="fas fa-sort ml-2"></i>;
    }
  };

  return (
    <div className="invoice-list">
      <FilterBar onFilter={handleFilter} />
      <table className="table-auto border-collapse w-full rounded-lg overflow-hidden min-w-[800px]">
        <thead>
          <tr className="text-left bg-slate-300">
            <th
              onClick={() => handleSort("invoice_number")}
              className="px-4 py-2 cursor-pointer min-w-32"
            >
              <div className="flex">
                <div>Número da Nota</div>
                <div className="content-center">
                  {renderSortIcon("invoice_number")}
                </div>
              </div>
            </th>
            <th
              onClick={() => handleSort("date")}
              className="px-4 py-2 cursor-pointer"
            >
              <div className="flex">
                <div>Data</div>
                <div className="content-center">{renderSortIcon("date")}</div>
              </div>
            </th>

            <th className="px-4 py-2">Emitente</th>
            <th className="px-4 py-2">Destinatário</th>
            <th
              onClick={() => handleSort("total_value")}
              className="px-4 py-2 cursor-pointer min-w-32"
            >
              <div className="flex">
                <div>Valor Total (R$)</div>
                <div className="content-center">
                  {renderSortIcon("total_value")}
                </div>
              </div>
            </th>
            <th className="px-4 py-2">Download</th>
            <th className="px-4 py-2">Detalhes</th>

          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td className="px-5">{invoice.invoice_number}</td>
                <td className="px-5">
                  {new Date(invoice.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-5">{invoice.emitter.name}</td>
                <td className="px-5">{invoice.recipient.name}</td>
                <td className="px-5">{invoice.total_value}</td>
                <td>
                  <button
                    onClick={() => handleDownload(invoice)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Download XML
                  </button>
                </td>
                <td>
                <Link to={`/invoices/${invoice.id}`} className="text-blue-500 hover:underline">Detalhes</Link>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="text-blue-500 hover:text-blue-700 mx-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="text-blue-500 hover:text-blue-700 mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceList;
