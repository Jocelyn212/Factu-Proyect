/* import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/clients" className="text-blue-500">Clientes</Link> 
          </div>
          <div> 
            <Link to="/invoices" className="text-blue-500">Factura</Link>
          </div>
        
       
      </div>
    </div>
  );
}

export default Dashboard; */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaFileInvoiceDollar, FaHome } from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    { icon: <FaHome className="text-4xl mx-auto" />, name: "Dashboard", route: "/dashboard" },
    { icon: <FaUserFriends className="text-4xl mx-auto" />, name: "Clientes", route: "/clients" },
    { icon: <FaFileInvoiceDollar className="text-4xl mx-auto" />, name: "Facturas", route: "/invoices" },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg m-4 p-6 text-center cursor-pointer transform transition-transform hover:scale-105 w-40"
          onClick={() => handleCardClick(card.route)}
        >
          <div className="mb-2 flex justify-center items-center h-16">
            {card.icon}
          </div>
          <div className="text-lg font-semibold">
            {card.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;