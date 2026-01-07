import React, { useState, useEffect } from 'react';
import './EventPlanner.css';

const EventPlanner = ({ userData, onLogout }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(savedEvents);
  }, []);

  const handleBooking = (eventId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = {
      id: Date.now(),
      userEmail: userData.email,
      eventId,
      timestamp: new Date().toISOString()
    };
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Event booked successfully!');
  };

  return (
    <div className="event-planner-container">
      <header className="hero-header">
        <div className="hero-content">
          <h1>Welcome to Event Planner</h1>
          <p>Plan and organize your events effortlessly. From birthdays to corporate meetings, we have got you covered.</p>
          <div className="user-welcome">
            <span>Hello, {userData.name}!</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <section className="description-section">
        <div className="section-content">
          <p>Plan and organize your events effortlessly with Event Planner. From birthdays to corporate meetings, we have got you covered with beautiful templates and seamless management.</p>
          <button className="get-started-btn">Get Started</button>
        </div>
      </section>

      <section className="events-categories">
        <div className="categories-grid">
          <div className="category-card">
            <h2>Social Events</h2>
            <ul>
              <li>Birthday parties</li>
              <li>Anniversary celebrations</li>
              <li>Wedding receptions</li>
              <li>Baby showers</li>
              <li>Graduation parties</li>
              <li>Family reunions</li>
            </ul>
          </div>

          <div className="category-card">
            <h2>Entertainment Events</h2>
            <ul>
              <li>Concerts</li>
              <li>Music festivals</li>
              <li>Film screenings</li>
              <li>Comedy shows</li>
              <li>Art exhibitions</li>
              <li>Cultural events</li>
            </ul>
          </div>

          <div className="category-card">
            <h2>Community Events</h2>
            <ul>
              <li>Fundraising events</li>
              <li>Charity galas</li>
              <li>Volunteer drives</li>
              <li>Neighborhood block parties</li>
              <li>Community festivals</li>
              <li>Cultural celebrations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-content">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Easy Event Creation</h3>
              <p>Create events in minutes with our intuitive interface</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <h3>Guest Management</h3>
              <p>Manage guest lists and send invitations effortlessly</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔔</div>
              <h3>Real-time Updates</h3>
              <p>Get instant notifications and updates on your events</p>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="section-content">
          <h2>Available Events</h2>
          <div className="events-grid">
            {events.length === 0 ? (
              <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666', fontSize: '18px' }}>
                No events available. Admin needs to add events first.
              </p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-image">🎉</div>
                  <div className="event-details">
                    <h3>{event.name}</h3>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <button onClick={() => handleBooking(event.id)} className="book-btn">
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-content">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Event Planner made organizing my wedding a breeze. Highly recommended!"</p>
              <p className="author">- Emily Johnson</p>
            </div>
            <div className="testimonial-card">
              <p>"I use Event Planner for all my corporate events. It saves me so much time and effort!"</p>
              <p className="author">- John Smith</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-content">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EventPlanner;
// ✅ SHOWS: Events created by admin
// ✅ BOOK: Click → Save to localStorage.bookings  
// ✅ PERSONAL: "Welcome, {userData.name}"
// ✅ SECTIONS: Hero, Features, Events, Testimonials
