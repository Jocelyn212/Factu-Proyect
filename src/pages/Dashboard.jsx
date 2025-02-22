import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/clients" className="text-blue-500">Manage Clients</Link>
          <Link to="/invoices" className="text-blue-500">Manage Invoices</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;