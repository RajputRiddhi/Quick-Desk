import React, { useState } from "react";

const CreateTicket = ({ user }) => {
  const [form, setForm] = useState({ subject: "", description: "", category: "" });

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/tickets/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Ticket submitted");
      setForm({ subject: "", description: "", category: "" });
    } else {
      alert("Failed to submit ticket");
    }
  };

  return (
    <div>
      <h3>Create Ticket</h3>
      <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateTicket;
