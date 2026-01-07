import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ userData, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', password: '' });
  const [loginHistory, setLoginHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const savedLoginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    
    setUsers(savedUsers);
    setEvents(savedEvents);
    setBookings(savedBookings);
    setLoginHistory(savedLoginHistory);
  };

  // Track admin login
  useEffect(() => {
    if (userData && userData.role === 'admin') {
      const loginRecord = {
        id: Date.now(),
        userEmail: userData.email,
        userName: userData.name,
        role: 'admin',
        timestamp: new Date().toISOString(),
        ip: 'admin-local'
      };
      const history = JSON.parse(localStorage.getItem('loginHistory') || '[]');
      history.unshift(loginRecord); // Add to beginning
      localStorage.setItem('loginHistory', JSON.stringify(history.slice(0, 100))); // Keep last 100
    }
  }, [userData]);

  // USER CRUD OPERATIONS
  const deleteUser = (email) => {
    if (confirm(`Delete user ${email}?`)) {
      const updatedUsers = users.filter(u => u.email !== email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const saveUserEdit = (updatedUser) => {
    const updatedUsers = users.map(u => 
      u.email === updatedUser.email ? { ...updatedUser, role: 'user' } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const createUser = (e) => {
    e.preventDefault();
    const user = { ...newUser, role: 'user' };
    const updatedUsers = [...users, user];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ name: '', email: '', phone: '', password: '' });
  };

  // EVENT CRUD OPERATIONS
  const deleteEvent = (eventId) => {
    if (confirm('Delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== eventId);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);
  };

  const saveEventEdit = (updatedEvent) => {
    const updatedEvents = events.map(e => 
      e.id === updatedEvent.id ? updatedEvent : e
    );
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const addEvent = (e) => {
    e.preventDefault();
    const eventData = { ...newEvent, id: Date.now() };
    const updatedEvents = [...events, eventData];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    setNewEvent({ name: '', date: '', venue: '' });
  };

  // BOOKINGS OPERATIONS
  const deleteBooking = (bookingId) => {
    if (confirm('Delete this booking?')) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-user">
            <span>Welcome, {userData.name}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        {/* TABS */}
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events ({events.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings ({bookings.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'logins' ? 'active' : ''}`}
            onClick={() => setActiveTab('logins')}
          >
            Login History ({loginHistory.length})
          </button>
        </div>

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="panel users-panel">
            <h2>User Management</h2>
            
            {/* CREATE USER FORM */}
            <div className="create-user-form">
              <h3>Create New User</h3>
              <form onSubmit={createUser} className="form-grid">
                <input
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone (10 digits)"
                  value={newUser.phone}
                  maxLength="10"
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value.slice(0,10)})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                />
                <button type="submit" className="create-btn">Create User</button>
              </form>
            </div>

            {/* EDIT USER FORM */}
            {editingUser && (
              <div className="edit-form">
                <h3>Edit User: {editingUser.email}</h3>
                <div className="edit-controls">
                  <input
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    placeholder="Name"
                  />
                  <input
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    placeholder="Phone"
                  />
                  <button onClick={() => saveUserEdit(editingUser)} className="save-btn">Save</button>
                  <button onClick={() => setEditingUser(null)} className="cancel-btn">Cancel</button>
                </div>
              </div>
            )}

            {/* USERS LIST */}
            <div className="users-list">
              {users.map((user) => (
                <div key={user.email} className="user-item">
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                    <p className="user-phone">{user.phone}</p>
                    <p className="user-role">Role: {user.role}</p>
                  </div>
                  <div className="user-actions">
                    <button onClick={() => editUser(user)} className="edit-btn">Edit</button>
                    <button onClick={() => deleteUser(user.email)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="panel events-panel">
            <h2>Event Management</h2>
            
            {/* ADD EVENT FORM */}
            <form onSubmit={addEvent} className="event-form">
              <input
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                required
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                required
              />
              <input
                placeholder="Venue"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                required
              />
              <button type="submit" className="add-event-btn">Add Event</button>
            </form>

            {/* EDIT EVENT FORM */}
            {editingEvent && (
              <div className="edit-form">
                <h3>Edit Event</h3>
                <div className="edit-controls">
                  <input
                    value={editingEvent.name}
                    onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value})}
                    placeholder="Event Name"
                  />
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  />
                  <input
                    value={editingEvent.venue}
                    onChange={(e) => setEditingEvent({...editingEvent, venue: e.target.value})}
                    placeholder="Venue"
                  />
                  <button onClick={() => saveEventEdit(editingEvent)} className="save-btn">Save</button>
                  <button onClick={() => setEditingEvent(null)} className="cancel-btn">Cancel</button>
                </div>
              </div>
            )}

            {/* EVENTS LIST */}
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p>Date: {event.date}</p>
                    <p>Venue: {event.venue}</p>
                  </div>
                  <div className="event-actions">
                    <button onClick={() => editEvent(event)} className="edit-btn">Edit</button>
                    <button onClick={() => deleteEvent(event.id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="panel bookings-panel">
            <h2>User Bookings</h2>
            <div className="bookings-list">
              {bookings.map((booking) => {
                const event = events.find(e => e.id === booking.eventId);
                const user = users.find(u => u.email === booking.userEmail);
                return (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-info">
                      <p><strong>User:</strong> {user ? user.name : booking.userEmail}</p>
                      <p><strong>Event:</strong> {event ? event.name : 'Event deleted'}</p>
                      <p><strong>Booked:</strong> {new Date(booking.timestamp).toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteBooking(booking.id)} className="delete-btn">Delete</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LOGIN HISTORY TAB */}
        {activeTab === 'logins' && (
          <div className="panel logins-panel">
            <h2>Login History</h2>
            <div className="logins-list">
              {loginHistory.map((login) => (
                <div key={login.id} className="login-item">
                  <div className="login-info">
                    <p className="login-user">{login.userName} ({login.userEmail})</p>
                    <p className="login-role">Role: <span className={`role-badge ${login.role}`}>{login.role}</span></p>
                    <p className="login-time">{new Date(login.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// ✅ 4 TABS: Users(CRUD) | Events(CRUD) | Bookings | Login History
// ✅ FULL CRUD: Create, Read, Update, Delete  
// ✅ TRACKS: Every login (admin + users)
// ✅ SEES: All user bookings
