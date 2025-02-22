/* function InvoiceList({ invoices, onSelectInvoice }) {
    return (
      <div className="mt-6">
        <h2 className="text-2xl mb-4">Invoice List</h2>
        <ul className="bg-white p-6 rounded shadow-md">
          {invoices.map(invoice => (
            <li key={invoice.id} className="border-b last:border-b-0 p-4">
              <p><strong>Client Name:</strong> {invoice.clientName}</p>
              <p><strong>Amount:</strong> {(invoice.totalAmount ?? 0).toFixed(2)} €</p>
              <p><strong>Due Date:</strong> {invoice.dueDate}</p>
              <button onClick={() => onSelectInvoice(invoice)} className="bg-blue-500 text-white p-2 mt-4">View Invoice</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default InvoiceList; */
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