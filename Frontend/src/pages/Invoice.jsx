import React, { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Para controlar si estamos editando una factura existente (solo sus servicios).
  const [editingInvoice, setEditingInvoice] = useState(false);

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

  // ----------------------------
  // EDICIÓN DE SERVICIOS
  // ----------------------------

  // Cuando se hace clic en "Editar Servicios"
  const handleStartEditing = (invoice) => {
    setSelectedInvoice(invoice);
    setEditingInvoice(true);
  };

  // Maneja el cambio de los servicios en la factura seleccionada (solo los servicios).
  const handleEditServiceChange = (index, field, value) => {
    if (!selectedInvoice) return;
    
    const updatedServices = [...selectedInvoice.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };

    // Recalcular totales
    const totalAmount = updatedServices.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    setSelectedInvoice({
      ...selectedInvoice,
      services: updatedServices,
      totalAmount,
      vat,
      total,
    });
  };

  // Añadir un nuevo servicio en la factura seleccionada
  const handleAddServiceInEdit = () => {
    if (!selectedInvoice) return;
    const updatedServices = [
      ...selectedInvoice.services,
      { description: '', amount: 0 }
    ];

    // Recalcular totales
    const totalAmount = updatedServices.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    setSelectedInvoice({
      ...selectedInvoice,
      services: updatedServices,
      totalAmount,
      vat,
      total,
    });
  };

  // Eliminar un servicio de la factura seleccionada
  const handleRemoveServiceInEdit = (index) => {
    if (!selectedInvoice) return;
    const updatedServices = selectedInvoice.services.filter((_, i) => i !== index);

    // Recalcular totales
    const totalAmount = updatedServices.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    setSelectedInvoice({
      ...selectedInvoice,
      services: updatedServices,
      totalAmount,
      vat,
      total,
    });
  };

  // GUARDAR cambios de servicios
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
      // Cerramos el modo edición
      setEditingInvoice(false);
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm',
      orientation: 'portrait'
    });

    // Añadir logo y cabecera
    doc.addImage("https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png", "PNG", 15, 15, 40, 20);
    
    // Datos de la empresa (alineados a la derecha)
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 195, 15, { align: "right" });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 195, 20, { align: "right" });
    doc.text("SANT FRUITOS DE BAGES", 195, 25, { align: "right" });
    doc.text("08272", 195, 30, { align: "right" });
    doc.text("Email: info@yourcompany.com", 195, 35, { align: "right" });
    doc.text("Phone: 34 625254144 - 653903600", 195, 40, { align: "right" });
    
    // Línea separadora
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 45, 195, 45);
    
    // Número y fecha de factura
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Factura Nº: ${selectedInvoice.invoiceNumber}`, 15, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date(selectedInvoice.createdAt).toLocaleDateString('es-ES')}`, 15, 60);
    
    // Datos del cliente
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("Datos del cliente:", 15, 70);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Cliente: ${selectedInvoice.clientName}`, 15, 76);
    doc.text(`NIF: ${selectedInvoice.clientNif || "N/A"}`, 15, 81);
    doc.text(`Dirección: ${selectedInvoice.clientAddress || "N/A"}`, 15, 86);
    doc.text(`Teléfono: ${selectedInvoice.clientPhone || "N/A"}`, 15, 91);
    
    // Tabla de servicios
    const tableColumn = ["Descripción", "Total (€)"];
    const tableRows = [];
    
    selectedInvoice.services.forEach(service => {
      const serviceData = [
        service.description,
        `${parseFloat(service.amount).toFixed(2)} €`
      ];
      tableRows.push(serviceData);
    });
    
    doc.autoTable({
      startY: 100,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        halign: 'left'
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' }
      },
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle',
        overflow: 'linebreak',
        cellWidth: 'auto'
      },
      margin: { left: 15, right: 15 }
    });
    
    // Totales (alineados a la derecha)
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(`Subtotal: ${selectedInvoice.totalAmount.toFixed(2)} €`, 195, finalY, { align: "right" });
    doc.text(`IVA (21%): ${selectedInvoice.vat.toFixed(2)} €`, 195, finalY + 5, { align: "right" });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Total: ${selectedInvoice.total.toFixed(2)} €`, 195, finalY + 12, { align: "right" });
    
    // Línea separadora final
    doc.setDrawColor(220, 220, 220);
    doc.line(15, finalY + 20, 195, finalY + 20);
    
    // Nota al pie
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text("Gracias por confiar en nuestros servicios", 105, finalY + 25, { align: "center" });
    
    doc.save(`Factura_${selectedInvoice.invoiceNumber}_${selectedInvoice.clientName}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Facturas</h1>
      
      {/* Sección de selección de cliente */}
      <div className="mb-4">
        <label className="block mb-2">Cliente</label>
        <select
          value={selectedClient ? selectedClient._id : ''}
          onChange={(e) =>
            setSelectedClient(clients.find(client => client._id === e.target.value))
          }
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
      
      {/* Sección de servicios (para crear factura nueva) */}
      <h3 className="text-xl font-bold mb-2 mt-4">Servicios (nueva factura)</h3>
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
          <button
            onClick={() => handleRemoveService(index)}
            className="bg-red-500 text-white p-2 ml-2"
          >
            Eliminar
          </button>
        </div>
      ))}
      
      <div className="mb-6">
        <button onClick={handleAddService} className="bg-green-500 text-white p-2 mr-2">
          Añadir Servicio
        </button>
        <button onClick={handleCreateInvoice} className="bg-blue-500 text-white p-2">
          Guardar Factura
        </button>
      </div>

      {/* Buscador de facturas */}
      <input
        type="text"
        placeholder="Buscar factura por cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Lista de facturas */}
      <ul>
        {invoices
          .filter(invoice =>
            invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((invoice, index) => (
            <li key={index} className="border p-2 flex justify-between mb-2">
              <span>
                {invoice.invoiceNumber} - {invoice.clientName} - {invoice.total.toFixed(2)}€
              </span>
              <div className="space-x-2">
                {/* Vista previa */}
                <button
                  onClick={() => {
                    setSelectedInvoice(invoice);
                    setEditingInvoice(false);
                  }}
                  className="bg-blue-500 text-white p-2"
                >
                  Vista Previa
                </button>
                {/* Editar solo servicios */}
                <button
                  onClick={() => handleStartEditing(invoice)}
                  className="bg-yellow-500 text-white p-2"
                >
                  Editar Servicios
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* VISTA PREVIA O EDICIÓN DE FACTURA SELECCIONADA */}
      {selectedInvoice && !editingInvoice && (
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
      
            <div className="mt-4">
              <p>
                <strong>Cliente:</strong> {selectedInvoice.clientName}
              </p>
              <p>
                <strong>NIF:</strong> {selectedInvoice.clientNif}
              </p>
              <p>
                <strong>Dirección:</strong> {selectedInvoice.clientAddress}
              </p>
              <p>
                <strong>Teléfono:</strong> {selectedInvoice.clientPhone}
              </p>
            </div>
            
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
                {selectedInvoice.services.map((service, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">
                      {service.description}
                    </td>
                    <td className="border border-gray-400 p-2 text-right">
                      {parseFloat(service.amount).toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-4">
              <p className="text-right">
                <strong>Subtotal:</strong> {selectedInvoice.totalAmount.toFixed(2)} €
              </p>
              <p className="text-right">
                <strong>IVA (21%):</strong> {selectedInvoice.vat.toFixed(2)} €
              </p>
              <p className="mt-2 font-bold text-right">
                Total: {selectedInvoice.total.toFixed(2)} €
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-500 hover:bg-green-600 text-white p-2 px-4 rounded"
              >
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDICIÓN DE SERVICIOS DE LA FACTURA SELECCIONADA */}
      {selectedInvoice && editingInvoice && (
        <div className="mt-8 border p-6 bg-white shadow-lg max-w-[800px] mx-auto">
          <h2 className="text-2xl mb-4">Editar Servicios (Factura #{selectedInvoice.invoiceNumber})</h2>
          <p><strong>Cliente:</strong> {selectedInvoice.clientName}</p>
          <p><strong>Fecha:</strong> {new Date(selectedInvoice.createdAt).toLocaleDateString('es-ES')}</p>

          <h3 className="text-xl font-bold mb-2 mt-4">Servicios</h3>
          {selectedInvoice.services.map((service, index) => (
            <div key={index} className="flex mb-4">
              <input
                type="text"
                placeholder="Descripción"
                value={service.description}
                onChange={(e) => handleEditServiceChange(index, 'description', e.target.value)}
                className="border p-2 flex-1"
              />
              <input
                type="number"
                placeholder="Importe (€)"
                value={service.amount}
                onChange={(e) => handleEditServiceChange(index, 'amount', e.target.value)}
                className="border p-2 ml-2"
              />
              <button
                onClick={() => handleRemoveServiceInEdit(index)}
                className="bg-red-500 text-white p-2 ml-2"
              >
                Eliminar
              </button>
            </div>
          ))}

          <button
            onClick={handleAddServiceInEdit}
            className="bg-green-500 text-white p-2 mr-2"
          >
            Añadir Servicio
          </button>

          <div className="mt-4">
            <p>
              <strong>Subtotal:</strong> {selectedInvoice.totalAmount.toFixed(2)} €
            </p>
            <p>
              <strong>IVA (21%):</strong> {selectedInvoice.vat.toFixed(2)} €
            </p>
            <p className="font-bold">
              Total: {selectedInvoice.total.toFixed(2)} €
            </p>
          </div>

          <div className="mt-6 space-x-2">
            <button
              onClick={handleUpdateInvoice}
              className="bg-blue-500 text-white p-2"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => {
                setEditingInvoice(false);
                setSelectedInvoice(null);
              }}
              className="bg-gray-400 text-white p-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
