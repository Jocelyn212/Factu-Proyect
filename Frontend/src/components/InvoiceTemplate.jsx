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
/* import React, { forwardRef } from 'react';

const InvoiceTemplate = forwardRef(({ invoice }, ref) => {
  return (
    <div ref={ref} style={{
      width: '210mm',
      height: '297mm', // Cambié minHeight a height para evitar página en blanco extra
      padding: '10mm', // Reducido el padding para evitar espacios excesivos
      margin: '0 auto',
      backgroundColor: 'white',
      boxSizing: 'border-box',
      fontSize: '10pt', // Reducido el tamaño de la fuente para evitar que se vea demasiado grande
    }}>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px', // Reducido margen inferior
      }}>
        <div style={{ maxWidth: '240px' }}>
          <img 
            src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png" 
            alt="Company Logo" 
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <h5 style={{ margin: '0', fontSize: '12pt', fontWeight: 'bold' }}>
            OBRES I SERVEIS MIG-MON 2022 S.C.P
          </h5>
          <p style={{ margin: '2px 0', fontSize: '10pt' }}>ARQUITECTE GAUDI 7 3º 2º</p>
          <p style={{ margin: '2px 0', fontSize: '10pt' }}>SANT FRUITOS DE BAGES</p>
          <p style={{ margin: '2px 0', fontSize: '10pt' }}>08272</p>
          <p style={{ margin: '2px 0', fontSize: '10pt' }}>Email: info@yourcompany.com</p>
          <p style={{ margin: '2px 0', fontSize: '10pt' }}>Phone: 34 625254144 - 653903600</p>
        </div>
      </div>

     
      <div style={{ marginBottom: '15px' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '10pt' }}>
                <strong>Factura Nº:</strong> {invoice.invoiceNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '10pt' }}>
                <strong>Fecha:</strong> {new Date(invoice.createdAt).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

     
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12pt' }}>Datos del cliente:</h3>
        <p style={{ margin: '2px 0', fontSize: '10pt' }}><strong>Cliente:</strong> {invoice.clientName}</p>
        {invoice.clientAddress && (
          <p style={{ margin: '2px 0', fontSize: '10pt' }}><strong>Dirección:</strong> {invoice.clientAddress}</p>
        )}
        {invoice.clientNIF && (
          <p style={{ margin: '2px 0', fontSize: '10pt' }}><strong>NIF/CIF:</strong> {invoice.clientNIF}</p>
        )}
      </div>

      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
      }}>
        <thead>
          <tr>
            <th style={{
              border: '1px solid black',
              padding: '6px',
              textAlign: 'left',
              backgroundColor: '#f3f4f6',
              fontSize: '10pt',
            }}>Descripción</th>
            <th style={{
              border: '1px solid black',
              padding: '6px',
              textAlign: 'right',
              width: '150px',
              backgroundColor: '#f3f4f6',
              fontSize: '10pt',
            }}>Importe</th>
          </tr>
        </thead>
        <tbody>
          {invoice.services && invoice.services.map((service, index) => (
            console.log('Amount:', service.amount) , 
            <tr key={index}>
              <td style={{
                border: '1px solid black',
                padding: '6px',
                fontSize: '10pt',
              }}>{service.description}</td>
              <td style={{
                border: '1px solid black',
                padding: '6px',
                textAlign: 'right',
                fontSize: '10pt',
              }}>
               
                { service.amount?.toFixed(2) } €
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div style={{
        width: '200px',
        marginLeft: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '4px 0',
          padding: '4px 0',
          fontSize: '10pt',
        }}>
          <span>Subtotal:</span>
          <span>{invoice.totalAmount?.toFixed(2)} €</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '4px 0',
          padding: '4px 0',
          fontSize: '10pt',
        }}>
          <span>IVA (21%):</span>
          <span>{invoice.vat?.toFixed(2)} €</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '4px 0',
          padding: '4px 0',
          borderTop: '2px solid black',
          fontWeight: 'bold',
          fontSize: '10pt',
        }}>
          <span>Total:</span>
          <span>{invoice.total?.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
});

export default InvoiceTemplate; */
import React, { forwardRef } from 'react';

const InvoiceTemplate = forwardRef(({ invoice }, ref) => {
  return (
    <div ref={ref} className="w-[210mm] h-[297mm] p-[20mm] box-border text-[12pt] bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="max-w-[240px]">
          <img 
            src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png" 
            alt="Company Logo" 
            className="w-full h-auto"
          />
        </div>
        <div className="text-right">
          <h5 className="m-0 font-bold text-[12pt]">OBRES I SERVEIS MIG-MON 2022 S.C.P</h5>
          <p className="m-0 text-[10pt]">ARQUITECTE GAUDI 7 3º 2º</p>
          <p className="m-0 text-[10pt]">SANT FRUITOS DE BAGES</p>
          <p className="m-0 text-[10pt]">08272</p>
          <p className="m-0 text-[10pt]">Email: info@yourcompany.com</p>
          <p className="m-0 text-[10pt]">Phone: 34 625254144 - 653903600</p>
        </div>
      </div>

      <div className="mb-4">
        <p><strong>Factura Nº:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Cliente:</strong> {invoice.clientName}</p>
        <p><strong>Fecha:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
      </div>

      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-900 p-2 text-left bg-gray-200">Descripción</th>
            <th className="border border-gray-900 p-2 text-right bg-gray-200">Importe (€)</th>
          </tr>
        </thead>
        <tbody>
          {invoice.services.map((service, index) => (
            <tr key={index}>
              <td className="border border-gray-900 p-2">{service.description}</td>
              <td className="border border-gray-900 p-2 text-right">{service.amount.toFixed(2)} €</td>
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



