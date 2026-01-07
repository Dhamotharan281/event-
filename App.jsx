import React, { useState, useEffect } from 'react';  // 1. Import React tools
import Login from './components/Login';              // 2. Import Login page
import Register from './components/Register';        // 3. Import Register page  
import AdminDashboard from './components/AdminDashboard'; // 4. Import Admin page
import EventPlanner from './components/EventPlanner';     // 5. Import User page
import Footer from './components/Footer';                 // 6. Import Footer

function App() {  // 7. Main App function (like main door)
  // 8. These 3 boxes remember what page to show & who logged in
  const [currentPage, setCurrentPage] = useState('register');     // Which page?
  const [userType, setUserType] = useState(null);                 // Admin or User?
  const [userData, setUserData] = useState(null);                 // User details?

  // 9. When app starts, check if someone already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');  // Get saved user
    if (savedUser) {                                        // If found
      const parsedUser = JSON.parse(savedUser);             // Read details
      setUserType(parsedUser.role);                         // Admin/User
      setUserData(parsedUser);                              // Save details
      setCurrentPage(parsedUser.role === 'admin' ? 'admin' : 'event-planner');
      // Show admin page OR user event page
    }
  }, []); // Empty [] = run only once when app starts
//-------------------------------------------------------------------------------------------------------------------------

// This part does 3 big jobs:
// Handles LOGIN
// Handles LOGOUT
// Decides WHICH PAGE to show
// Login won’t work
// Admin/User separation won’t work
// Page switching won’t work


// handle Login
// Login successful
//    ↓
// Save role
//    ↓
// Save user details
//    ↓
// Decide page
//    ↓
// Save session in browser


  // 10. When someone logs in successfully
  const handleLogin = (type, data) => {
    setUserType(type);                    // Remember: admin/user
    setUserData(data);                    // Save user details
    setCurrentPage(type === 'admin' ? 'admin' : 'event-planner'); // Show right page
    localStorage.setItem('currentUser', JSON.stringify(data));    // Save in browser
  };

  // 11. When logout


  const handleLogout = () => {
    setUserType(null);        // Forget user type
    setUserData(null);        // Forget user details
    setCurrentPage('register'); // Go back to register page
    localStorage.removeItem('currentUser'); // Delete from browser
  };

  // 12. MAIN DISPLAY - Show ONE page at a time
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {currentPage === 'register' && (      // If register page
        <Register onSuccess={() => setCurrentPage('login')} />
      )}
      {currentPage === 'login' && (         // If login page
        <Login onLogin={handleLogin} onBack={() => setCurrentPage('register')} />
      )}
      {currentPage === 'admin' && userType === 'admin' && (  // Admin only
        <AdminDashboard userData={userData} onLogout={handleLogout} />
      )}
      {currentPage === 'event-planner' && userType === 'user' && ( // User only
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <EventPlanner userData={userData} onLogout={handleLogout} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;  // 13. Send App to main.jsx


// Line-by-Line Explanation:

// Line 1-5: Import React hooks and components

// Line 7-12: State variables:

// currentPage: Controls which page to show ('register', 'login', 'admin', 'event-planner')

// userType: 'admin' or 'user'

// userData: Current logged-in user details

// Line 14-21: useEffect checks localStorage for saved user session on app load

// Line 23-27: handleLogin - Sets user session and navigates to appropriate dashboard

// Line 29-31: handleLogout - Clears session and returns to register

// Line 33-55: Conditional rendering based on currentPage and userType