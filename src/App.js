import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

//USER
import ViewCalendar from "./USER/ViewCalendar";
import Dashboard from "./USER/Dashboard";
import ActivityLog from "./USER/ActivityLog";
import Profile from "./USER/Profile";

//ADMIN
import AddEvent from "./ADMIN/AddEvent";
import Feedback from "./ADMIN/Feedback";
import AdminDashboard from "./ADMIN/AdminDashboard";


import ProtectedRoute from "./ProtectedRoute";
import Documentation from "./Documentation";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/documentation" element={<Documentation />} />


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
