/* import React, { useState, useEffect } from "react";
import { API_URL } from "../config";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientNIF, setClientNIF] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [message, setMessage] = useState("");

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/clients`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron cargar los clientes");
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
    setMessage("");

    if (!clientName || !clientEmail) {
      setMessage("El nombre y el correo son obligatorios.");
      return;
    }

    const client = {
      name: clientName,
      address: clientAddress,
      nif: clientNIF,
      email: clientEmail,
      phone: clientPhone,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(client),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar cliente");
      }

      fetchClients();
      setClientName("");
      setClientAddress("");
      setClientNIF("");
      setClientEmail("");
      setClientPhone("");
      setMessage("Cliente agregado con éxito.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Clientes</h1>
      
      {message && <div className="bg-blue-200 text-blue-800 p-2 mb-4">{message}</div>}

      <form onSubmit={addClient} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre *</label>
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
          <label className="block text-gray-700">Email *</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="border p-2 w-full"
            required
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




 */
import React, { useState, useEffect } from "react";
import { API_URL } from "../config";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Formulario para nuevo cliente
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientNIF, setClientNIF] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Formulario para cliente en edición
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    nif: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron cargar los clientes");
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error);
      setMessage("Error al cargar los clientes: " + error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!clientName || !clientEmail) {
      setMessage("El nombre y el correo son obligatorios.");
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      setMessage("Por favor, introduce un email válido.");
      return;
    }

    const client = {
      name: clientName,
      address: clientAddress,
      nif: clientNIF,
      email: clientEmail,
      phone: clientPhone,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage(
          "No hay sesión activa. Por favor, inicia sesión nuevamente."
        );
        return;
      }

      console.log("Enviando datos:", client); // Log de los datos que se envían

      const response = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(client),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error del servidor:", responseData);
        throw new Error(responseData.message || "Error al agregar cliente");
      }

      fetchClients();
      setClientName("");
      setClientAddress("");
      setClientNIF("");
      setClientEmail("");
      setClientPhone("");
      setMessage("Cliente agregado con éxito.");
      setShowForm(false);
    } catch (error) {
      console.error("Error completo:", error);
      setMessage(`Error al agregar cliente: ${error.message}`);
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setEditMode(false);
  };

  const handleEditClick = () => {
    if (!selectedClient) return;

    setEditForm({
      name: selectedClient.name,
      address: selectedClient.address || "",
      nif: selectedClient.nif || "",
      email: selectedClient.email || "",
      phone: selectedClient.phone || "",
    });

    setEditMode(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!editForm.name || !editForm.email) {
      setMessage("El nombre y el correo son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/clients/${selectedClient._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar cliente");
      }

      // Actualizar la lista de clientes y el cliente seleccionado
      fetchClients();
      const updatedClient = { ...selectedClient, ...editForm };
      setSelectedClient(updatedClient);
      setEditMode(false);
      setMessage("Cliente actualizado con éxito.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Función para mostrar el modal de confirmación
  const handleDeleteClient = () => {
    if (!selectedClient) return;
    setShowDeleteModal(true);
  };

  // Función que ejecuta la eliminación cuando se confirma en el modal
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/clients/${selectedClient._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar cliente");
      }

      // Si la eliminación fue exitosa
      fetchClients();
      setSelectedClient(null);
      setEditMode(false);
      setMessage("Cliente eliminado con éxito.");
    } catch (error) {
      setMessage(`Error al eliminar cliente: ${error.message}`);
      console.error("Error eliminando cliente:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Filtrar clientes según el término de búsqueda
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Clientes</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes("error") || message.includes("Error")
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Botones de acción principal */}
      <div className="flex mb-6 gap-2">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancelar" : "Nuevo Cliente"}
        </button>
      </div>

      {/* Formulario para agregar cliente (visible solo cuando showForm es true) */}
      {showForm && (
        <div className="bg-gray-100 p-4 mb-6 rounded shadow">
          <h2 className="text-xl mb-3">Agregar Nuevo Cliente</h2>
          <form onSubmit={addClient}>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dirección</label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NIF</label>
              <input
                type="text"
                value={clientNIF}
                onChange={(e) => setClientNIF(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email *</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Teléfono</label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar Cliente
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Layout de dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de clientes (col 1) */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <h2 className="text-xl mb-3 font-medium">Lista de Clientes</h2>

          {filteredClients.length === 0 ? (
            <p className="text-gray-500">No se encontraron clientes</p>
          ) : (
            <ul className="bg-white rounded shadow divide-y">
              {filteredClients.map((client) => (
                <li
                  key={client._id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedClient && selectedClient._id === client._id
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-gray-600">{client.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detalles del cliente (col 2-3) */}
        <div className="md:col-span-2">
          {selectedClient ? (
            <div className="bg-white p-6 rounded shadow">
              {editMode ? (
                /* Formulario de edición */
                <form onSubmit={handleUpdateClient}>
                  <h2 className="text-xl mb-4 font-medium">Editar Cliente</h2>

                  <div className="mb-4">
                    <label className="block text-gray-700">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="border p-2 w-full rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">NIF</label>
                    <input
                      type="text"
                      name="nif"
                      value={editForm.nif}
                      onChange={handleEditChange}
                      className="border p-2 w-full rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="border p-2 w-full rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Teléfono</label>
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      className="border p-2 w-full rounded"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              ) : (
                /* Vista de detalles */
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">
                      Detalles del Cliente
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={handleDeleteClient}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        {selectedClient.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {selectedClient.email}
                      </p>

                      <div className="mt-4">
                        <div className="text-sm text-gray-500">NIF</div>
                        <div>{selectedClient.nif || "No especificado"}</div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm text-gray-500">Teléfono</div>
                        <div>{selectedClient.phone || "No especificado"}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500">Dirección</div>
                      <div className="whitespace-pre-line">
                        {selectedClient.address || "No especificada"}
                      </div>

                      <div className="mt-6 pt-4 border-t">
                        <div className="text-sm text-gray-500">
                          Cliente desde
                        </div>
                        <div>
                          {selectedClient.createdAt
                            ? new Date(
                                selectedClient.createdAt
                              ).toLocaleDateString()
                            : "Fecha no disponible"}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="bg-gray-100 p-6 rounded text-center text-gray-500">
              Selecciona un cliente para ver sus detalles
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
              ¿Estás seguro de que deseas eliminar a{" "}
              <span className="font-bold">{selectedClient?.name}</span>? Esta
              acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
