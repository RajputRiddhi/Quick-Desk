import React, { useEffect, useState } from "react";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tickets/")
      .then(res => res.json())
      .then(setTickets);
  }, []);

  return (
    <div>
      <h3>All Tickets</h3>
      {tickets.map(ticket => (
        <div key={ticket.id} style={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}>
          <strong>{ticket.subject}</strong> ({ticket.status})<br />
          Category: {ticket.category}<br />
          <small>{ticket.description}</small>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
