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
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/clients" className="text-white flex items-center"><FaUserFriends className="mr-1" /> Clients</Link>
        {/* <Link to="/invoices" className="text-white flex items-center"><FaFileInvoiceDollar className="mr-1" /> Invoices</Link> */}
      </div>
      {user && (
        <button onClick={handleLogout} className="text-white flex items-center">
          <FaSignOutAlt className="mr-1" /> Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;