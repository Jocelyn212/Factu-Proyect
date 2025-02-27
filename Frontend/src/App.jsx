/* import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import './index.css';
import Budgets from "./pages/Budgets";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulación de verificación de token
      setUser({ username: 'User' });
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
        <Route path="/budgets" element={user ? <Budgets /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; */


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import './index.css';
import Budgets from "./pages/Budgets";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import InvoiceForm from "./components/InvoiceForm";
/* import InvoiceList from "./components/InvoiceList"; */
import InvoiceDetail from "./components/InvoiceDetail";
import Invoices from "./pages/Invoice";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={<PrivateRoute><Dashboard /></PrivateRoute>} 
          />
          <Route 
            path="/dashboard" 
            element={<PrivateRoute><Dashboard /></PrivateRoute>} 
          />
          <Route 
            path="/clients" 
            element={<PrivateRoute><Clients /></PrivateRoute>} 
          />
          <Route 
            path="/budgets" 
            element={<PrivateRoute><Budgets /></PrivateRoute>} 
          />
           <Route 
            path="/invoices" 
            element={<PrivateRoute><Invoices /></PrivateRoute>} 
          />
          <Route path="/invoices/new" element={<PrivateRoute><InvoiceForm /></PrivateRoute>} />
          <Route path="/invoices/:id" element={<PrivateRoute><InvoiceDetail /></PrivateRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
