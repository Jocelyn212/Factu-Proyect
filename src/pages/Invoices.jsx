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

export default Invoices; */
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

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    navigate(`/invoice/${invoice.id}`); 
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

export default Invoices; */
/* import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDocs, query, where, runTransaction } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import InvoiceTemplate from '../components/InvoiceTemplate';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceTemplateRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

  const fetchInvoices = async (clientName = "", month = "") => {
    try {
      let q = collection(db, "invoices");
      
      if (clientName) {
        q = query(q, where("clientName", "==", clientName));
      }

      if (month) {
        const startOfMonth = new Date(month);
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        q = query(
          q, 
          where("createdAt", ">=", startOfMonth.toISOString()),
          where("createdAt", "<=", endOfMonth.toISOString())
        );
      }

      const invoiceSnapshot = await getDocs(q);
      const invoiceList = invoiceSnapshot.docs.map(doc => ({ 
        id: doc.id,
        ...doc.data() 
      }));
      setInvoices(invoiceList);
    } catch (error) {
      console.error("Error al cargar las facturas:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  const addInvoice = async (invoice) => {
    try {
      const settingsDoc = doc(db, "settings", "invoiceNumber");
      
      await runTransaction(db, async (transaction) => {
        const settingsSnap = await transaction.get(settingsDoc);
        let currentNumber = 1;
        
        if (settingsSnap.exists()) {
          currentNumber = (settingsSnap.data().currentNumber || 0) + 1;
        }

        // Formatear el número de factura con el año actual
        const currentYear = new Date().getFullYear();
        invoice.invoiceNumber = `${currentNumber.toString().padStart(2, '0')}/${currentYear}`;
        invoice.createdAt = new Date().toISOString();

        // Actualizar el número en la transacción
        transaction.set(settingsDoc, { 
          currentNumber, 
          lastUpdate: new Date().toISOString() 
        });
        
        // Agregar la nueva factura
        const newInvoiceRef = doc(collection(db, "invoices"));
        transaction.set(newInvoiceRef, invoice);
      });

      // Recargar la lista de facturas
      await fetchInvoices();
    } catch (error) {
      console.error("Error al crear la factura:", error);
      // Aquí podrías agregar una notificación de error para el usuario
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm'
    });

    doc.html(invoiceTemplateRef.current, {
      callback: function (pdf) {
        pdf.save(`factura_${selectedInvoice.invoiceNumber}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 800
    });
  };

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>
      
  /*     <InvoiceForm addInvoice={addInvoice} />
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Buscar por cliente"
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
          <button 
            type="submit" 
            className="bg-gray-400 text-white p-2 px-4 rounded"
          >
            Buscar
          </button>
        </div>
      </form>
      <InvoiceList 
        invoices={invoices} 
        onSelectInvoice={handleSelectInvoice} 
      />
      <div style={{ display: 'none' }}>
        {selectedInvoice && (
          <InvoiceTemplate 
            ref={invoiceTemplateRef} 
            invoice={selectedInvoice} 
          />
        )}
      </div>
    </div>
  );
}

export default Invoices; */ 

import { useState, useEffect, useRef } from "react";
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
    let query = "/api/invoices";
    if (clientName || month) {
      query += "?";
      if (clientName) {
        query += `clientName=${clientName}&`;
      }
      if (month) {
        query += `month=${month}&`;
      }
    }

    const response = await fetch(query);
    const data = await response.json();
    setInvoices(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  const addInvoice = async (invoice) => {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    });
    if (response.ok) {
      fetchInvoices();
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "mm",
    });
    doc.html(invoiceTemplateRef.current, {
      callback: function (pdf) {
        pdf.save(`invoice_${selectedInvoice.invoiceNumber}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190, // width in mm
      windowWidth: 800, // window width in pixels
    });
  };

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    window.open(`/invoice/${invoice._id}`, "_blank");
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
          <button type="submit" className="bg-gray-400 text-white p-2 px-4 rounded">
            Buscar
          </button>
        </div>
      </form>
      <InvoiceList invoices={invoices} onSelectInvoice={handleSelectInvoice} />
    </div>
  );
}

export default Invoices;