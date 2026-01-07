import React, { useState } from 'react';  // React + state tools
import './Register.css';

const Register = ({ onSuccess }) => {     // Gets "go to login" function from App
  // 5 input boxes (empty at start)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");         // Error message box
  const [success, setSuccess] = useState(false);  // Success tick mark

  // Check if email is valid (has @ and .)
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // Check if phone is exactly 10 digits
  const validatePhone = (phone) => phone.length === 10 && /^\d+$/.test(phone);

  // When form submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page refresh
    setError("");       // Clear old errors

    // 14. CHECK EVERYTHING (like exam checking)
    if (!name.trim()) return setError("Name is required");
    if (!validateEmail(email)) return setError("Enter valid email");
    if (!validatePhone(phone)) return setError("Phone must be 10 digits");
    if (password.length < 6) return setError("Password must be 6+ characters");
    if (password !== confirmPassword) return setError("Passwords don't match");

    // 15. Check if email already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      return setError("User already exists");
    }

    // 16. SAVE NEW USER
    const user = { name, email, phone, password, role: 'user' };
    users.push(user);                           // Add to users list
    localStorage.setItem('users', JSON.stringify(users)); // Save to browser
    setSuccess(true);                           // Show success
    setTimeout(() => onSuccess(), 1500);        // Go to login after 1.5 sec
  };

  // 17. SHOW FORM OR SUCCESS
  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <h1>EventPlanner</h1>
          <p>Create your account</p>
        </div>

        {/* SUCCESS SCREEN */}
        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p className="success-text">Registration Successful!</p>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 10))}  // Max 10 digits
                maxLength="10"
                placeholder="10 digits only"
                required
              />
              <small>Enter exactly 10 digits</small>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <button type="submit" className="primary-btn">Register</button>
          </form>
        )}

        {/* Go to Login link */}
        <p className="login-link">
          Already have an account? 
          <button type="button" onClick={() => onSuccess()} className="link-btn">Login here</button>
        </p>
      </div>
    </div>
  );
};

export default Register;


// ✅ 6 VALIDATIONS: Name, Email, Phone(10 digits), Password
// ✅ CHECKS: Duplicate email  
// ✅ SAVES: localStorage.users array
// ✅ FLOWS: Form → Success → Login page
