import { useState, useEffect } from "react";
import { API_URL } from "../config";

function InvoiceForm({ addInvoice }) {
  const [clientName, setClientName] = useState("");
  const [services, setServices] = useState([{ description: "", amount: "" }]);
  const [clients, setClients] = useState([]);

  // Cargar los clientes desde la API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_URL}/clients`);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };
    fetchClients();
  }, []);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { description: "", amount: "" }]);
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    const totalAmount = services.reduce((total, service) => total + parseFloat(service.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;
    const newInvoice = {
      clientName,
      services,
      totalAmount: totalAmount || 0,
      vat,
      total,
    };
    addInvoice(newInvoice);
    setClientName("");
    setServices([{ description: "", amount: "" }]);
  };

  return (
    <form onSubmit={handleAddInvoice} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Crear Factura</h2>
      <div>
        <label>Cliente</label>
        <select
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Seleciona cliente</option>
          {clients.map(client => (
            <option key={client._id} value={client.name}>{client.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label>Servicio</label>
        {services.map((service, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, "description", e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              type="number"
              placeholder="Amount"
              value={service.amount}
              onChange={(e) => handleServiceChange(index, "amount", e.target.value)}
              className="border p-2"
            />
            <button type="button" onClick={() => handleRemoveService(index)} className="bg-red-500 text-white p-2">Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={handleAddService} className="bg-green-500 text-white p-2">Añadir Servicio</button>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Crear Factura
      </button>
    </form>
  );
}

export default InvoiceForm;  


//--------------------------------AQUI EMPIEZA EL CODIGO DE LA PAGINA DE INVOICE----------------------------------------------------


/* import { useState, useEffect } from "react";

function InvoiceForm({ addInvoice }) {
  const [clientId, setClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // Cliente seleccionado
  const [services, setServices] = useState([{ description: "", amount: "" }]);
  const [clients, setClients] = useState([]);

  // Cargar clientes desde la API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clients");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };
    fetchClients();
  }, []);

  // Cambia el cliente seleccionado
  useEffect(() => {
    if (clientId) {
      const client = clients.find((c) => c._id === clientId);
      setSelectedClient(client || null);
    }
  }, [clientId, clients]);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { description: "", amount: "" }]);
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (!selectedClient) {
      alert("Por favor, selecciona un cliente.");
      return;
    }

    const totalAmount = services.reduce((total, service) => total + parseFloat(service.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const newInvoice = {
      clientId: selectedClient._id,
      clientName: selectedClient.name,
      clientNIF: selectedClient.nif,
      clientAddress: selectedClient.address,
      clientPhone: selectedClient.phone,
      services,
      totalAmount,
      vat,
      total,
      createdAt: new Date().toISOString(),
    };
    addInvoice(newInvoice); // Envía la factura al componente principal
    setClientId("");
    setServices([{ description: "", amount: "" }]);
  };

  return (
    <form onSubmit={handleAddInvoice} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Crear Factura</h2>

      
      <div>
        <label>Cliente</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
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

     
      {selectedClient && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Nombre:</strong> {selectedClient.name}</p>
          <p><strong>NIF:</strong> {selectedClient.nif}</p>
          <p><strong>Dirección:</strong> {selectedClient.address}</p>
          <p><strong>Teléfono:</strong> {selectedClient.phone}</p>
        </div>
      )}

      
      <div className="mt-4">
        <label>Servicio</label>
        {services.map((service, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Descripción"
              value={service.description}
              onChange={(e) => handleServiceChange(index, "description", e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              type="number"
              placeholder="Importe"
              value={service.amount}
              onChange={(e) => handleServiceChange(index, "amount", e.target.value)}
              className="border p-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveService(index)}
              className="bg-red-500 text-white p-2"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddService}
          className="bg-green-500 text-white p-2"
        >
          Añadir Servicio
        </button>
      </div>


      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Crear Factura
      </button>
    </form>
  );
}

export default InvoiceForm; 
 */
//--------------------------------AQUI EMPIEZA EL CODIGO DE LA PAGINA DE INVOICE----------------------------------------------------

/* import { useState, useEffect } from "react";

function InvoiceForm({ addInvoice }) {
  const [clientId, setClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([{ description: "", amount: "" }]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clients");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (clientId) {
      const client = clients.find((c) => c._id === clientId);
      setSelectedClient(client || null);
    }
  }, [clientId, clients]);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { description: "", amount: "" }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (!selectedClient) {
      alert("Por favor, selecciona un cliente.");
      return;
    }

    const totalAmount = services.reduce((total, service) => total + parseFloat(service.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const newInvoice = {
      clientId: selectedClient._id,
      clientName: selectedClient.name,
      clientNIF: selectedClient.nif,
      clientAddress: selectedClient.address,
      clientPhone: selectedClient.phone,
      services,
      totalAmount,
      vat,
      total,
      createdAt: new Date().toISOString(),
    };

    addInvoice(newInvoice);
    setClientId("");
    setServices([{ description: "", amount: "" }]);
  };

  return (
    <form onSubmit={handleAddInvoice} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Crear Factura</h2>

      <div>
        <label>Cliente</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
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

      {selectedClient && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Nombre:</strong> {selectedClient.name}</p>
          <p><strong>NIF:</strong> {selectedClient.nif}</p>
          <p><strong>Dirección:</strong> {selectedClient.address}</p>
          <p><strong>Teléfono:</strong> {selectedClient.phone}</p>
        </div>
      )}

      <div className="mt-4">
        <label>Servicio</label>
        {services.map((service, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Descripción"
              value={service.description}
              onChange={(e) => handleServiceChange(index, "description", e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              type="number"
              placeholder="Importe"
              value={service.amount}
              onChange={(e) => handleServiceChange(index, "amount", e.target.value)}
              className="border p-2"
            />
            <button type="button" onClick={() => handleRemoveService(index)} className="bg-red-500 text-white p-2">
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddService} className="bg-green-500 text-white p-2">
          Añadir Servicio
        </button>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Crear Factura
      </button>
    </form>
  );
}

export default InvoiceForm;  */


//--------------------------------AQUI EMPIEZA EL CODIGO DE LA PAGINA DE INVOICE----------------------------------------------------


/* import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const InvoiceForm = ({ fetchInvoices }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([{ description: "", amount: "" }]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString("es-ES"));

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_URL}/clients`);
        setClients(response.data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchLastInvoiceNumber = async () => {
      try {
        const response = await axios.get(`${API_URL}/invoices/last`);
        const lastNumber = response.data?.invoiceNumber || "00/2025";
        const nextNumber = (parseInt(lastNumber.split("/")[0], 10) + 1).toString().padStart(2, "0");
        setInvoiceNumber(`${nextNumber}/2025`);
      } catch (error) {
        console.error("Error al obtener el último número de factura:", error);
      }
    };
    fetchLastInvoiceNumber();
  }, []);

  const handleClientChange = (event) => {
    const client = clients.find((c) => c._id === event.target.value);
    setSelectedClient(client || null);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { description: "", amount: "" }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedClient || services.length === 0) {
      alert("Debes seleccionar un cliente y agregar al menos un servicio.");
      return;
    }

    const totalAmount = services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const vat = totalAmount * 0.21;
    const total = totalAmount + vat;

    const invoiceData = {
      invoiceNumber,
      clientId: selectedClient._id,
      clientName: selectedClient.name,
      clientNIF: selectedClient.nif,
      clientAddress: selectedClient.address,
      clientPhone: selectedClient.phone,
      services,
      totalAmount,
      vat,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_URL}/invoices`, invoiceData);
      fetchInvoices();
    } catch (error) {
      console.error("Error al guardar la factura:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const logoUrl = "https://res.cloudinary.com/pruebaweb/image/upload/v1740180968/LogoEdu_toe1na.png";

    doc.addImage(logoUrl, "PNG", 20, 10, 40, 20);
    doc.setFontSize(12);
    doc.text("OBRES I SERVEIS MIG-MON 2022 S.C.P", 180, 15, { align: "right" });
    doc.text("ARQUITECTE GAUDI 7 3º 2º", 180, 20, { align: "right" });
    doc.text("SANT FRUITOS DE BAGES, 08272", 180, 25, { align: "right" });
    doc.text("Email: info@yourcompany.com", 180, 30, { align: "right" });
    doc.text("Phone: 34 625254144 - 653903600", 180, 35, { align: "right" });

    doc.setFontSize(14);
    doc.text(`Factura Nº: ${invoiceNumber}`, 20, 60);
    doc.text(`Fecha: ${createdAt}`, 20, 70);
    doc.text(`Cliente: ${selectedClient?.name}`, 20, 80);
    doc.text(`NIF: ${selectedClient?.nif}`, 20, 90);
    doc.text(`Dirección: ${selectedClient?.address}`, 20, 100);
    doc.text(`Teléfono: ${selectedClient?.phone}`, 20, 110);

    const tableData = services.map((service) => [service.description, `${parseFloat(service.amount || 0).toFixed(2)} €`]);
    doc.autoTable({ startY: 120, head: [["Descripción", "Importe (€)"]], body: tableData, theme: "grid" });

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ${totalAmount.toFixed(2)} €`, 180, finalY, { align: "right" });
    doc.text(`IVA (21%): ${vat.toFixed(2)} €`, 180, finalY + 6, { align: "right" });
    doc.text(`Total: ${total.toFixed(2)} €`, 180, finalY + 12, { align: "right" });

    doc.save(`Factura_${invoiceNumber}.pdf`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Crear Factura</h2>
      <select value={selectedClient?._id || ""} onChange={handleClientChange} className="border p-2 w-full">
        <option value="">Selecciona cliente</option>
        {clients.map((client) => (
          <option key={client._id} value={client._id}>{client.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Crear Factura</button>
      <button type="button" onClick={generatePDF} className="bg-green-500 text-white p-2 mt-4">Descargar PDF</button>
    </form>
  );
};

export default InvoiceForm; */
