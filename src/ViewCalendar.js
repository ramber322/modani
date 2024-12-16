import React, { useState, useEffect } from 'react';
import Header from "./components/Header"
function ViewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const token = localStorage.getItem('token'); 

  
  const registerForEvent = async (eventId, eventTitle) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ event_id: eventId }), // Include the payload
        }
      );
  
      // Check for errors in the response
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error response:", response.status, errorMessage);
        alert("Error registering for event. Please check the console.");
        return;
      }
  
      // Parse the JSON response if the status is OK
      const data = await response.json();
      if (data.success) {
        alert(`Registered for "${eventTitle}"!`);
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("An error occurred during registration.");
    }
  };
  
  // Fetch events from the API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events/fetchEvents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setEvents(data.events);
        } else {
          console.error('Failed to fetch events:', data.message);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, [token]);

  // Render calendar
  
  const renderCalendar = () => {
    const calendarGrid = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    // Fill empty cells at the beginning of the calendar
    const offset = startDay === 0 ? 6 : startDay - 1;
    for (let i = 0; i < offset; i++) {
      calendarGrid.push(<div key={`empty-${i}`} className="h-20 border rounded-lg"></div>);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.event_date === dateStr);

      calendarGrid.push(
        <div
          key={day}
          className={`h-20 border rounded-lg flex items-center justify-center text-xl relative ${
            dayEvents.length > 0 ? 'bg-green-400 cursor-pointer' : ''
          }`}
          onClick={() => {
            if (dayEvents.length > 0) {
              setSelectedDayEvents(dayEvents);
              setModalVisible(true);
            }
          }}
        >
          {day}
        </div>
      );
    }

    return calendarGrid;
  }; //sdsa

  // Navigate months
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <>
    <Header/>
    <main className="container mx-auto mt-8 px-4 ">
    <section className="mt-8">
    <div className="flex items-center justify-between mb-4">
      <button onClick={handlePrevMonth} className="text-xl p-2 bg-gray-200 rounded hover:bg-gray-300">
        ←
      </button>
      <h3 className="text-lg font-semibold">
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h3>
      <button onClick={handleNextMonth} className="text-xl p-2 bg-gray-200 rounded hover:bg-gray-300">
        →
      </button>
    </div>
    
    {/* Header Days of the Week */}
    <div className="calendar-grid grid grid-cols-7 text-center mb-4">
      <div className="font-bold">M</div>
      <div className="font-bold">T</div>
      <div className="font-bold">W</div>
      <div className="font-bold">T</div>
      <div className="font-bold">F</div>
      <div className="font-bold">S</div>
      <div className="font-bold">SU</div>
    </div>

    {/* Calendar days */}
    <div className="calendar-grid grid grid-cols-7 mt-4">{renderCalendar()}</div>
  </section>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold">Events on {selectedDayEvents[0].event_date}</h2>
            <div>
              {selectedDayEvents.map(event => (
                <div key={event.id} className="mb-4">
                  <p><strong>{event.title}</strong></p>
                  <p>Time: {event.event_time}</p>
                  <p>Location: {event.location}</p>
                  <p>{event.description}</p>
                  <button
                    onClick={() => registerForEvent(event.id, event.title)}
                    className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
    </>
  );
}

export default ViewCalendar;
