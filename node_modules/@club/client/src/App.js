import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyRegistrations from "./components/myregistrarions/myregistrations.jsx";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import EventsPage from "./components/events/EventsPage";
import Organiser from "./components/organiser/Organizer.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/organizer" element={<Organiser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;