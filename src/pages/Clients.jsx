import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";

function Clients() {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const clientsCollection = collection(db, "clients");
    const clientSnapshot = await getDocs(clientsCollection);
    const clientList = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setClients(clientList);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-4">Clients</h1>
      <ClientForm fetchClients={fetchClients} />
      <ClientList clients={clients} />
    </div>
  );
}

export default Clients;
