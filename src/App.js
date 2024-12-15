import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ViewCalendar from "./ViewCalendar";
import Dashboard from "./Dashboard";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={<Login />} />

        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


          <Route
          path="/viewcalendar"
          element={
            <ProtectedRoute>
              <ViewCalendar />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
