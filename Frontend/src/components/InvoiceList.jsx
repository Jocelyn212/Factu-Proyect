import React from 'react';

function InvoiceList({ invoices, onSelectInvoice }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-4">Lista de Facturas</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id} className="mb-2">
            <button
              onClick={() => onSelectInvoice(invoice)}
              className="text-blue-500 underline"
            >
              {invoice.invoiceNumber} - {invoice.clientName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;