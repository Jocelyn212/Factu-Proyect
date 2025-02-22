/* import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import InvoiceTemplate from '../components/InvoiceTemplate';
import { jsPDF } from 'jspdf';

function InvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const invoiceTemplateRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      const invoiceDoc = await getDoc(doc(db, 'invoices', id));
      if (invoiceDoc.exists()) {
        setInvoice({ id: invoiceDoc.id, ...invoiceDoc.data() });
      }
    };
    fetchInvoice();
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm'
    });
    doc.html(invoiceTemplateRef.current, {
      callback: function (pdf) {
        pdf.save(`invoice_${invoice.invoiceNumber}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190, // width in mm
      windowWidth: 800 // window width in pixels
    });
  };

  return (
    <div className="min-h-screen p-6">
      {invoice ? (
        <>
          <InvoiceTemplate ref={invoiceTemplateRef} invoice={invoice} />
          <button onClick={handleDownloadPDF} className="bg-green-600 text-white p-2 mt-4 rounded">Descargar PDF</button>
        </>
      ) : (
        <p>Cargando factura...</p>
      )}
    </div>
  );
}

export default InvoicePage; */
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import InvoiceTemplate from '../components/InvoiceTemplate';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const invoiceTemplateRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const invoiceDoc = await getDoc(doc(db, 'invoices', id));
        if (invoiceDoc.exists()) {
          setInvoice({ id: invoiceDoc.id, ...invoiceDoc.data() });
        }
      } catch (error) {
        console.error("Error al cargar la factura:", error);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!invoice || !invoiceTemplateRef.current) return;

    try {
      // Mostrar un mensaje de carga
      const loadingMessage = document.createElement('div');
      loadingMessage.innerHTML = 'Generando PDF...';
      loadingMessage.style.position = 'fixed';
      loadingMessage.style.top = '50%';
      loadingMessage.style.left = '50%';
      loadingMessage.style.transform = 'translate(-50%, -50%)';
      loadingMessage.style.padding = '20px';
      loadingMessage.style.background = 'white';
      loadingMessage.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      loadingMessage.style.zIndex = '1000';
      document.body.appendChild(loadingMessage);

      const element = invoiceTemplateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`factura_${invoice.invoiceNumber}.pdf`);

      // Eliminar mensaje de carga
      document.body.removeChild(loadingMessage);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
    }
  };

  const handleBack = () => {
    navigate('/invoices');
  };

  if (!invoice) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
        {/* Botones de acción */}
        <div className="flex justify-between p-4 bg-gray-200">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Volver a Facturas
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Descargar PDF
          </button>
        </div>

        {/* Template de la factura */}
        <InvoiceTemplate ref={invoiceTemplateRef} invoice={invoice} />
      </div>
    </div>
  );
}

export default InvoicePage;