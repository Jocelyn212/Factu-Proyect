function InvoiceList({ invoices }) {
    return (
      <div className="mt-6">
        <h2 className="text-2xl mb-4">Invoice List</h2>
        <ul className="bg-white p-6 rounded shadow-md">
          {invoices.map(invoice => (
            <li key={invoice.id} className="border-b last:border-b-0 p-4">
              <p><strong>Client Name:</strong> {invoice.clientName}</p>
              <p><strong>Amount:</strong> {invoice.amount}</p>
              <p><strong>Due Date:</strong> {invoice.dueDate}</p>
              <p><strong>Created At:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default InvoiceList;