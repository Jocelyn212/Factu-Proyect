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

// CODIGO QUE FUNCIONA
/* import { useState, useEffect, useRef } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import { API_URL } from "../config";
//import InvoiceTemplate from "../components/InvoiceTemplate"; 
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

export default Invoices; */

// CODIGO DE PRUEBA
/* import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InvoiceForm from "../components/InvoiceForm";
import { jsPDF } from "jspdf";
import { API_URL } from "../config";
import "jspdf-autotable";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`);
      setInvoices(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al cargar las facturas:", error);
      setError(
        "No se pudieron cargar las facturas. Intenta nuevamente más tarde."
      );
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePdf = () => {
    if (!previewInvoice) {
      console.error("No hay factura para generar el PDF.");
      return;
    }

    const doc = new jsPDF();

    // Logo
    const logoUrl =
      "https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png";
    doc.addImage(logoUrl, "PNG", 14, 10, 40, 20);

    // Datos de la empresa
    doc.setFontSize(10);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 190, 15, { align: "right" });
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 190, 20, { align: "right" });
    doc.text("SANT FRUITOS DE BAGES", 190, 25, { align: "right" });
    doc.text("08272", 190, 30, { align: "right" });
    doc.text("Email: info@yourcompany.com", 190, 35, { align: "right" });
    doc.text("Phone: 34 625254144 - 653903600", 190, 40, { align: "right" });

    // Título
    doc.setFontSize(14);
    doc.text("Factura", 14, 55);

    // Información del cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${previewInvoice.clientName}`, 14, 65);
    doc.text(`NIF: ${previewInvoice.clientNIF}`, 14, 70);
    doc.text(`Dirección: ${previewInvoice.clientAddress}`, 14, 75);
    doc.text(`Teléfono: ${previewInvoice.clientPhone}`, 14, 80);

    // Tabla de productos/servicios
    const tableData = previewInvoice.items.map((item) => [
      item.description,
      `${item.price.toFixed(2)} €`,
    ]);

    tableData.push([
      { content: "Total", colSpan: 3, styles: { halign: "right" } },
      `${previewInvoice.total.toFixed(2)} €`,
    ]);

    doc.autoTable({
      startY: 90,
      head: [["Descripción", "Precio (€)"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [224, 224, 224] },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 70, halign: "right" },
      },
    });

    // Guardar PDF
    doc.save(`Factura_${previewInvoice.clientName}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>

      <InvoiceForm
        fetchInvoices={fetchInvoices}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
      />

      <h2 className="text-2xl mb-4">Lista de Facturas</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      {filteredInvoices.length === 0 ? (
        <p>No se encontraron facturas.</p>
      ) : (
        <ul>
          {filteredInvoices.map((invoice) => (
            <li key={invoice._id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>
                  {invoice.clientName} - {invoice.total}€
                </span>
                <div>
                  <button
                    onClick={() => setPreviewInvoice(invoice)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={generatePdf}
                    className={`bg-green-500 text-white p-2 rounded ${
                      !previewInvoice ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!previewInvoice}
                  >
                    Guardar como PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {previewInvoice && (
        <div className="mt-8 border p-6 bg-white shadow-lg max-w-[800px] mx-auto">
          <h2 className="text-2xl mb-4">Vista Previa de la Factura</h2>
          <div className="p-6 border bg-gray-100 w-full mx-auto">
            
            <div className="flex justify-between">
              <img
                src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png"
                alt="Logo"
                className="w-40 h-auto object-contain"
              />
              <div className="text-right text-sm">
                <p className="font-bold">OBRES I SERVEIS MIG-MON 2022 S.C.P</p>
                <p>ARQUITECTE GAUDI 7 3º 2º</p>
                <p>SANT FRUITOS DE BAGES</p>
                <p>08272</p>
                <p>Email: info@yourcompany.com</p>
                <p>Phone: 34 625254144 - 653903600</p>
              </div>
            </div>

           
            <p>
              <strong>Cliente:</strong> {previewInvoice.clientName}
            </p>
            <p>
              <strong>NIF:</strong> {previewInvoice.clientNIF}
            </p>
            <p>
              <strong>Dirección:</strong> {previewInvoice.clientAddress}
            </p>
            <p>
              <strong>Teléfono:</strong> {previewInvoice.clientPhone}
            </p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-left">
                    Descripción
                  </th>
                  <th className="border border-gray-400 p-2 text-right">
                    Total (€)
                  </th>
                </tr>
              </thead>
              <tbody>
                {previewInvoice.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">
                      {item.description}
                    </td>
                    <td className="border border-gray-400 p-2 text-right">
                      {item.total.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-bold text-right">
              Total: €{previewInvoice.total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
 */

import React, { useState, useEffect } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import axios from "axios";
import { API_URL } from "../config";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  // Cargar facturas desde la API
  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`);
      setInvoices(response.data);
    } catch (error) {
      console.error("Error al cargar las facturas:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Añadir nueva factura
  const addInvoice = async (newInvoice) => {
    try {
      const response = await axios.post(`${API_URL}/invoices`, newInvoice, {
        headers: { "Content-Type": "application/json" },
      });
      setInvoices([...invoices, response.data]);
    } catch (error) {
      console.error("Error al añadir factura:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-6">Gestión de Facturas</h1>
      <InvoiceForm addInvoice={addInvoice} />
      <InvoiceList invoices={invoices} />
    </div>
  );
}

export default Invoices;
