function ClientList({ clients }) {
    return (
      <div className="mt-6">
        <h2 className="text-2xl mb-4">Client List</h2>
        <ul className="bg-white p-6 rounded shadow-md">
          {clients.map(client => (
            <li key={client.id} className="border-b last:border-b-0 p-4">
              <p><strong>Name:</strong> {client.name}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone:</strong> {client.phone}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ClientList;