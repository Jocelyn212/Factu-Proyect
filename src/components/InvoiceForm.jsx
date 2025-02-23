import { useState, useEffect } from "react";

function InvoiceForm({ addInvoice }) {
  const [clientName, setClientName] = useState("");
  const [services, setServices] = useState([{ description: "", amount: "" }]);
  const [clients, setClients] = useState([]);

  // Cargar los clientes desde la API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/invoices");
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
      <h2 className="text-2xl mb-4">Add Invoice</h2>
      <div>
        <label>Client</label>
        <select
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select a client</option>
          {clients.map(client => (
            <option key={client._id} value={client.name}>{client.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label>Services</label>
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
            <button type="button" onClick={() => handleRemoveService(index)} className="bg-red-500 text-white p-2">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddService} className="bg-green-500 text-white p-2">Add Service</button>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Add Invoice
      </button>
    </form>
  );
}

export default InvoiceForm;
