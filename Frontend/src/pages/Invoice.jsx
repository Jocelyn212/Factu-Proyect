/* import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import InvoiceTemplate from '../components/InvoiceTemplate'; */

/* import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    client: "",
    invoiceNumber: "",
    amount: "",
    date: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const printRef = useRef();

  useEffect(() => {
    if (editingInvoice !== null) {
      setFormData(invoices[editingInvoice]);
    } else {
      setFormData({ client: "", invoiceNumber: "", amount: "", date: "" });
    }
  }, [editingInvoice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingInvoice !== null) {
      const updatedInvoices = invoices.map((inv, index) =>
        index === editingInvoice ? formData : inv
      );
      setInvoices(updatedInvoices);
      setEditingInvoice(null);
    } else {
      setInvoices([...invoices, formData]);
    }
    setFormData({ client: "", invoiceNumber: "", amount: "", date: "" });
    setShowPreview(false);
  };

  const handleEdit = (index) => {
    setEditingInvoice(index);
  };

  const handleDelete = (index) => {
    setInvoices(invoices.filter((_, i) => i !== index));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Factura",
  });

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Facturas</h1>

      
      <input
        type="text"
        placeholder="Buscar por cliente..."
        className="border p-2 rounded w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

     
      <form onSubmit={handleSave} className="border p-4 rounded-lg">
        <div className="mb-2">
          <label className="block font-semibold">Cliente:</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Número de Factura:</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Monto:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingInvoice !== null ? "Actualizar Factura" : "Guardar Factura"}
          </button>

          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowPreview(true)}
          >
            Vista Previa
          </button>
        </div>
      </form>

      {showPreview && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Vista Previa de la Factura</h2>
            <p><strong>Cliente:</strong> {formData.client}</p>
            <p><strong>Número de Factura:</strong> {formData.invoiceNumber}</p>
            <p><strong>Monto:</strong> ${formData.amount}</p>
            <p><strong>Fecha:</strong> {formData.date}</p>

            <div className="mt-4 flex gap-2">
              <button 
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setShowPreview(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className="mt-6">
        {filteredInvoices.map((invoice, index) => (
          <li
            key={index}
            className="border p-4 mb-2 flex justify-between items-center"
          >
            <div ref={printRef}>
              <p className="font-semibold">Cliente: {invoice.client}</p>
              <p>Número de Factura: {invoice.invoiceNumber}</p>
              <p>Monto: ${invoice.amount}</p>
              <p>Fecha: {invoice.date}</p>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleEdit(index)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(index)}
              >
                Eliminar
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                onClick={handlePrint}
              >
                Descargar PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoice;
 */

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

/* import { useState, useEffect, useRef } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import { API_URL } from "../config";
/* import InvoiceTemplate from "../components/InvoiceTemplate"; 
import { jsPDF } from "jspdf";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceTemplateRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");

  const fetchInvoices = async (clientName = "", month = "") => {
    try {
      let query = `${API_URL}/invoices`;
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
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
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
      const response = await fetch(`${API_URL}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      fetchInvoices();
    } catch (error) {
      console.error("Failed to add invoice:", error);
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

export default Invoices; */
import { useState, useEffect, useRef } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import { API_URL } from "../config";
/* import InvoiceTemplate from "../components/InvoiceTemplate"; */
import { jsPDF } from "jspdf";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceTemplateRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");

  const fetchInvoices = async (clientName = "", month = "") => {
    try {
      let query = `${API_URL}/invoices`;
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
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  const getNextInvoiceNumber = () => {
    if (invoices.length === 0) return "01/2025";
    const lastInvoice = invoices[invoices.length - 1];
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
    const newNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `${newNumber}/2025`;
  };

  const addInvoice = async (invoice) => {
    try {
      const newInvoice = {
        ...invoice,
        invoiceNumber: getNextInvoiceNumber(),
        createdAt: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      };

      const response = await fetch(`${API_URL}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      fetchInvoices();
    } catch (error) {
      console.error("Failed to add invoice:", error);
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
