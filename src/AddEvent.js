import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    event_date: '',
    event_time: '',
    location: '',
    description: ''
  });

  const [error, setError] = useState(null);
  const mytoken = localStorage.getItem("token");

  const navigate = useNavigate(); // Get navigate function from useNavigate

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mytoken) {
      alert('No token found. Please log in.');
      return;
    }

    const { title, event_date, event_time, location, description } = formData;

    const data = {
      title,
      event_date,
      event_time,
      location,
      description
    };

    try {
      const response = await fetch('http://localhost:8000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mytoken}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Event created successfully:\n' + JSON.stringify(result));
        // After successful event creation, navigate back to the dashboard
        navigate('/dashboard'); // This will redirect to the dashboard
      } else {
        if (response.status === 422) {
          alert('Validation errors:\n' + JSON.stringify(result.errors));
        } else {
          alert('Error creating event:\n' + JSON.stringify(result));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  // Navigate back to the dashboard manually when the button is clicked
  const handleBackToDashboard = () => {
    navigate('/admindashboard'); // Redirect to dashboard
  };

  return (
    <div>
      <Header props="admin" />
      <main className="container mx-auto mt-8 px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
           {/* Button to go back to Dashboard */}
           <div className="text-center mb-4">
            <button 
              onClick={handleBackToDashboard} 
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Go to Dashboard
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">Create Event</h2>
          
         
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Name:
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">
                Event Date:
              </label>
              <input
                type="date"
                id="event_date"
                value={formData.event_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="event_time" className="block text-sm font-medium text-gray-700">
                Event Time:
              </label>
              <input
                type="time"
                id="event_time"
                value={formData.event_time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Venue:
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="text-center">
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
                Create Event
              </button>
            </div>
          </form>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default AddEvent;
