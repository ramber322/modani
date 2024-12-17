import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  // States for events, selected event, feedback list, current page, filter options, etc.
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0); // Total number of events for pagination
  const [filter, setFilter] = useState({ title: '', event_year: '' }); // Filter state for title and year
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State to manage sliding panel visibility
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const mytoken = localStorage.getItem("token");

  const itemsPerPage = 5; // Number of events per page

  const navigate = useNavigate(); // Get navigate function from useNavigate

  // Fetch events for pagination
  const loadEvents = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events?page=${page}`, {
        headers: { 'Authorization': `Bearer ${mytoken}` }
      });

      if (!response.ok) {
        throw new Error('API request failed with status ' + response.status);
      }

      const data = await response.json();

      if (Array.isArray(data.events)) {
        setEvents(data.events);
        setTotalEvents(data.total); // Assuming the API provides the total count of events
        filterEvents(data.events, filter); // Apply the filter once events are loaded
      } else {
        console.error("Expected an array but got:", data.events);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filter to the events
  const filterEvents = (eventsList, filter) => {
    let filtered = eventsList;

    if (filter.title) {
      filtered = filtered.filter(event => event.title.toLowerCase().includes(filter.title.toLowerCase()));
    }

    if (filter.event_year) {
      // Extract year from event date (assuming event_date is in YYYY-MM-DD format)
      filtered = filtered.filter(event => new Date(event.event_date).getFullYear() === parseInt(filter.event_year));
    }

    setFilteredEvents(filtered);
  };

  // Fetch feedback for selected event
  const loadEventFeedback = async (eventId) => {
    if (!eventId) return; // If no event is selected, exit early

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/feedback`, {
        headers: { 'Authorization': `Bearer ${mytoken}` }
      });

      if (!response.ok) {
        throw new Error('API request failed with status ' + response.status);
      }

      const data = await response.json();

      // Check if feedback exists for the event
      if (data.feedback && Array.isArray(data.feedback) && data.feedback.length > 0) {
        setFeedbackList(data.feedback);
      } else {
        setFeedbackList([]);
      }
    } catch (error) {
      console.error("Error loading feedback:", error);
    }
  };

  // Handle event selection
  const handleEventSelection = (eventId) => {
    setSelectedEvent(eventId);
    loadEventFeedback(eventId); // Fetch feedback for the selected event
    setIsPanelOpen(true); // Open the sliding panel
  };

  // Close the sliding panel
  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedEvent('');
    setFeedbackList([]); // Clear feedback when closing
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page
    loadEvents(pageNumber); // Load events for the selected page
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => {
      const newFilter = { ...prev, [name]: value };
      filterEvents(events, newFilter); // Apply the filter immediately
      return newFilter;
    });
  };

  // Fetch events on component mount and when the page changes
  useEffect(() => {
    loadEvents(currentPage); // Load events for the current page
  }, [currentPage]);

  // Generate unique years from events for the year dropdown filter
  const generateYearOptions = () => {
    const years = events.map(event => new Date(event.event_date).getFullYear());
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a); // Sort years in descending order
    return uniqueYears;
  };

  const handleBackToDashboard = () => {
    navigate('/admindashboard'); // Redirect to dashboard
  };

  return (
    <div>
    <Header props = "admin" />
    <main className="container mx-auto mt-8 px-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Event Feedback</h1>

           {/* Button to go back to Dashboard */}
           <div className="text-left mb-4">
  <button 
    onClick={handleBackToDashboard} 
    className="bg-gray-700 text-white px-4 py-2 rounded-md"
  >
    Go to Dashboard
  </button>
</div>

      {/* Filter Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Events</h2>
        <div className="flex space-x-4">
          {/* Filter by Event Name */}
          <div className="flex-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={filter.title}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Filter by event name"
            />
          </div>

          {/* Filter by Event Year */}
          <div className="flex-1">
            <label htmlFor="event_year" className="block text-sm font-medium text-gray-700">Event Year:</label>
            <select
              id="event_year"
              name="event_year"
              value={filter.event_year}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Year</option>
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Event List (Paginated) */}
      <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event List</h2>
        <div>
          {isLoading ? (
            <p>Loading events...</p>
          ) : (
            <ul className="space-y-4">
              {filteredEvents.map((event) => (
                <li
                  key={event.id}
                  className={`cursor-pointer p-2 border border-gray-300 rounded-md ${selectedEvent === event.id ? 'bg-blue-100' : ''}`}
                  onClick={() => handleEventSelection(event.id)}
                >
                  {event.title} - {event.event_date}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(totalEvents / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Sliding Panel (Feedback) */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-96 p-4 h-full max-h-full overflow-y-auto transition-transform transform translate-x-0">
            <button onClick={closePanel} className="absolute top-4 right-4 text-gray-700">
              X
            </button>
            <h3 className="text-xl font-semibold mb-4">Feedbacks</h3>
            <div>
              {feedbackList.length > 0 ? (
                feedbackList.map((feedback, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Student: {feedback.student_name}</span>
                      <span className="text-yellow-500">{'⭐'.repeat(feedback.rating)}</span>
                    </div>
                    <p className="text-gray-600">{feedback.comment}</p>
                  </div>
                ))
              ) : (
                <p>No feedback available for this event.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
    </div>
  );
};

export default Feedback;
