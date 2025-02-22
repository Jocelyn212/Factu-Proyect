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
// ... (resto del código)
/* import React, { useEffect, useRef, useState } from 'react';
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
      // Mostrar indicador de carga
      const loadingDiv = document.createElement('div');
      loadingDiv.style.position = 'fixed';
      loadingDiv.style.top = '0';
      loadingDiv.style.left = '0';
      loadingDiv.style.width = '100%';
      loadingDiv.style.height = '100%';
      loadingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      loadingDiv.style.display = 'flex';
      loadingDiv.style.justifyContent = 'center';
      loadingDiv.style.alignItems = 'center';
      loadingDiv.style.zIndex = '9999';
      loadingDiv.innerHTML = '<div>Generando PDF...</div>';
      document.body.appendChild(loadingDiv);

      const element = invoiceTemplateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );

      // Si el contenido es más largo que una página A4
      if (imgHeight > pageHeight) {
        let heightLeft = imgHeight - pageHeight;
        let position = -pageHeight;

        while (heightLeft > 0) {
          position = position - pageHeight;
          pdf.addPage();
          pdf.addImage(
            canvas.toDataURL('image/jpeg', 1.0),
            'JPEG',
            0,
            position,
            imgWidth,
            imgHeight,
            '',
            'FAST'
          );
          heightLeft -= pageHeight;
        }
      }

      pdf.save(`factura_${invoice.invoiceNumber}.pdf`);
      
      // Remover el indicador de carga
      document.body.removeChild(loadingDiv);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
    }
  };

  const handleBack = () => {
    navigate('/invoices');
  };

  if (!invoice) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="bg-white shadow-md p-4 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            ← Volver a Facturas
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
          <InvoiceTemplate ref={invoiceTemplateRef} invoice={invoice} />
        </div>
      </div>
    </div>
  );
}

export default InvoicePage; */

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import InvoiceTemplate from '../components/InvoiceTemplate';
import { jsPDF } from 'jspdf';

function InvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const invoiceTemplateRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      const response = await fetch(`/api/invoices/${id}`);
      const data = await response.json();
      setInvoice(data);
    };
    fetchInvoice();
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm',
    });
    doc.html(invoiceTemplateRef.current, {
      callback: function (pdf) {
        pdf.save(`invoice_${invoice.invoiceNumber}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190, // width in mm
      windowWidth: 800, // window width in pixels
    });
  };

  return (
    <div className="min-h-screen p-6">
      {invoice ? (
        <>
          <InvoiceTemplate ref={invoiceTemplateRef} invoice={invoice} />
          <button onClick={handleDownloadPDF} className="bg-green-600 text-white p-2 mt-4 rounded">
            Descargar PDF
          </button>
        </>
      ) : (
        <p>Cargando factura...</p>
      )}
    </div>
  );
}

export default InvoicePage;