import React, { useState, useEffect } from "react";
import Header from "../components/Header";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setUpcomingErrorMessage] = useState("");
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
    }, []); // Empty dependency array ensures this runs once aft

  
  return (
    <div>
      <Header props = "admin" />

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold">Welcome Admin!</h2>

        {/* Modal */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <p><strong>Time:</strong> {selectedEvent.event_time}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Date:</strong> {selectedEvent.event_date}</p>
             
              <div className="flex justify-end">
  <button
    onClick={closeModal}
    className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
  >
    Close
  </button>
</div>
            </div>
          </div>
        )}

        {/* Upcoming Events Section */}
        <section className="bg-yellow-500 text-white rounded-lg p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">UPCOMING EVENTS</h3>
              <p className="text-sm">NEXT 30 DAYS</p>
            </div>
          </div>
          <div className="mt-4">
            {errorMessage ? (
              <div>{errorMessage}</div>
            ) : (
              <div>
                {upcomingEvents.map((event) => {
                 
                  return (
                    <div key={event.id} className="flex items-center justify-between mt-2 bg-white text-black rounded-lg p-3">

                      <span className="flex-1 ml-3 font-semibold">{event.title}</span>
                      <button
                        className="text-blue-400 text-sm"
                        onClick={() => openModal(event)}  // Open the modal with event details
                      >
                        Details
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
