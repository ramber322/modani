import React, { useState } from 'react';
import spcLogo from './images/spc-logo-header.png'

const Documentation = () => {
  const [modalOpen, setModalOpen] = useState(false); 
  const [currentSampleResponse, setCurrentSampleResponse] = useState('');


  // Sample data for the API routes
  const apiRoutes = [
    {
      method: 'GET',
      path: '/events',
      description: 'Get all events',
      sampleResponse: `{
  "events": [   
  { 
    "id": "1",
    "title": "Event Title",
    "event_date": "2024-12-25",
    "location": "Event Location",
    "description": "Event Description"
  } 
         ]
}`,
    },
    {
      method: 'POST',
      path: '/events',
      description: 'Creates a new event',
      sampleResponse: `{
  "id": "2",
  "title": "New Event",
  "event_date": "2024-12-25",
  "location": "Event Location",
  "description": "Event Description",
  "created_at": "2024-03-25T19:55:23.077Z",
  "updated_at": "2024-03-30T08:05:10.020Z"
}`,
    },
    {
      method: 'DELETE',
      path: '/events/{event_id}',
      description: 'Deletes a specific event',
      sampleResponse: `{
  "message": "Event deleted successfully"
}`,
    },
    {
      method: 'POST',
      path: '/events/{event_id}/feedback',
      description: 'Submits feedback for a specific event',
      sampleResponse: `{
  "message": "Feedback submitted successfully"
}`,
    },
    {
      method: 'POST',
      path: '/events/{event_id}/register',
      description: 'Registers for a specific event',
      sampleResponse: `{
  "message": "Registration successful"
}`,
    },

    {
      method: 'GET',
      path: '/events/{event_id}/feedback',
      description: 'Fetches feedback for a specific event',
      sampleResponse: `{
  "feedback": [
    {
      "event_id": "1",
      "comment": "Great event!",
      "rating": 5
    }
  ]
}`,
    },

    
    {
      method: 'GET',
      path: '/events/upcomingEvents',
      description: 'Displays upcoming events scheduled a month advance',
      sampleResponse: `{
   "success": true,
    "events": []
}`,
    },

    {
      method: 'GET',
      path: '/events/registeredEvents',
      description: 'Displays current user registered events',
      sampleResponse: `{
   "success": true,
    "events": []
}`,
    },

    {
      method: 'GET',
      path: '/events/calendarEvents',
      description: 'Displays all events in calendar format',
      sampleResponse: `{
   "success": true,
    "events": []
}`,
    },
  ];

  //  API routes for Authentication
  const authRoutes = [
    {
      method: 'POST',
      path: '/login',
      description: 'Logs in a user',
      sampleResponse: `{
    "success": true,
    "token": "14|G32z9xwm5c3OMU6ZhbAvft5o6NUy8Oy58fccDQux",
    "role": "student",
    "message": "Login successful."
}`,
    },
    {
      method: 'POST',
      path: '/register',
      description: 'Registers a new user',
      sampleResponse: `{
    "success": true,
    "user": {
        "name": "studentX",
        "email": "student@gmail.com",
        "updated_at": "2024-12-20T15:26:42.000000Z",
        "created_at": "2024-12-20T15:26:42.000000Z",
        "id": 7
    }

}`,
    },
    {
      method: 'POST',
      path: '/logout',
      description: 'Logs out the current user',
      sampleResponse: `{
  "message": "Logged out successfully"
}`,
    },

    {
      method: 'GET',
      path: '/user',
      description: 'Gets the current user information',
      sampleResponse: `{
    "success": true,
    "user": {
        "id": 7,
        "name": "studentX",
        "email": "studentX@gmail.com",
        "email_verified_at": null,
        "role": "student",
        "created_at": "2024-12-20T15:26:42.000000Z",
        "updated_at": "2024-12-20T15:26:42.000000Z"
    }
}`,
    },

    {
      method: 'PUT',
      path: '/user',
      description: 'Edits the current user information',
      sampleResponse: `{
    "success": true,
    "user": {
        "id": 7,
        "name": "newName",
        "email": "newEmail",
        "updated_at": "2024-12-20T15:38:46.000000Z"
    }
}`,
    },



  ];

  const methodColorClass = (method) => {
    switch (method) {
      case 'GET':
        return { backgroundColor: '#22c55e', color: '#000' }; 
      case 'POST':
        return { backgroundColor: '#0099ff', color: '#fff' }; 
      case 'PUT':
        return { backgroundColor: '#ffcc00', color: '#000' }; 
      case 'DELETE':
        return { backgroundColor: '#ff4d4d', color: '#fff' }; 
      default:
        return {}; 
    }
  };

  const openModal = (sampleResponse) => {
    setCurrentSampleResponse(sampleResponse); 
    setModalOpen(true); 
  };

  const closeModal = () => {
    setModalOpen(false); 
    setCurrentSampleResponse(''); 
  };

  return (
    <div className="bg-gray-100 min-h-screen">
     <header className="bg-black text-white py-4 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <img
          style={{ width: '40px', height: '40px' }}
          src={spcLogo}
          alt="SPC Logo"
        />
       </div>
    </header>
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">API Documentation</h1>

        {/* API Routes Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Events</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Path</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {apiRoutes.map((route, index) => (
                <tr key={index}>
                <td style={methodColorClass(route.method)} className="border border-gray-300 px-4 py-2">
  {route.method}
</td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500">{route.path}</td>
                  <td className="border border-gray-300 px-4 py-2">{route.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      onClick={() => openModal(route.sampleResponse)} 
                      className="text-blue-500 underline"
                    >
                      Expand
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Authentication Routes Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Authentication</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Path</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {authRoutes.map((route, index) => (
                <tr key={index}>
                  <td style={methodColorClass(route.method)} className="border border-gray-300 px-4 py-2">
  {route.method}
</td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500">{route.path}</td>
                  <td className="border border-gray-300 px-4 py-2">{route.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      onClick={() => openModal(route.sampleResponse)} 
                      className="text-blue-500 underline"
                    >
                      Expand
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Modal for Sample Response */}
{modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Sample Response</h3>
      <pre className="bg-gray-100 p-4 rounded-sm">
        {currentSampleResponse}
      </pre>
      <div className="flex justify-end mt-4"> {/* Flex container for the button */}
        <button 
          onClick={closeModal} 
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Documentation;