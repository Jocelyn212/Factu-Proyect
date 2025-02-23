import { useState, useEffect } from "react";

function Clients() {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientNIF, setClientNIF] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clients"); // Asegúrate de usar el puerto correcto
      if (!response.ok) {
        throw new Error('No se pudieron cargar los clientes');
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async (e) => {
    e.preventDefault();
    const client = {
      name: clientName,
      address: clientAddress,
      nif: clientNIF,
      email: clientEmail,
      phone: clientPhone,
    };
    const response = await fetch("http://localhost:3000/api/clients", { // Usa el puerto adecuado
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });
    if (response.ok) {
      fetchClients();
      setClientName("");
      setClientAddress("");
      setClientNIF("");
      setClientEmail("");
      setClientPhone("");
    } else {
      const errorData = await response.json();
      console.error(errorData.message || "Error al agregar cliente");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Clientes</h1>
      <form onSubmit={addClient} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NIF</label>
          <input
            type="text"
            value={clientNIF}
            onChange={(e) => setClientNIF(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="text"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Añadir Cliente
        </button>
      </form>
      <h2 className="text-2xl mb-4">Lista de Clientes</h2>
      <ul>
        {clients.map(client => (
          <li key={client._id} className="mb-2">
            {client.name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;



