import React, { useEffect, useState } from 'react';
import { getTickets } from '../services/api';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();
      setTickets(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="border p-2">
              <strong>{ticket.title}</strong>
              <p>{ticket.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
