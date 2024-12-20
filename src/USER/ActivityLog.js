import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import arrowIcon from "../images/arrow-icon.png"
import Header from "../components/Header"; // Assuming you already have the Header component

function ActivityLog() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null); // To store the selected rating
  const [comment, setComment] = useState(""); // To store the feedback comment
  const navigate = useNavigate();
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Fetch registered events for the logged-in user
    const loadUserEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/events/registeredEvents", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("API request failed with status " + response.status);
        const data = await response.json();
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.error("Expected an array but got:", data.events);
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserEvents();
  }, []);

 
  
  const handleFeedbackSubmit = async (eventId, feedbackData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        const updatedEvents = events.map(event =>
          event.id === eventId ? { ...event, feedback: feedbackData } : event
        );
        setEvents(updatedEvents);
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <Header props = "user" />
     
      <main className="container mx-auto mt-8 px-4">
      <button 
  onClick={handleBackToDashboard}
  className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center" // Added flex and items-center
>
  <img
    style={{ width: '24px', height: '22px', marginRight: '6px', transform: 'scaleX(-1)', color: 'white' }} // Adjusted size and added margin
    src={arrowIcon}
    alt="arrow"
  />
  Dashboard
</button>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Activity Log</h1>

        {/* Registered Events Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-700">Event: {event.title}</span>
                    <span className="text-sm text-gray-600 block">Date: {event.event_date}</span>
                  </div>
                  <div className={`text-sm ${event.status === "Attended" ? "text-blue-600" : "text-yellow-600"}`}>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>

                {/* Feedback Button */}
                <button
                  onClick={() => {
                    const feedbackForm = document.getElementById(`feedback-form-${event.id}`);
                    feedbackForm.classList.toggle("hidden");
                  }}
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                  Leave a Feedback
                </button>

                {/* Rating and Feedback Form (Initially Hidden) */}
                <div id={`feedback-form-${event.id}`} className="feedback-form mt-4 space-y-2 hidden">
                  <label className="block text-gray-700 font-medium">Your Rating:</label>
                  <div className="flex space-x-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        className={`star hover:text-yellow-600 ${rating === num ? "text-yellow-600" : ""}`}
                        onClick={() => setRating(num)} // Set the selected rating
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} // Handle comment changes
                    className="mt-2 w-full border-gray-300 rounded-lg p-2"
                    placeholder="Leave your feedback here..."
                  />
                  <button
                    onClick={() => handleFeedbackSubmit(event.id, { rating, comment })}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-700"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

     </div>
  );
}

export default ActivityLog;
