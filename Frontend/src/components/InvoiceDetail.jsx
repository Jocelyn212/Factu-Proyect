import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceTemplate from './InvoiceTemplate';

const InvoiceDetail = ({ invoice }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <InvoiceTemplate ref={componentRef} invoice={invoice} />
      <button onClick={handlePrint}>Guardar como PDF</button>
    </div>
  );
};

export default InvoiceDetail;