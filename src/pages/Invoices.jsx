/* import { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import InvoiceTemplate from "../components/InvoiceTemplate";
import { jsPDF } from "jspdf";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceTemplateRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");

  const fetchInvoices = async (clientName = "", month = "") => {
    let q = collection(db, "invoices");
    
    if (clientName) {
      q = query(q, where("clientName", "==", clientName));
    }

    if (month) {
      const startOfMonth = new Date(month);
      const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
      q = query(q, where("createdAt", ">=", startOfMonth.toISOString()), where("createdAt", "<=", endOfMonth.toISOString()));
    }

    const invoiceSnapshot = await getDocs(q);
    const invoiceList = invoiceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInvoices(invoiceList);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  const addInvoice = async (invoice) => {
    const settingsDoc = doc(db, "settings", "invoiceNumber");
    const settingsSnap = await getDoc(settingsDoc);
    let currentNumber = 1;

    if (settingsSnap.exists()) {
      currentNumber = settingsSnap.data().currentNumber + 1;
    }

    invoice.invoiceNumber = `${currentNumber.toString().padStart(2, '0')}/${new Date().getFullYear()}`;
    invoice.createdAt = new Date().toISOString();

    await addDoc(collection(db, "invoices"), invoice);
    await updateDoc(settingsDoc, { currentNumber });

    fetchInvoices();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm'
    });
    doc.html(invoiceTemplateRef.current, {
      callback: function (pdf) {
        pdf.save(`invoice_${selectedInvoice.invoiceNumber}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190, // width in mm
      windowWidth: 800 // window width in pixels
    });
  };

  return (
    
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>
      <InvoiceForm addInvoice={addInvoice} />

      {selectedInvoice && (
        <div className="mt-6">
          <InvoiceTemplate ref={invoiceTemplateRef} invoice={selectedInvoice} />
          <button onClick={handleDownloadPDF} className="bg-green-600 text-white p-2 mt-4 rounded">Descargar PDF</button>
        </div>
      )}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Busca por cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2"
          />
          <button type="submit" className="bg-gray-400 text-white p-2 px-4 rounded">Buscar</button>
        </div>
      </form>
      <InvoiceList invoices={invoices} onSelectInvoice={(invoice) => setSelectedInvoice(invoice)} />
      
    </div>
  );
}

export default Invoices; */
import { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import InvoiceTemplate from "../components/InvoiceTemplate";
import { jsPDF } from "jspdf";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceTemplateRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");

  const fetchInvoices = async (clientName = "", month = "") => {
    let q = collection(db, "invoices");
    
    if (clientName) {
      q = query(q, where("clientName", "==", clientName));
    }

    if (month) {
      const startOfMonth = new Date(month);
      const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
      q = query(q, where("createdAt", ">=", startOfMonth.toISOString()), where("createdAt", "<=", endOfMonth.toISOString()));
    }

    const invoiceSnapshot = await getDocs(q);
    const invoiceList = invoiceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInvoices(invoiceList);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  const addInvoice = async (invoice) => {
    const settingsDoc = doc(db, "settings", "invoiceNumber");
    const settingsSnap = await getDoc(settingsDoc);
    let currentNumber = 1;

    if (settingsSnap.exists()) {
      currentNumber = settingsSnap.data().currentNumber + 1;
    }

    invoice.invoiceNumber = `${currentNumber.toString().padStart(2, '0')}/${new Date().getFullYear()}`;
    invoice.createdAt = new Date().toISOString();

    await addDoc(collection(db, "invoices"), invoice);
    await updateDoc(settingsDoc, { currentNumber });

    fetchInvoices();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm'
    });
    doc.html(invoiceTemplateRef.current, {
      callback: function (pdf) {
        pdf.save(`invoice_${selectedInvoice.invoiceNumber}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190, // width in mm
      windowWidth: 800 // window width in pixels
    });
  };

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    window.open(`/invoice/${invoice.id}`, '_blank');
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>
      <InvoiceForm addInvoice={addInvoice} />

      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Busca por cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2"
          />
          <button type="submit" className="bg-gray-400 text-white p-2 px-4 rounded">Buscar</button>
        </div>
      </form>
      <InvoiceList invoices={invoices} onSelectInvoice={handleSelectInvoice} />
    </div>
  );
}

export default Invoices;