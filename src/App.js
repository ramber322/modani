import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

//USER
import ViewCalendar from "./ViewCalendar";
import Dashboard from "./Dashboard";
import ActivityLog from "./ActivityLog";
import Profile from "./Profile";

//ADMIN
import AddEvent from "./ADMIN/AddEvent";
import Feedback from "./ADMIN/Feedback";
import AdminDashboard from "./ADMIN/AdminDashboard";


import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />



        {/* Protected routes */}
        <Route path="/dashboard"
        element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute> }/>

        <Route path="/profile"
        element={ <ProtectedRoute> <Profile/> </ProtectedRoute> }/>

        <Route path="/viewcalendar"
        element={ <ProtectedRoute> <ViewCalendar/> </ProtectedRoute> }/>

        <Route path="/activitylog"
        element={ <ProtectedRoute> <ActivityLog/> </ProtectedRoute> }/>

        <Route path="/addevent" 
        element={ <ProtectedRoute requiredRole= "admin"> <AddEvent/> </ProtectedRoute> }/>

        <Route path="/feedback" 
        element={ <ProtectedRoute requiredRole= "admin"> <Feedback/> </ProtectedRoute> }/>

        <Route path="/admindashboard" 
        element={ <ProtectedRoute requiredRole= "admin"> <AdminDashboard/> </ProtectedRoute> }/>


      </Routes>
    </Router>
  );
}

export default App;
