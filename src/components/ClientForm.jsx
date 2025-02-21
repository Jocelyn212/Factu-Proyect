import { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

function ClientForm({ fetchClients }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "clients"), {
        name,
        email,
        phone,
      });
      setName("");
      setEmail("");
      setPhone("");
      fetchClients();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAddClient} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Add Client</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Add Client
      </button>
    </form>
  );
}

export default ClientForm;