import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetForm = ({ fetchBudgets, selectedBudget, setSelectedBudget }) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [services, setServices] = useState([{ description: '', price: '' }]);

  useEffect(() => {
    if (selectedBudget) {
      setClientName(selectedBudget.clientName);
      setClientPhone(selectedBudget.clientPhone);
      setServices(selectedBudget.services);
    }
  }, [selectedBudget]);

  const handleServiceChange = (index, event) => {
    const newServices = services.map((service, sIndex) => {
      if (index !== sIndex) return service;
      return { ...service, [event.target.name]: event.target.value };
    });
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { description: '', price: '' }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, sIndex) => index !== sIndex));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const budgetData = {
        clientName,
        clientPhone,
        services: services.map(service => ({
          description: service.description,
          price: parseFloat(service.price)
        }))
      };

      if (selectedBudget) {
        await axios.put(`http://localhost:3000/api/budgets/${selectedBudget._id}`, budgetData);
        setSelectedBudget(null);
      } else {
        await axios.post('http://localhost:3000/api/budgets', budgetData);
      }

      fetchBudgets();
      setClientName('');
      setClientPhone('');
      setServices([{ description: '', price: '' }]);
    } catch (error) {
      console.error('Error al guardar el presupuesto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{selectedBudget ? 'Editar Presupuesto' : 'Crear Presupuesto'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre del Cliente</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Teléfono del Cliente</label>
        <input
          type="text"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <h3 className="text-xl font-bold mb-2">Servicios</h3>
      {services.map((service, index) => (
        <div key={index} className="mb-4">
          <div className="flex mb-2">
            <input
              type="text"
              name="description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, e)}
              placeholder="Descripción del servicio"
              className="w-2/3 px-3 py-2 border rounded mr-2"
              required
            />
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={(e) => handleServiceChange(index, e)}
              placeholder="Precio (€)"
              className="w-1/3 px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveService(index)}
            className="text-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddService}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Añadir Servicio
      </button>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded"
      >
        {selectedBudget ? 'Guardar Cambios' : 'Crear Presupuesto'}
      </button>
    </form>
  );
};

export default BudgetForm;