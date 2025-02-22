/* import React, { forwardRef } from "react";

const InvoiceTemplate = forwardRef(({ invoice }, ref) => {
  return (
    <div ref={ref} className="w-[210mm] h-[297mm] p-[20mm] box-border text-[12pt]">
      <div className="flex justify-between items-center mb-[10mm]">
        <img src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png" alt="Company Logo" className="w-[240px] h-auto" />
        <div className="text-right">
          <h5 className="m-0">OBRES I SERVEIS MIG-MON 2022 S.C.P</h5>
          <li className="m-0 text ">ARQUITECTE GAUDI 7 3º 2º</li>
          <p className="m-0">SANT FRUITOS DE BAGES</p>
          <p className="m-0">08272</p>
          <p className="m-0">Email: info@yourcompany.com</p>
          <p className="m-0">Phone: 34 625254144 - 653903600</p>
        </div>
      </div>
      <div className="mb-4">
        <p><strong>Factura Nº:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Cliente:</strong> {invoice.clientName}</p>
        <p><strong>Fecha:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
      </div>
      <table className="w-full mb-[20mm] border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-900 p-2 text-left">Description</th>
            <th className="border border-black p-2 text-right">Importe</th>
          </tr>
        </thead>
        <tbody>
          {invoice.services.map((service, index) => (
            <tr key={index}>
              <td className="border border-gray-900 p-2 text-left">{service.description}</td>
              <td className="border border-gray-900 text-right p-2">{service.amount} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <p><strong>SubTotal:</strong> {invoice.totalAmount.toFixed(2)} €</p>
        <p><strong>IVA (21%):</strong> {invoice.vat.toFixed(2)} €</p>
        <p><strong>Total:</strong> {invoice.total.toFixed(2)} €</p>
      </div>
    </div>
  );
});

export default InvoiceTemplate;
 */
import React, { forwardRef } from 'react';

const InvoiceTemplate = forwardRef(({ invoice }, ref) => {
  return (
    <div ref={ref} className="w-[210mm] h-[297mm] p-[20mm] bg-white" style={{ boxSizing: 'border-box' }}>
      {/* Cabecera */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <img 
            src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png" 
            alt="Company Logo" 
            className="w-[240px] h-auto"
          />
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold mb-2">FACTURA</h2>
          <p className="font-bold">Nº: {invoice.invoiceNumber}</p>
          <p>Fecha: {new Date(invoice.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Información de la empresa */}
      <div className="mb-8">
        <h5 className="font-bold">OBRES I SERVEIS MIG-MON 2022 S.C.P</h5>
        <p>ARQUITECTE GAUDI 7 3º 2º</p>
        <p>SANT FRUITOS DE BAGES</p>
        <p>08272</p>
        <p>Email: info@yourcompany.com</p>
        <p>Phone: 34 625254144 - 653903600</p>
      </div>

      {/* Información del cliente */}
      <div className="mb-8">
        <h3 className="font-bold mb-2">Cliente:</h3>
        <p>{invoice.clientName}</p>
        <p>{invoice.clientAddress}</p>
        <p>NIF/CIF: {invoice.clientNIF}</p>
      </div>

      {/* Tabla de servicios */}
      <table className="w-full mb-8 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Descripción</th>
            <th className="border border-gray-300 p-2 text-right w-[150px]">Importe</th>
          </tr>
        </thead>
        <tbody>
          {invoice.services && invoice.services.map((service, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{service.description}</td>
              <td className="border border-gray-300 p-2 text-right">
                {service.amount.toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <div className="w-[200px] ml-auto">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>{invoice.totalAmount?.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>IVA (21%):</span>
          <span>{invoice.vat?.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{invoice.total?.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
});

export default InvoiceTemplate;