import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { fetchTickets } from './services/api';
import './index.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();

      const usersMap = data.users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});

      const enrichedTickets = data.tickets.map(ticket => ({
        ...ticket,
        userName: usersMap[ticket.userId] || 'Unknown User',
      }));

      setTickets(enrichedTickets);
    };

    getTickets();
  }, []);

  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedSorting = localStorage.getItem('sorting');
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  const handleGroupingChange = (e) => setGrouping(e.target.value);
  const handleSortingChange = (e) => setSorting(e.target.value);

  return (
    <div className="app">
      <div className="controls">
        <select onChange={handleGroupingChange} value={grouping}>
          <option value="status">Group by Status</option>
          <option value="user">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>
        <select onChange={handleSortingChange} value={sorting}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <KanbanBoard tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
}

export default App;