import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
//import EventDetails from "./components/events/EventDetails";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/events/:id" element={<EventDetails />} /> */}
          
          {/* <Route
            path="/my-registrations"
            element={
              <ProtectedRoute>
                <MyRegistrations />
              </ProtectedRoute>
            }
          /> */}
          
          {/* <Route
            path="/admin/events/create"
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            }
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;