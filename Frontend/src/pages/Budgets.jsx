/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import jsPDF from 'jspdf';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error al cargar los presupuestos:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPdf = (budget) => {
    const doc = new jsPDF();
    doc.text('Presupuesto', 20, 20);
    doc.text(`Cliente: ${budget.clientName}`, 20, 30);
    doc.text(`Teléfono: ${budget.clientPhone}`, 20, 40);

    // Crear tabla manualmente
    let startY = 50;
    doc.text('Descripción del servicio', 20, startY);
    doc.text('Precio (€)', 150, startY);
    startY += 10;

    budget.services.forEach(service => {
      doc.text(service.description, 20, startY);
      doc.text(service.price.toString(), 150, startY);
      startY += 10;
    });

    doc.text(`Total: €${budget.total}`, 20, startY + 10);
    doc.save(`Presupuesto_${budget.clientName}.pdf`);
  };

  const handleEditBudget = (budget) => {
    setSelectedBudget(budget);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>
      
      <BudgetForm fetchBudgets={fetchBudgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul>
        {filteredBudgets.map(budget => (
          <li key={budget._id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{budget.clientName} - {budget.total}€</span>
              <div>
                <button
                  onClick={() => handleDownloadPdf(budget)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Descargar PDF
                </button>
                <button
                  onClick={() => handleEditBudget(budget)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Editar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budgets; */
/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import jsPDF from 'jspdf';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error al cargar los presupuestos:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPdf = (budget) => {
    const doc = new jsPDF();

    // Agregar logo
    const logoUrl = 'https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png';
    doc.addImage(logoUrl, 'PNG', 10, 10, 40, 20); // Alineado a la izquierda

    // Agregar datos de la empresa alineados a la derecha
    doc.setFontSize(10);
    doc.text('OBRES I SERVEIS MIG-MON 2022 S.C.P', 200, 10, { align: 'right' });
    doc.text('ARQUITECTE GAUDI 7 3º 2º', 200, 15, { align: 'right' });
    doc.text('SANT FRUITOS DE BAGES', 200, 20, { align: 'right' });
    doc.text('08272', 200, 25, { align: 'right' });
    doc.text('Email: info@yourcompany.com', 200, 30, { align: 'right' });
    doc.text('Phone: 34 625254144 - 653903600', 200, 35, { align: 'right' });

    // Agregar título del presupuesto
    doc.setFontSize(14);
    doc.text('Presupuesto', 10, 50);

    // Datos del cliente
    doc.setFontSize(10);
    doc.text(`Cliente: ${budget.clientName}`, 10, 60);
    doc.text(`Teléfono: ${budget.clientPhone}`, 10, 70);

    // Crear tabla manualmente
    let startY = 90;
    doc.setFontSize(11);
    doc.text('Descripción del servicio', 10, startY);
    doc.text('Precio (€)', 180, startY, { align: 'right' });
    startY += 10;

    budget.services.forEach(service => {
      doc.text(service.description, 10, startY);
      doc.text(service.price.toFixed(2), 180, startY, { align: 'right' });
      startY += 8;
    });

    doc.text(`Total: €${budget.total.toFixed(2)}`, 10, startY + 10);

    doc.save(`Presupuesto_${budget.clientName}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>

      <BudgetForm fetchBudgets={fetchBudgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul>
        {filteredBudgets.map(budget => (
          <li key={budget._id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{budget.clientName} - {budget.total}€</span>
              <div>
                <button
                  onClick={() => setPreviewBudget(budget)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Vista Previa
                </button>
                <button
                  onClick={() => handleDownloadPdf(budget)}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Descargar PDF
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      
      {previewBudget && (
        <div className="mt-8 border p-4 bg-white shadow-lg">
          <h2 className="text-2xl mb-4">Vista Previa del Presupuesto</h2>
          <div className="p-4 border bg-gray-100">
            <div className="flex justify-between">
              <img src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png" alt="Logo" className="w-24" />
              <div className="text-right text-sm">
                <p className="font-bold">OBRES I SERVEIS MIG-MON 2022 S.C.P</p>
                <p>ARQUITECTE GAUDI 7 3º 2º</p>
                <p>SANT FRUITOS DE BAGES</p>
                <p>08272</p>
                <p>Email: info@yourcompany.com</p>
                <p>Phone: 34 625254144 - 653903600</p>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-bold">Presupuesto</h3>
            <p><strong>Cliente:</strong> {previewBudget.clientName}</p>
            <p><strong>Teléfono:</strong> {previewBudget.clientPhone}</p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-left">Descripción</th>
                  <th className="border border-gray-400 p-2 text-right">Precio (€)</th>
                </tr>
              </thead>
              <tbody>
                {previewBudget.services.map((service, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">{service.description}</td>
                    <td className="border border-gray-400 p-2 text-right">{service.price.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-bold text-right">Total: €{previewBudget.total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets; */

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import jsPDF from 'jspdf';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error al cargar los presupuestos:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPdf = (budget) => {
    const doc = new jsPDF();

    // Logo alineado a la izquierda
    const logoUrl = 'https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png';
    doc.addImage(logoUrl, 'PNG', 20, 10, 50, 20);

    // Datos de la empresa alineados a la derecha
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('OBRES I SERVEIS MIG-MON 2022 S.C.P', 180, 15, { align: 'right' });
    doc.setFontSize(10);
    doc.text('ARQUITECTE GAUDI 7 3º 2º', 180, 20, { align: 'right' });
    doc.text('SANT FRUITOS DE BAGES', 180, 25, { align: 'right' });
    doc.text('08272', 180, 30, { align: 'right' });
    doc.text('Email: info@yourcompany.com', 180, 35, { align: 'right' });
    doc.text('Phone: 34 625254144 - 653903600', 180, 40, { align: 'right' });

    // Línea separadora
    doc.setDrawColor(150, 150, 150);
    doc.line(20, 50, 190, 50);

    // Título del presupuesto
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Presupuesto', 20, 60);

    // Datos del cliente
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Cliente: ${budget.clientName}`, 20, 70);
    doc.text(`Teléfono: ${budget.clientPhone}`, 20, 80);

    // Tabla de servicios
    let startY = 100;
    doc.setFontSize(11);
    doc.setFillColor(230, 230, 230);
    doc.rect(20, startY, 170, 10, 'F'); // Fondo gris para encabezado
    doc.setTextColor(0, 0, 0);
    doc.text('Descripción', 30, startY + 7);
    doc.text('Precio (€)', 160, startY + 7);
    startY += 12;

    doc.setDrawColor(200, 200, 200);
    budget.services.forEach(service => {
      doc.text(service.description, 30, startY);
      doc.text(service.price.toFixed(2), 160, startY, { align: 'right' });
      doc.line(20, startY + 2, 190, startY + 2); // Línea separadora
      startY += 10;
    });

    // Total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: €${budget.total.toFixed(2)}`, 160, startY + 10, { align: 'right' });

    doc.save(`Presupuesto_${budget.clientName}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>

      <BudgetForm fetchBudgets={fetchBudgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul>
        {filteredBudgets.map(budget => (
          <li key={budget._id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{budget.clientName} - {budget.total}€</span>
              <div>
                <button
                  onClick={() => setPreviewBudget(budget)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Vista Previa
                </button>
                <button
                  onClick={() => handleDownloadPdf(budget)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Descargar PDF
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {previewBudget && (
        <div className="mt-8 border p-4 bg-white shadow-lg">
          <h2 className="text-2xl mb-4">Vista Previa del Presupuesto</h2>
          <div className="p-4 border bg-gray-100">
            <div className="flex justify-between">
              <img
                src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png"
                alt="Logo"
                className="w-42 h-auto object-contain"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets; */
/* import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);
  const componentRef = useRef(null);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error al cargar los presupuestos:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPdf = async () => {
    if (!componentRef.current) return;
  
    try {
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        ignoreElements: (el) => el.classList.contains("no-print"), // Ignora elementos no imprimibles
      });
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Presupuesto_${previewBudget.clientName}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
  

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>

      <BudgetForm fetchBudgets={fetchBudgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul>
        {filteredBudgets.map(budget => (
          <li key={budget._id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{budget.clientName} - {budget.total}€</span>
              <div>
                <button
                  onClick={() => setPreviewBudget(budget)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Vista Previa
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className={`bg-green-500 text-white p-2 rounded ${!previewBudget ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!previewBudget}
                >
                  Descargar PDF
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {previewBudget && (
        <div className="mt-8 border p-6 bg-white shadow-lg max-w-[800px] mx-auto" ref={componentRef}>
          <div className="flex justify-between">
            <img
              src="https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png"
              alt="Logo"
              className="w-40 h-auto object-contain"
              crossOrigin="anonymous"
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
          <h3 className="mt-4 text-lg font-bold">Presupuesto</h3>
          <p><strong>Cliente:</strong> {previewBudget.clientName}</p>
          <p><strong>Teléfono:</strong> {previewBudget.clientPhone}</p>
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2 text-left">Descripción</th>
                <th className="border border-gray-400 p-2 text-right">Precio (€)</th>
              </tr>
            </thead>
            <tbody>
              {previewBudget.services.map((service, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{service.description}</td>
                  <td className="border border-gray-400 p-2 text-right">{service.price.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-bold text-right">Total: €{previewBudget.total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Budgets; */

/* import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BudgetForm from "../components/BudgetForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budgets");
      setBudgets(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al cargar los presupuestos:", error);
      setError("No se pudieron cargar los presupuestos. Intenta nuevamente más tarde.");
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePdf = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save(`Presupuesto_${previewBudget?.clientName || 'undefined'}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>

      <BudgetForm fetchBudgets={fetchBudgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      {filteredBudgets.length === 0 ? (
        <p>No se encontraron presupuestos.</p>
      ) : (
        <ul>
          {filteredBudgets.map((budget) => (
            <li key={budget._id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{budget.clientName} - {budget.total}€</span>
                <div>
                  <button
                    onClick={() => setPreviewBudget(budget)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={previewBudget ? generatePdf : null}
                    className={`bg-green-500 text-white p-2 rounded ${!previewBudget ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!previewBudget}
                  >
                    Imprimir / Guardar como PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {previewBudget && (
        <div className="mt-8 border p-6 bg-white shadow-lg max-w-[800px] mx-auto" ref={componentRef}>
          <h2 className="text-2xl mb-4">Vista Previa del Presupuesto</h2>
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
            <h3 className="mt-4 text-lg font-bold">Presupuesto</h3>
            <p><strong>Cliente:</strong> {previewBudget.clientName}</p>
            <p><strong>Teléfono:</strong> {previewBudget.clientPhone}</p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-left">Descripción</th>
                  <th className="border border-gray-400 p-2 text-right">Precio (€)</th>
                </tr>
              </thead>
              <tbody>
                {previewBudget.services?.map((service, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">{service.description}</td>
                    <td className="border border-gray-400 p-2 text-right">{service.price.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-bold text-right">Total: €{previewBudget.total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;  */
/* import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BudgetForm from "../components/BudgetForm";
import html2pdf from "html2pdf.js";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budgets");
      setBudgets(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al cargar los presupuestos:", error);
      setError("No se pudieron cargar los presupuestos. Intenta nuevamente más tarde.");
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePdf = () => {
    if (!componentRef.current) {
      console.error("No se encontró el elemento para exportar.");
      return;
    }

    const element = componentRef.current;

    const options = {
      margin: 10,
      filename: `Presupuesto_${previewBudget?.clientName || "undefined"}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
      html2pdf().from(element).set(options).save();
    }, 300);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>

      <BudgetForm fetchBudgets={fetchBudgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      {filteredBudgets.length === 0 ? (
        <p>No se encontraron presupuestos.</p>
      ) : (
        <ul>
          {filteredBudgets.map((budget) => (
            <li key={budget._id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{budget.clientName} - {budget.total}€</span>
                <div>
                  <button
                    onClick={() => setPreviewBudget(budget)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={generatePdf}
                    className={`bg-green-500 text-white p-2 rounded ${!previewBudget ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!previewBudget}
                  >
                    Imprimir / Guardar como PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {previewBudget && (
        <div className="mt-8 border p-6 bg-white shadow-lg max-w-[800px] mx-auto" ref={componentRef}>
          <h2 className="text-2xl mb-4">Vista Previa del Presupuesto</h2>
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
            <h3 className="mt-4 text-lg font-bold">Presupuesto</h3>
            <p><strong>Cliente:</strong> {previewBudget.clientName}</p>
            <p><strong>Teléfono:</strong> {previewBudget.clientPhone}</p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-left">Descripción</th>
                  <th className="border border-gray-400 p-2 text-right">Precio (€)</th>
                </tr>
              </thead>
              <tbody>
                {previewBudget.services?.map((service, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">{service.description}</td>
                    <td className="border border-gray-400 p-2 text-right">{service.price.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-bold text-right">Total: €{previewBudget.total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
 */

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BudgetForm from "../components/BudgetForm";
import { jsPDF } from "jspdf";
import { API_URL } from "../config";
import "jspdf-autotable";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`${API_URL}/budgets`);
      setBudgets(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al cargar los presupuestos:", error);
      setError(
        "No se pudieron cargar los presupuestos. Intenta nuevamente más tarde."
      );
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter((budget) =>
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePdf = () => {
    if (!previewBudget) {
      console.error("No hay presupuesto para generar el PDF.");
      return;
    }

    const doc = new jsPDF();

    // Logo a la izquierda
    const logoUrl =
      "https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png";
    doc.addImage(logoUrl, "PNG", 14, 10, 40, 20);

    // Encabezado con datos de la empresa a la derecha
    doc.setFontSize(10); // Tamaño de fuente más pequeño
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 190, 15, { align: "right" });
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 190, 20, { align: "right" });
    doc.text("SANT FRUITOS DE BAGES", 190, 25, { align: "right" });
    doc.text("08272", 190, 30, { align: "right" });
    doc.text("Email: info@yourcompany.com", 190, 35, { align: "right" });
    doc.text("Phone: 34 625254144 - 653903600", 190, 40, { align: "right" });

    // Espacio entre el encabezado y el cuerpo
    doc.setFontSize(14);
    doc.text("Presupuesto", 14, 55);

    // Datos del cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${previewBudget.clientName}`, 14, 65);
    doc.text(`Teléfono: ${previewBudget.clientPhone}`, 14, 70);

    // Crear tabla con los servicios
    const tableData = previewBudget.services.map((service) => [
      service.description,
      service.price.toFixed(2) + " €",
    ]);

    tableData.push(["Total", previewBudget.total.toFixed(2) + " €"]);

    doc.autoTable({
      startY: 80,
      head: [["Descripción", "Precio (€)"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [224, 224, 224] },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 70, halign: "right" },
      },
    });

    // Guardar el PDF
    doc.save(`Presupuesto_${previewBudget.clientName}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Presupuestos</h1>

      <BudgetForm
        fetchBudgets={fetchBudgets}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
      />

      <h2 className="text-2xl mb-4">Lista de Presupuestos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre del cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      {filteredBudgets.length === 0 ? (
        <p>No se encontraron presupuestos.</p>
      ) : (
        <ul>
          {filteredBudgets.map((budget) => (
            <li key={budget._id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>
                  {budget.clientName} - {budget.total}€
                </span>
                <div>
                  <button
                    onClick={() => setPreviewBudget(budget)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={generatePdf}
                    className={`bg-green-500 text-white p-2 rounded ${
                      !previewBudget ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!previewBudget}
                  >
                    Guardar como PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {previewBudget && (
        <div className="mt-8 border p-6 bg-white shadow-lg max-w-[800px] mx-auto">
          <h2 className="text-2xl mb-4">Vista Previa del Presupuesto</h2>
          <div className="p-6 border bg-gray-100 w-full mx-auto">
            {/* Encabezado con logo y datos de la empresa */}
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

            {/* Información del cliente y los servicios */}
            <h3 className="mt-4 text-lg font-bold">Presupuesto</h3>
            <p>
              <strong>Cliente:</strong> {previewBudget.clientName}
            </p>
            <p>
              <strong>Teléfono:</strong> {previewBudget.clientPhone}
            </p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-left">
                    Descripción
                  </th>
                  <th className="border border-gray-400 p-2 text-right">
                    Precio (€)
                  </th>
                </tr>
              </thead>
              <tbody>
                {previewBudget.services?.map((service, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">
                      {service.description}
                    </td>
                    <td className="border border-gray-400 p-2 text-right">
                      {service.price.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-bold text-right">
              Total: €{previewBudget.total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
