import React from 'react';
import './MainContent.css'; // For custom styles

const MainContent = () => {
  return (
    <main class="container mx-auto mt-8 px-4">
    <h2 class="text-xl font-semibold">Welcome to your dashboard!</h2>
    <p class="mt-2 text-gray-700">Manage your profile, settings, and event preferences.</p>

    <div id="eventModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
            <h2 id="modalTitle" class="text-xl font-semibold"></h2>
            <div id="modalDescription" class="mt-4"></div>
            <button id="closeModal" class="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
        </div>
    </div>

    <section class="bg-blue-500 text-white rounded-lg p-6 mt-6" id="upcomingEventsContainer">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold">UPCOMING EVENTS</h3>
                <p class="text-sm">NEXT 30 DAYS</p>
            </div>
        </div>
        <div class="mt-4" id="upcomingEventsList">
        </div>
    </section>

    <section class="bg-green-500 text-white rounded-lg p-6 mt-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold">REGISTERED EVENTS</h3>
                <p class="text-sm">Events You've Signed Up For</p>
            </div>
        </div>
        <div class="mt-4" id="registeredEventsContainer">
        </div>
    </section>
</main>
  );
};

export default MainContent;
