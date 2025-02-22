/* import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import Navbar from "./components/Navbar";
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
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
        <Route path="/invoices" element={user ? <Invoices /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; */
/* import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import InvoicePage from "./pages/InvoicePage";
import Navbar from "./components/Navbar";
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
        <Route path="/invoices" element={user ? <Invoices /> : <Navigate to="/login" />} />
        <Route path="/invoice/:id" element={user ? <InvoicePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; */
// ultimo codigo funcional antes de cambiar a mongodb
/* import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import InvoicePage from "./pages/InvoicePage";
import Navbar from "./components/Navbar";
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
        <Route path="/invoices" element={user ? <Invoices /> : <Navigate to="/login" />} />
        <Route path="/invoice/:id" element={user ? <InvoicePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; */



import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import InvoicePage from "./pages/InvoicePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import './index.css';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
        <Route path="/invoices" element={user ? <Invoices /> : <Navigate to="/login" />} />
        <Route path="/invoice/:id" element={user ? <InvoicePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
