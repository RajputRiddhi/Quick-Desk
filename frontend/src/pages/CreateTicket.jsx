import React, { useState } from 'react';
import { createTicket } from '../services/api';

const CreateTicket = () => {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(form);
    alert('Ticket created successfully!');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl mb-4">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicket;
