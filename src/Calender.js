import React, { useState } from 'react';
import './Calendar.css'; // Don't forget to create a basic CSS file!

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the day of the week for the first day of the month (0=Sun, 1=Mon, etc.)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const Calendar = ({ events }) => {
  // Use a Date object for the current month/year
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // 1. Use useState to store the selected date
  const [selectedDate, setSelectedDate] = useState(null); // Stores a string like '2025-10-15'

  // --- Calendar Grid Generation ---
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const renderDays = () => {
    const days = [];
    
    // Add empty cells for the preceding days of the week (padding)
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Format date as YYYY-MM-DD (e.g., '2025-10-15') to match event data format
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Check if this date has events
      const hasEvents = events.some(event => event.date === dateString);
      
      // Determine CSS classes for styling
      let dayClasses = "calendar-day";
      if (selectedDate === dateString) {
        dayClasses += " selected"; // Highlight selected date
      }
      if (hasEvents) {
        dayClasses += " has-event"; // Visual indicator for events
      }

      days.push(
        <div 
          key={day} 
          className={dayClasses} 
          onClick={() => setSelectedDate(dateString)} // 2. Handle click to set selected date
        >
          {day}
          {hasEvents && <div className="event-dot"></div>}
        </div>
      );
    }

    return days;
  };

  // --- Event Display Logic ---

  // Get events for the currently selected date
  const selectedEvents = events.filter(event => event.date === selectedDate);

  return (
    <div className="calendar-container">
      <h2>Interactive Calendar - {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
        {renderDays()}
      </div>

      {/* 3. Display event details below */}
      <div className="event-display">
        {selectedDate ? (
          <>
            <h3>Events for {new Date(selectedDate).toDateString()}</h3>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <div key={index} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))
            ) : (
              <p>No events scheduled for this date.</p>
            )}
          </>
        ) : (
          <p>Click on a date to view events.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;