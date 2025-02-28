/* import React from 'react';

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

export default InvoiceList; */
import React, { useState } from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import { jsPDF } from "jspdf";

function InvoiceList({ invoices }) {
  const [previewInvoice, setPreviewInvoice] = useState(null); // Factura seleccionada para la vista previa

  const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF({
      format: "a4",
      unit: "mm",
    });

    doc.html(document.getElementById(`invoice-${invoice._id}`), {
      callback: (pdf) => {
        pdf.save(`Factura_${invoice.clientName}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 800,
    });
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Lista de Facturas</h2>
      {invoices.length === 0 ? (
        <p>No hay facturas disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {invoices.map((invoice) => (
            <li key={invoice._id} className="border p-4 rounded shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Factura Nº:</strong> {invoice.invoiceNumber}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {invoice.clientName}
                  </p>
                  <p>
                    <strong>Total:</strong> {invoice.total.toFixed(2)} €
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setPreviewInvoice(invoice)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(invoice)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Vista Previa */}
      {previewInvoice && (
        <div className="mt-8">
          <h3 className="text-xl mb-4">Vista Previa de la Factura</h3>
          <div
            id={`invoice-${previewInvoice._id}`}
            className="border p-4 bg-white shadow-lg"
          >
            <InvoiceTemplate invoice={previewInvoice} />
          </div>
          <button
            onClick={() => setPreviewInvoice(null)}
            className="mt-4 bg-gray-500 text-white p-2 rounded"
          >
            Cerrar Vista Previa
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;
