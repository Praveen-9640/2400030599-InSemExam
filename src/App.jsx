import React from 'react';
import Calendar from './Calendar';
import Calendar from "./Calendar";

// Predefined array of events (Date format: YYYY-MM-DD)
// **NOTE**: Adjust these dates to the *current* month/year for testing!
const SAMPLE_EVENTS = [
  { date: '2025-10-05', title: 'Project Deadline', description: 'Submit final React project.' },
  { date: '2025-10-15', title: 'Team Meeting', description: 'Review Q4 strategy and roadmap.' },
  { date: '2025-10-15', title: 'Dentist Appointment', description: 'Annual check-up at 3:00 PM.' },
  { date: '2025-10-28', title: 'Birthday Party', description: 'Celebration for Sarah.' },
];

function App() {
  return (
    <div className="App">
      <Calendar events={SAMPLE_EVENTS} />
    </div>
  );
}

export default App;