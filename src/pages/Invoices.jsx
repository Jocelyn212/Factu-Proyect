import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    const invoicesCollection = collection(db, "invoices");
    const invoiceSnapshot = await getDocs(invoicesCollection);
    const invoiceList = invoiceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInvoices(invoiceList);
  };

  const addInvoice = async (invoice) => {
    await addDoc(collection(db, "invoices"), invoice);
    fetchInvoices();
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Invoices</h1>
      <InvoiceForm addInvoice={addInvoice} />
      <InvoiceList invoices={invoices} />
    </div>
  );
}

export default Invoices;