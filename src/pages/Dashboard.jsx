import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <Link to="/clients" className="text-blue-500">Manage Clients</Link>
      </div>
    </div>
  );
}

export default Dashboard;