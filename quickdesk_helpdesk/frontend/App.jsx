import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateTicket from "./components/CreateTicket";
import TicketList from "./components/TicketList";

const App = () => {
  const [user, setUser] = useState(null); // {user_id, role}

  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Welcome to QuickDesk</h2>
        <Register onRegister={setUser} />
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user.username} ({user.role})</h2>
      <CreateTicket user={user} />
      <TicketList />
    </div>
  );
};

export default App;
