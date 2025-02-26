/* import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { FaHome, FaUserFriends, FaFileInvoiceDollar, FaSignOutAlt } from 'react-icons/fa';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-link"><FaHome /> Inicio</Link>
      <Link to="/clients" className="nav-link"><FaUserFriends /> Clientes</Link>
      <Link to="/invoices" className="nav-link"><FaFileInvoiceDollar /> Facturas</Link>
      {user && (
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar; */
/* import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserFriends, FaFileInvoiceDollar, FaSignOutAlt } from 'react-icons/fa';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav>
      <div className="navbar">
        <Link to="/dashboard" className="text-white flex items-center"><FaHome className="mr-1" /> Dashboard</Link>
      </div>
      {user && (
        <button onClick={handleLogout} className="text-white flex items-center">
          <FaSignOutAlt className="mr-1" /> Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar; */
/* import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar({ user }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/dashboard" className="text-white flex items-center mr-4">
          <FaHome className="mr-1" /> Dashboard
        </Link>
      </div>
      {user && (
        <div className="flex items-center">
          <span className="mr-4">Hola, {user.username}</span>
          <button onClick={handleLogout} className="text-white flex items-center bg-red-500 p-2 rounded">
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar; */
/* import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/dashboard" className="text-white flex items-center mr-4">
          <FaHome className="mr-1" /> Dashboard
        </Link>
      </div>
      {isAuthenticated && (
        <div className="flex items-center">
          <button onClick={handleLogout} className="text-white flex items-center  p-2 rounded">
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar; */
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/dashboard" className="text-white flex items-center mr-4">
          <FaHome className="mr-1" /> Dashboard
        </Link>
      </div>
      {isAuthenticated && (
        <div className="flex items-center">
          <button onClick={handleLogout} className="text-white flex items-center bg-red-500 p-2 rounded">
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;