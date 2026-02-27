
import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

// Mock events and registrations (replace with API calls in production)
const mockEvents = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    category: "workshop",
    date: "2026-02-15T10:00:00",
    location: "Room 301, Tech Building",
    organizer: "Tech Club",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
  },
  {
    id: 2,
    title: "AI/ML Workshop Series",
    category: "workshop",
    date: "2026-02-20T14:00:00",
    location: "Lab 204, Science Building",
    organizer: "AI Research Club",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
  }
];

const mockRegistrations = [
  {
    id: 101,
    userId: 1,
    eventId: 1,
    status: "confirmed",
    registeredAt: "2026-01-20T09:00:00"
  },
  {
    id: 102,
    userId: 1,
    eventId: 2,
    status: "pending",
    registeredAt: "2026-01-22T11:00:00"
  }
];

const statusMap = {
  pending: { icon: "⏳", text: "Pending Approval", color: "text-yellow-600" },
  confirmed: { icon: "✅", text: "Confirmed", color: "text-green-600" },
  rejected: { icon: "❌", text: "Rejected", color: "text-red-600" }
};

const MyRegistrations = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const userObj = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
    setUser(userObj);
    
    if (!userObj) return;

    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const eventsResponse = await fetch("http://localhost:5000/api/events");
      const eventsData = await eventsResponse.json();
      setEvents(eventsData);

      const regsResponse = await fetch("http://localhost:5000/api/events/registrations/my", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const regsData = await regsResponse.json();
      setRegistrations(regsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  fetchData();
}, []);

  const getEvent = (eventId) => events.find(e => e._id === eventId);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-12 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>My Registrations</h1>
          <p className="text-lg text-gray-600 mb-8">Track your event registrations and their status</p>

          {registrations.length > 0 ? (
            <div className="space-y-8">
              {registrations.map(reg => {
                const event = getEvent(reg.eventId);
                if (!event) return null;
                const status = statusMap[reg.status] || statusMap.pending;
                return (
                  <div key={reg.id} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    <div className="md:w-48 h-40 md:h-auto flex-shrink-0 bg-gray-100">
                      <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-blue-900" style={{ fontFamily: "'Playfair Display', serif" }}>{event.title}</h3>
                          <span className={`font-semibold flex items-center gap-1 ${status.color}`}>
                            <span>{status.icon}</span> {status.text}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-gray-700 text-base mb-2">
                          <span><strong>Category:</strong> {event.category}</span>
                          <span><strong>Date:</strong> {new Date(event.date).toLocaleString()}</span>
                          <span><strong>Location:</strong> {event.location}</span>
                          <span><strong>Organizer:</strong> {event.organizer}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          Registered on: {new Date(reg.registeredAt).toLocaleDateString()}
                        </div>
                        {reg.status === "confirmed" && (
                          <div className="mt-2 text-green-700 font-semibold">You're all set! See you at the event.</div>
                        )}
                        {reg.status === "pending" && (
                          <div className="mt-2 text-yellow-700 font-medium">Your registration is being reviewed.</div>
                        )}
                        {reg.status === "rejected" && (
                          <div className="mt-2 text-red-700 font-medium">Unfortunately, your registration was not approved.</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">No Registrations Yet</h3>
              <p className="text-gray-600 mb-6">You haven't registered for any events. Browse our events to get started!</p>
              <button onClick={() => navigate('/events')} className="px-8 py-3 bg-blue-700 text-white rounded-xl font-semibold shadow hover:bg-blue-800 transition-all">Browse Events</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyRegistrations;
