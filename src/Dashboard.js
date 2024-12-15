import React, { useState } from "react";
import Header from "./components/Header";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header />
      
      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold">Welcome to your dashboard!</h2>
        <p className="mt-2 text-gray-700">Manage your profile, settings, and event preferences.</p>

        {/* Modal Trigger */}
        <button onClick={openModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Open Modal
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
              <h2 className="text-xl font-semibold">Modal Title</h2>
              <p className="mt-4">This is the modal content.</p>
              <button onClick={closeModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
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
          <div className="mt-4">No events available.</div>
        </section>

        {/* Registered Events Section */}
        <section className="bg-green-500 text-white rounded-lg p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">REGISTERED EVENTS</h3>
              <p className="text-sm">Events You've Signed Up For</p>
            </div>
          </div>
          <div className="mt-4">No registered events.</div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
