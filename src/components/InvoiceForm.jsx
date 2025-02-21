import { useState } from "react";

function InvoiceForm({ addInvoice }) {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddInvoice = (e) => {
    e.preventDefault();
    const newInvoice = {
      clientName,
      amount,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    addInvoice(newInvoice);
    setClientName("");
    setAmount("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleAddInvoice} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Add Invoice</h2>
      <div>
        <label>Client Name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Add Invoice
      </button>
    </form>
  );
}

export default InvoiceForm;