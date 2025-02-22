import React, { useEffect, useRef, useState } from 'react';
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

export default InvoicePage;