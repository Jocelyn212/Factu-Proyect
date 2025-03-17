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
/* import React, { useState } from "react";
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

      // Vista Previa 
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
 */
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function InvoiceList({ invoices, onSelectInvoice }) {
  
  // 🔹 Función para descargar la factura en PDF
  const handleDownloadPDF = (invoice) => {
    try {
      const doc = new jsPDF();

      // 🔹 Encabezado de la empresa
      doc.setFontSize(14);
      doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, { align: "center" });
      doc.setFontSize(10);
      doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
      doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
      doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
      doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });

      // 🔹 Datos de la factura
      doc.setFontSize(12);
      doc.text(`Factura Nº: ${invoice.invoiceNumber}`, 14, 60);
      doc.text(`Fecha: ${invoice.createdAt}`, 14, 66);

      // 🔹 Datos del cliente
      doc.text("Cliente:", 14, 76);
      doc.setFontSize(10);
      doc.text(`Nombre: ${invoice.clientName}`, 14, 82);
      doc.text(`NIF: ${invoice.clientNIF || "N/A"}`, 14, 88);
      doc.text(`Dirección: ${invoice.clientAddress || "N/A"}`, 14, 94);
      doc.text(`Teléfono: ${invoice.clientPhone || "N/A"}`, 14, 100);

      // 🔹 Validar datos de servicios
      if (!invoice.services || !Array.isArray(invoice.services) || invoice.services.length === 0) {
        throw new Error("No hay servicios en la factura.");
      }

      // 🔹 Crear tabla con servicios
      const tableData = invoice.services.map((service) => [
        service.description || "Sin descripción",
        `${parseFloat(service.amount || 0).toFixed(2)} €`,
      ]);

      doc.autoTable({
        startY: 110,
        head: [["Descripción", "Importe (€)"]],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [200, 200, 200] },
      });

      // 🔹 Totales
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`Subtotal: ${parseFloat(invoice.totalAmount || 0).toFixed(2)} €`, 140, finalY);
      doc.text(`IVA (21%): ${parseFloat(invoice.vat || 0).toFixed(2)} €`, 140, finalY + 6);
      doc.text(`Total: ${parseFloat(invoice.total || 0).toFixed(2)} €`, 140, finalY + 12);

      // 🔹 Guardar PDF
      doc.save(`Factura_${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF: " + error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mt-6">Facturas Generadas</h2>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index} className="border p-2 my-2 flex justify-between">
            <span>{invoice.clientName} - {invoice.total.toFixed(2)}€</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onSelectInvoice(invoice)}
                className="bg-blue-500 text-white p-2"
              >
                Vista Previa
              </button>
              <button
                onClick={() => handleDownloadPDF(invoice)}
                className="bg-green-500 text-white p-2"
              >
                Descargar PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;
