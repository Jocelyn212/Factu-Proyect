/* import React from 'react';

function InvoiceList({ invoices, onSelectInvoice }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-4">Lista de Facturas</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id} className="mb-2">
            <button
              onClick={() => onSelectInvoice(invoice)}
              className="text-blue-500 underline"
            >
              {invoice.invoiceNumber} - {invoice.clientName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;  */

//--------------------------------------------OTRO CODIGO------------------------------------------------

/*  import React, { useState } from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import { jsPDF } from "jspdf";

function InvoiceList({ invoices }) {
  const [previewInvoice, setPreviewInvoice] = useState(null); // Factura seleccionada para la vista previa

  const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF({
      format: "a4",
      unit: "mm",
    });

    doc.html(document.getElementById(`invoice-${invoice._id}`), {
      callback: (pdf) => {
        pdf.save(`Factura_${invoice.clientName}.pdf`);
      },
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 800,
    });
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Lista de Facturas</h2>
      {invoices.length === 0 ? (
        <p>No hay facturas disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {invoices.map((invoice) => (
            <li key={invoice._id} className="border p-4 rounded shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Factura Nº:</strong> {invoice.invoiceNumber}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {invoice.clientName}
                  </p>
                  <p>
                    <strong>Total:</strong> {invoice.total.toFixed(2)} €
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setPreviewInvoice(invoice)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(invoice)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      // Vista Previa 
      {previewInvoice && (
        <div className="mt-8">
          <h3 className="text-xl mb-4">Vista Previa de la Factura</h3>
          <div
            id={`invoice-${previewInvoice._id}`}
            className="border p-4 bg-white shadow-lg"
          >
            <InvoiceTemplate invoice={previewInvoice} />
          </div>
          <button
            onClick={() => setPreviewInvoice(null)}
            className="mt-4 bg-gray-500 text-white p-2 rounded"
          >
            Cerrar Vista Previa
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceList; */

//--------------------------------------------OTRO CODIGO------------------------------------------------
 
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function InvoiceList({ invoices, onSelectInvoice }) {
  
  // 🔹 Función para descargar la factura en PDF
  const handleDownloadPDF = (invoice) => {
    try {
      const doc = new jsPDF();

      // 🔹 Encabezado de la empresa
      doc.setFontSize(14);
      doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, { align: "center" });
      doc.setFontSize(10);
      doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
      doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
      doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
      doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });

      // 🔹 Datos de la factura
      doc.setFontSize(12);
      doc.text(`Factura Nº: ${invoice.invoiceNumber}`, 14, 60);
      doc.text(`Fecha: ${invoice.createdAt}`, 14, 66);

      // 🔹 Datos del cliente
      doc.text("Cliente:", 14, 76);
      doc.setFontSize(10);
      doc.text(`Nombre: ${invoice.clientName}`, 14, 82);
      doc.text(`NIF: ${invoice.clientNIF || "N/A"}`, 14, 88);
      doc.text(`Dirección: ${invoice.clientAddress || "N/A"}`, 14, 94);
      doc.text(`Teléfono: ${invoice.clientPhone || "N/A"}`, 14, 100);

      // 🔹 Validar datos de servicios
      if (!invoice.services || !Array.isArray(invoice.services) || invoice.services.length === 0) {
        throw new Error("No hay servicios en la factura.");
      }

      // 🔹 Crear tabla con servicios
      const tableData = invoice.services.map((service) => [
        service.description || "Sin descripción",
        `${parseFloat(service.amount || 0).toFixed(2)} €`,
      ]);

      doc.autoTable({
        startY: 110,
        head: [["Descripción", "Importe (€)"]],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [200, 200, 200] },
      });

      // 🔹 Totales
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`Subtotal: ${parseFloat(invoice.totalAmount || 0).toFixed(2)} €`, 140, finalY);
      doc.text(`IVA (21%): ${parseFloat(invoice.vat || 0).toFixed(2)} €`, 140, finalY + 6);
      doc.text(`Total: ${parseFloat(invoice.total || 0).toFixed(2)} €`, 140, finalY + 12);

      // 🔹 Guardar PDF
      doc.save(`Factura_${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF: " + error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mt-6">Facturas Generadas</h2>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index} className="border p-2 my-2 flex justify-between">
            <span>{invoice.clientName} - {invoice.total.toFixed(2)}€</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onSelectInvoice(invoice)}
                className="bg-blue-500 text-white p-2"
              >
                Vista Previa
              </button>
              <button
                onClick={() => handleDownloadPDF(invoice)}
                className="bg-green-500 text-white p-2"
              >
                Descargar PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;


//--------------------------------------------OTROs CODIGO de INVOICE.JSX------------------------------------------------

 //------------------------------------- CODIGO de FIRESTORE-------------------------------------

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

//-------------------------------------OTRO CODIGO FIRESTORE-------------------------------------

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

export default Invoices;  */

//-------------------------------------OTRO CODIGO -------------------------------------
//------------------------------------- CODIGO de FIRESTORE-------------------------------------

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

//-------------------------------------OTRO CODIGO -------------------------------------

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

//-------------------------------------OTRO CODIGO -------------------------------------

/* import { useState, useEffect, useRef } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import { API_URL } from "../config";
import InvoiceTemplate from "../components/InvoiceTemplate"; 
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

//-------------------------------------OTRO CODIGO -------------------------------------

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

//-------------------------------------OTRO CODIGO -------------------------------------

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

/* import React, { useState, useEffect } from "react";
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

export default Invoices; */

//ULTIMO CODIGO QUE FUNCIONA CON FALLOS EN LA VISTA PREVIA Y EN EL DISEÑO DE LA FACTURA

/* import { useState, useEffect, useRef } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import { API_URL } from "../config";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");

  // 🔹 Cargar facturas desde la API
  const fetchInvoices = async (clientName = "", month = "") => {
    try {
      let query = `${API_URL}/invoices`;
      if (clientName || month) {
        query += "?";
        if (clientName) query += `clientName=${clientName}&`;
        if (month) query += `month=${month}&`;
      }

      const response = await fetch(query);
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // 🔹 Buscar facturas
  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  // 🔹 Generar número de factura automático
  const getNextInvoiceNumber = () => {
    if (invoices.length === 0) return "01/2025";
    const lastInvoice = invoices[invoices.length - 1];
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
    return `${(lastNumber + 1).toString().padStart(2, "0")}/2025`;
  };

  // 🔹 Agregar una nueva factura
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

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

      fetchInvoices();
    } catch (error) {
      console.error("Failed to add invoice:", error);
    }
  };

  // 🔹 Generar PDF con jsPDF y autoTable
  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();
    
    // 🔸 Agregar encabezado de la empresa
    doc.setFontSize(14);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
    doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
    doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
    doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });

    // 🔸 Datos de la factura
    doc.setFontSize(12);
    doc.text(`Factura Nº: ${selectedInvoice.invoiceNumber}`, 14, 60);
    doc.text(`Fecha: ${selectedInvoice.createdAt}`, 14, 66);

    // 🔸 Datos del cliente
    doc.text("Cliente:", 14, 76);
    doc.setFontSize(10);
    doc.text(`Nombre: ${selectedInvoice.clientName}`, 14, 82);
    doc.text(`NIF: ${selectedInvoice.clientNIF}`, 14, 88);
    doc.text(`Dirección: ${selectedInvoice.clientAddress}`, 14, 94);
    doc.text(`Teléfono: ${selectedInvoice.clientPhone}`, 14, 100);

    // 🔸 Tabla de servicios
    const tableData = selectedInvoice.services.map((service) => [
      service.description,
      `${service.amount.toFixed(2)} €`,
    ]);

    doc.autoTable({
      startY: 110,
      head: [["Descripción", "Importe (€)"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [200, 200, 200] },
    });

    // 🔸 Totales
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ${selectedInvoice.totalAmount.toFixed(2)} €`, 140, finalY);
    doc.text(`IVA (21%): ${selectedInvoice.vat.toFixed(2)} €`, 140, finalY + 6);
    doc.text(`Total: ${selectedInvoice.total.toFixed(2)} €`, 140, finalY + 12);

    // 🔸 Guardar PDF
    doc.save(`Factura_${selectedInvoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>

      //Formulario para crear facturas 
      <InvoiceForm addInvoice={addInvoice} />

      // Buscador de facturas 
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

      //Lista de facturas 
      <InvoiceList invoices={invoices} onSelectInvoice={setSelectedInvoice} />

      // Botón de descarga de PDF 
      {selectedInvoice && (
        <button onClick={handleDownloadPDF} className="bg-green-500 text-white p-2 mt-4">
          Descargar PDF
        </button>
      )}
    </div>
  );
}

export default Invoices; */

//-------------------------------------OTRO CODIGO -------------------------------------

/* import { useState, useEffect, useRef } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import { API_URL } from "../config";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const componentRef = useRef(); // Referencia para la vista previa

  // 🔹 Cargar facturas desde la API
  const fetchInvoices = async (clientName = "", month = "") => {
    try {
      let query = `${API_URL}/invoices`;
      if (clientName || month) {
        query += "?";
        if (clientName) query += `clientName=${clientName}&`;
        if (month) query += `month=${month}&`;
      }

      const response = await fetch(query);
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // 🔹 Buscar facturas
  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices(searchTerm, month);
  };

  // 🔹 Generar número de factura automático
  const getNextInvoiceNumber = () => {
    if (invoices.length === 0) return "01/25";
    const lastInvoice = invoices[invoices.length - 1];
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
    return `${(lastNumber + 1).toString().padStart(2, "0")}/25`;
  };

  // 🔹 Formato de fecha `dd/mm/aa`
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES").slice(0, 8); // `dd/mm/aa`
  };

  // 🔹 Agregar una nueva factura
  const addInvoice = async (invoice) => {
    try {
      const newInvoice = {
        ...invoice,
        invoiceNumber: getNextInvoiceNumber(),
        createdAt: formatDate(new Date()), // Guardar fecha en formato `dd/mm/aa`
      };

      const response = await fetch(`${API_URL}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      });

      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      fetchInvoices();
    } catch (error) {
      console.error("Failed to add invoice:", error);
    }
  };

  // 🔹 Descargar PDF con `jsPDF`
  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();

    // 🔹 Encabezado
    doc.setFontSize(14);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
    doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
    doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
    doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });

    // 🔹 Datos de la factura
    doc.setFontSize(12);
    doc.text(`Factura Nº: ${selectedInvoice.invoiceNumber}`, 14, 60);
    doc.text(`Fecha: ${selectedInvoice.createdAt}`, 14, 66);

    // 🔹 Datos del cliente
    doc.text("Cliente:", 14, 76);
    doc.setFontSize(10);
    doc.text(`Nombre: ${selectedInvoice.clientName}`, 14, 82);
    doc.text(`NIF: ${selectedInvoice.clientNIF || "N/A"}`, 14, 88);
    doc.text(`Dirección: ${selectedInvoice.clientAddress || "N/A"}`, 14, 94);
    doc.text(`Teléfono: ${selectedInvoice.clientPhone || "N/A"}`, 14, 100);

    // 🔹 Tabla de servicios
    const tableData = selectedInvoice.services.map((service) => [
      service.description || "Sin descripción",
      `${parseFloat(service.amount || 0).toFixed(2)} €`,
    ]);

    doc.autoTable({
      startY: 110,
      head: [["Descripción", "Importe (€)"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [200, 200, 200] },
    });

    // 🔹 Totales
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(
      `Subtotal: ${parseFloat(selectedInvoice.totalAmount || 0).toFixed(2)} €`,
      140,
      finalY
    );
    doc.text(
      `IVA (21%): ${parseFloat(selectedInvoice.vat || 0).toFixed(2)} €`,
      140,
      finalY + 6
    );
    doc.text(
      `Total: ${parseFloat(selectedInvoice.total || 0).toFixed(2)} €`,
      140,
      finalY + 12
    );

    // 🔹 Guardar PDF
    doc.save(`Factura_${selectedInvoice.invoiceNumber}.pdf`);
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
          <button
            type="submit"
            className="bg-gray-400 text-white p-2 px-4 rounded"
          >
            Buscar
          </button>
        </div>
      </form>

     
      <InvoiceList invoices={invoices} onSelectInvoice={setSelectedInvoice} />

      
      {selectedInvoice && (
        <div ref={componentRef} className="bg-white p-6 shadow-md mt-6">
          <h2 className="text-2xl">Factura</h2>
          <p>
            <strong>Cliente:</strong> {selectedInvoice.clientName}
          </p>
          <p>
            <strong>NIF:</strong> {selectedInvoice.clientNIF}
          </p>
          <p>
            <strong>Dirección:</strong> {selectedInvoice.clientAddress}
          </p>
          <p>
            <strong>Teléfono:</strong> {selectedInvoice.clientPhone}
          </p>
        </div>
      )}

     
      {selectedInvoice && (
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white p-2 mt-4"
        >
          Descargar PDF
        </button>
      )}
    </div>
  );
}

export default Invoices; */
/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([{ description: '', amount: 0 }]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString('es-ES'));

  useEffect(() => {
    fetchClients();
    fetchInvoices();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`);
      setInvoices(response.data);
      if (response.data.length) {
        const lastInvoice = response.data[response.data.length - 1];
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
        setInvoiceNumber(`${(lastNumber + 1).toString().padStart(2, "0")}/2025`);
      } else {
        setInvoiceNumber("06/2025");
      }
    } catch (error) {
      console.error('Error al cargar facturas:', error);
    }
  };

  const handleAddService = () => {
    setServices([...services, { description: '', amount: 0 }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleCreateInvoice = async () => {
    if (!selectedClient || services.length === 0) {
      alert('Selecciona un cliente y agrega al menos un servicio.');
      return;
    }

    const totalAmount = services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const newInvoice = {
      invoiceNumber,
      clientName: selectedClient.name,
      clientAddress: selectedClient.address,
      clientNif: selectedClient.nif,
      clientPhone: selectedClient.phone,
      createdAt: new Date().toISOString().split("T")[0],
      services: services.map(service => ({
        description: service.description.trim(),
        amount: parseFloat(service.amount) || 0
      })),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      vat: parseFloat(vat.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };

    try {
      await axios.post(`${API_URL}/invoices`, newInvoice, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error al crear la factura:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Crear Factura</h1>
      <div>
        <label>Cliente</label>
        <select
          value={selectedClient ? selectedClient._id : ''}
          onChange={(e) => setSelectedClient(clients.find(client => client._id === e.target.value))}
          className="border p-2 w-full"
        >
          <option value="">Selecciona cliente</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <h3 className="text-xl font-bold mb-2 mt-4">Servicios</h3>
      {services.map((service, index) => (
        <div key={index} className="flex mb-4">
          <input
            type="text"
            placeholder="Descripción"
            value={service.description}
            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="number"
            placeholder="Importe (€)"
            value={service.amount}
            onChange={(e) => handleServiceChange(index, 'amount', e.target.value)}
            className="border p-2 ml-2"
          />
          <button type="button" onClick={() => handleRemoveService(index)} className="bg-red-500 text-white p-2 ml-2">Eliminar</button>
        </div>
      ))}
      <button type="button" onClick={handleAddService} className="bg-green-500 text-white p-2 mt-2">Añadir Servicio</button>
      <button onClick={handleCreateInvoice} className="bg-blue-500 text-white p-2 mt-4">Guardar Factura</button>
    </div>
  );
};

export default Invoices; */

/* import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([{ description: '', amount: 0 }]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString('es-ES'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    fetchClients();
    fetchInvoices();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`);
      setInvoices(response.data);
      if (response.data.length) {
        const lastInvoice = response.data[response.data.length - 1];
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
        setInvoiceNumber(`${(lastNumber + 1).toString().padStart(2, "0")}/2025`);
      } else {
        setInvoiceNumber("01/2025");
      }
    } catch (error) {
      console.error('Error al cargar facturas:', error);
    }
  };

  const handleAddService = () => {
    setServices([...services, { description: '', amount: 0 }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleCreateInvoice = async () => {
    if (!selectedClient || services.length === 0) {
      alert('Selecciona un cliente y agrega al menos un servicio.');
      return;
      
    }

    const totalAmount = services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const newInvoice = {
      invoiceNumber,
      clientName: selectedClient.name,
      clientAddress: selectedClient.address,
      clientNif: selectedClient.nif,
      clientPhone: selectedClient.phone,
      createdAt: new Date().toISOString(),
      services,
      totalAmount,
      vat,
      total
    };

    try {
      await axios.post(`${API_URL}/invoices`, newInvoice, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();
    doc.addImage("https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png", "PNG", 10, 10, 40, 20);
    doc.setFontSize(14);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
    doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
    doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
    doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });
    doc.text(`Factura Nº: ${selectedInvoice.invoiceNumber}`, 14, 60);
    doc.text(`Fecha: ${new Date(selectedInvoice.createdAt).toLocaleDateString('es-ES')}`, 14, 66);
    doc.text(`Cliente: ${selectedInvoice.clientName}`, 14, 76);
    doc.text(`NIF: ${selectedInvoice.clientNif}`, 14, 82);
    doc.text(`Dirección: ${selectedInvoice.clientAddress}`, 14, 88);
    doc.text(`Teléfono: ${selectedInvoice.clientPhone}`, 14, 94);
    const tableData = selectedInvoice.services.map(service => [service.description, `${service.amount.toFixed(2)} €`]);
    doc.autoTable({ startY: 110, head: [["Descripción", "Importe (€)"]], body: tableData });
    doc.text(`Subtotal: ${selectedInvoice.totalAmount.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA (21%): ${selectedInvoice.vat.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 16);
    doc.text(`Total: ${selectedInvoice.total.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 22);
    doc.save(`Factura_${selectedInvoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>
      <input type="text" placeholder="Buscar factura" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 mb-4 w-full" />
      <ul>
        {invoices.filter(invoice => invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())).map((invoice, index) => (
          <li key={index} className="border p-2 flex justify-between">
            <span>{invoice.clientName} - {invoice.total.toFixed(2)}€</span>
            <button onClick={() => setSelectedInvoice(invoice)} className="bg-blue-500 text-white p-2">Vista Previa</button>
          </li>
        ))}
      </ul>
      {selectedInvoice && <button onClick={handleDownloadPDF} className="bg-green-500 text-white p-2 mt-4">Descargar PDF</button>}
    </div>
  );
};

export default Invoices; */

/* import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([{ description: '', amount: 0 }]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString('es-ES'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    fetchClients();
    fetchInvoices();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`);
      setInvoices(response.data);
      if (response.data.length) {
        const lastInvoice = response.data[response.data.length - 1];
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
        setInvoiceNumber(`${(lastNumber + 1).toString().padStart(2, "0")}/2025`);
      } else {
        setInvoiceNumber("01/2025");
      }
    } catch (error) {
      console.error('Error al cargar facturas:', error);
    }
  };

  const handleAddService = () => {
    setServices([...services, { description: '', amount: 0 }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleCreateInvoice = async () => {
    if (!selectedClient || services.length === 0) {
      alert('Selecciona un cliente y agrega al menos un servicio.');
      return;
    }

    const totalAmount = services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const newInvoice = {
      invoiceNumber,
      clientName: selectedClient.name,
      clientAddress: selectedClient.address,
      clientNif: selectedClient.nif,
      clientPhone: selectedClient.phone,
      createdAt: new Date().toISOString(),
      services,
      totalAmount,
      vat,
      total
    };

    try {
      await axios.post(`${API_URL}/invoices`, newInvoice, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();
    doc.addImage("https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png", "PNG", 10, 10, 40, 20);
    doc.setFontSize(14);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
    doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
    doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
    doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });
    doc.text(`Factura Nº: ${selectedInvoice.invoiceNumber}`, 14, 60);
    doc.text(`Fecha: ${new Date(selectedInvoice.createdAt).toLocaleDateString('es-ES')}`, 14, 66);
    doc.text(`Cliente: ${selectedInvoice.clientName}`, 14, 76);
    doc.text(`NIF: ${selectedInvoice.clientNif}`, 14, 82);
    doc.text(`Dirección: ${selectedInvoice.clientAddress}`, 14, 88);
    doc.text(`Teléfono: ${selectedInvoice.clientPhone}`, 14, 94);
    const tableData = selectedInvoice.services.map(service => [service.description, `${service.amount.toFixed(2)} €`]);
    doc.autoTable({ startY: 110, head: [["Descripción", "Importe (€)"]], body: tableData });
    doc.text(`Subtotal: ${selectedInvoice.totalAmount.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA (21%): ${selectedInvoice.vat.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 16);
    doc.text(`Total: ${selectedInvoice.total.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 22);
    doc.save(`Factura_${selectedInvoice.invoiceNumber}.pdf`);
  };

  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl mb-4">Crear Factura</h1>
      <div>
        <label>Cliente</label>
        <select
          value={selectedClient ? selectedClient._id : ''}
          onChange={(e) => setSelectedClient(clients.find(client => client._id === e.target.value))}
          className="border p-2 w-full"
        >
          <option value="">Selecciona cliente</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <h3 className="text-xl font-bold mb-2 mt-4">Servicios</h3>
      {services.map((service, index) => (
        <div key={index} className="flex mb-4">
          <input
            type="text"
            placeholder="Descripción"
            value={service.description}
            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="number"
            placeholder="Importe (€)"
            value={service.amount}
            onChange={(e) => handleServiceChange(index, 'amount', e.target.value)}
            className="border p-2 ml-2"
          />
          <button type="button" onClick={() => handleRemoveService(index)} className="bg-red-500 text-white p-2 ml-2">Eliminar</button>
        </div>
      ))}
      <button type="button" onClick={handleAddService} className="bg-green-500 text-white p-2 mt-2">Añadir Servicio</button>
      <button onClick={handleCreateInvoice} className="bg-blue-500 text-white p-2 mt-4">Guardar Factura</button>
    </div>
    <div className="p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>
      <input type="text" placeholder="Buscar factura" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 mb-4 w-full" />
      <button onClick={handleCreateInvoice} className="bg-green-500 text-white p-2">Crear Factura</button>
      <ul>
        {invoices.filter(invoice => invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())).map((invoice, index) => (
          <li key={index} className="border p-2 flex justify-between">
            <span>{invoice.clientName} - {invoice.total.toFixed(2)}€</span>
            <button onClick={() => setSelectedInvoice(invoice)} className="bg-blue-500 text-white p-2">Vista Previa</button>
          </li>
        ))}
      </ul>
      {selectedInvoice && <button onClick={handleDownloadPDF} className="bg-green-500 text-white p-2 mt-4">Descargar PDF</button>}
    </div>
    </>
  );
};

export default Invoices; */
/* import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([{ description: '', amount: 0 }]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString('es-ES'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    fetchClients();
    fetchInvoices();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`);
      setInvoices(response.data);
      if (response.data.length) {
        const lastInvoice = response.data[response.data.length - 1];
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10);
        setInvoiceNumber(`${(lastNumber + 1).toString().padStart(2, "0")}/2025`);
      } else {
        setInvoiceNumber("01/2025");
      }
    } catch (error) {
      console.error('Error al cargar facturas:', error);
    }
  };

  const handleAddService = () => {
    setServices([...services, { description: '', amount: 0 }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleCreateInvoice = async () => {
    if (!selectedClient || services.length === 0) {
      alert('Selecciona un cliente y agrega al menos un servicio.');
      return;
    }

    const totalAmount = services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const newInvoice = {
      invoiceNumber,
      clientName: selectedClient.name,
      clientAddress: selectedClient.address,
      clientNif: selectedClient.nif,
      clientPhone: selectedClient.phone,
      createdAt: new Date().toISOString(),
      services,
      totalAmount,
      vat,
      total
    };

    try {
      await axios.post(`${API_URL}/invoices`, newInvoice, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };

  const handleUpdateInvoice = async () => {
    if (!selectedInvoice) return;

    try {
      await axios.put(`${API_URL}/invoices/${selectedInvoice._id}`, {
        services: selectedInvoice.services,
        totalAmount: selectedInvoice.totalAmount,
        vat: selectedInvoice.vat,
        total: selectedInvoice.total
      });

      fetchInvoices();
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();
    doc.addImage("https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png", "PNG", 10, 10, 40, 20);
    doc.setFontSize(14);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 105, 26, { align: "center" });
    doc.text("SANT FRUITOS DE BAGES, 08272", 105, 32, { align: "center" });
    doc.text("Email: info@yourcompany.com", 105, 38, { align: "center" });
    doc.text("Phone: 34 625254144 - 653903600", 105, 44, { align: "center" });

    doc.text(`Factura Nº: ${selectedInvoice.invoiceNumber}`, 14, 60);
    doc.text(`Fecha: ${new Date(selectedInvoice.createdAt).toLocaleDateString('es-ES')}`, 14, 66);
    doc.text(`Cliente: ${selectedInvoice.clientName}`, 14, 76);
    doc.text(`NIF: ${selectedInvoice.clientNif}`, 14, 82);
    doc.text(`Dirección: ${selectedInvoice.clientAddress}`, 14, 88);
    doc.text(`Teléfono: ${selectedInvoice.clientPhone}`, 14, 94);

    const tableData = selectedInvoice.services.map(service => [service.description, `${service.amount.toFixed(2)} €`]);
    doc.autoTable({ startY: 110, head: [["Descripción", "Importe (€)"]], body: tableData });

    doc.text(`Subtotal: ${selectedInvoice.totalAmount.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA (21%): ${selectedInvoice.vat.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 16);
    doc.text(`Total: ${selectedInvoice.total.toFixed(2)} €`, 140, doc.lastAutoTable.finalY + 22);

    doc.save(`Factura_${selectedInvoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>

      <div>
        <label>Cliente</label>
        <select
          value={selectedClient ? selectedClient._id : ''}
          onChange={(e) => setSelectedClient(clients.find(client => client._id === e.target.value))}
          className="border p-2 w-full"
        >
          <option value="">Selecciona cliente</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-xl font-bold mb-2 mt-4">Servicios</h3>
      {services.map((service, index) => (
        <div key={index} className="flex mb-4">
          <input
            type="text"
            placeholder="Descripción"
            value={service.description}
            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="number"
            placeholder="Importe (€)"
            value={service.amount}
            onChange={(e) => handleServiceChange(index, 'amount', e.target.value)}
            className="border p-2 ml-2"
          />
          <button onClick={() => handleRemoveService(index)} className="bg-red-500 text-white p-2 ml-2">Eliminar</button>
        </div>
      ))}
      <button onClick={handleAddService} className="bg-green-500 text-white p-2 mt-2">Añadir Servicio</button>
      <button onClick={handleCreateInvoice} className="bg-blue-500 text-white p-2 mt-4">Guardar Factura</button>

      <button onClick={handleUpdateInvoice} className="bg-yellow-500 text-white p-2 mt-4">Actualizar Factura</button>
    </div>
    
  );
};

export default Invoices; */