import React, { useState, useEffect } from "react";
import Header from "./components/Header";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upcomingErrorMessage, setUpcomingErrorMessage] = useState("");
  const [registeredErrorMessage, setRegisteredErrorMessage] = useState("");

  // Open and close modal
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Fetch upcoming events
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/events/upcomingEvents", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.events.length > 0) {
            setUpcomingEvents(data.events);
            setUpcomingErrorMessage("");
          } else {
            setUpcomingEvents([]);
            setUpcomingErrorMessage("No upcoming events found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching upcoming events:", error);
          setUpcomingEvents([]);
          setUpcomingErrorMessage("Failed to fetch upcoming events.");
        });
    }
  }, []); // Empty dependency array ensures this runs once after mount

  // Fetch registered events
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/events/registeredEvents", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.events.length > 0) {
            setRegisteredEvents(data.events);
            setRegisteredErrorMessage("");
          } else {
            setRegisteredEvents([]);
            setRegisteredErrorMessage("You have not registered for any events.");
          }
        })
        .catch((error) => {
          console.error("Error fetching registered events:", error);
          setRegisteredEvents([]);
          setRegisteredErrorMessage("Failed to fetch registered events.");
        });
    }
  }, []); // Empty dependency array ensures this runs once after mount

  // Register for an event
  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ event_id: eventId })
      });
  
      const data = await response.json();
      if (data.success) {
        alert("Registered successfully!");
        closeModal();  // Close modal after successful registration
  
        // Optimistically update the registered events
        const registeredEvent = {
          id: eventId,
          title: selectedEvent.title, // Assuming you have selectedEvent with the event data
          event_date: selectedEvent.event_date,
          event_time: selectedEvent.event_time,
          location: selectedEvent.location,
          description: selectedEvent.description
          
        };
  
        // Add the newly registered event to the list
        setRegisteredEvents((prevEvents) => [...prevEvents, registeredEvent]);
      } else {
        alert('Registration failed: ' + data.message);
      }
    }
  };

  return (
    <div>
      <Header props="user" />

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold">Welcome to your dashboard!</h2>
        <p className="mt-2 text-gray-700">Manage your profile, settings, and event preferences.</p>

        {/* Modal */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <p><strong>Time:</strong> {selectedEvent.event_time}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Date:</strong> {selectedEvent.event_date}</p>
              <button
                onClick={() => handleRegister(selectedEvent.id)}
                className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
              >
                Register
              </button>
              <button
                onClick={closeModal}
                className="mt-2 ml-2 bg-red-500 text-white py-1 px-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Upcoming Events Section */}
        <section className="bg-blue-500 text-white rounded-lg p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">UPCOMING EVENTS</h3>
              <p className="text-sm">NEXT 30 DAYS</p>
            </div>
          </div>
          <div className="mt-4">
            {upcomingEvents.length === 0 && upcomingErrorMessage && (
              <div>{upcomingErrorMessage}</div>  // Display error for upcoming events
            )}
            {upcomingEvents.length > 0 && upcomingEvents.map((event) => {

              return (
                <div key={event.id} className="flex items-center justify-between mt-2 bg-white text-blue-500 rounded-lg p-3">
                  <span className="bg-blue-500 text-white rounded-full px-3 py-1 font-semibold text-lg">{event.id}</span>
                  <span className="flex-1 ml-3 font-semibold">{event.title}</span>
                  <button
                    className="text-blue-400 text-sm"
                    onClick={() => openModal(event)}  // Open the modal with event details
                  >
                    Quick View
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Registered Events Section */}
        <section className="bg-green-500 text-white rounded-lg p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">REGISTERED EVENTS</h3>
              <p className="text-sm">Events You've Signed Up For</p>
            </div>
          </div>
          <div className="mt-4">
            {registeredEvents.length === 0 && registeredErrorMessage && (
              <div>{registeredErrorMessage}</div>  // Display error for registered events
            )}
            {registeredEvents.length > 0 && registeredEvents.map((event) => {
              const eventDate = new Date(event.event_date);
              const options = { month: 'short', day: 'numeric' };
              const formattedDate = eventDate.toLocaleDateString('en-US', options).toUpperCase();

              return (
                <div key={event.id} className="flex items-center justify-between mt-2 bg-white text-green-500 rounded-lg p-3">
                  <span className="bg-green-500 text-white rounded-full px-3 py-1 font-semibold text-lg">{event.id}</span>
                  <span className="flex-1 ml-3 font-semibold">{event.title}</span>
                  <span className="text-green-400 text-sm">{formattedDate}</span> {/* Display formatted date */}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
