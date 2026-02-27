import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";

const Organizer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myEvents");
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "workshop",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    organizer: "",
    requirements: "",
    tags: "",
    image: ""
  });

  const getUserData = () => {
    try {
      const sessionUser = sessionStorage.getItem("user");
      const localUser = localStorage.getItem("user");
      
      if (sessionUser) {
        return JSON.parse(sessionUser);
      }
      if (localUser) {
        return JSON.parse(localUser);
      }
      return null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const user = getUserData();
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const isLoggedIn = !!token;

  const mockOrganizerEvents = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Learn modern web development with React, Node.js, and MongoDB.",
      category: "workshop",
      date: "2026-02-15",
      time: "10:00 AM",
      location: "Room 301, Tech Building",
      maxParticipants: 50,
      currentParticipants: 32,
      organizer: user?.name || "Tech Club",
      organizerId: user?.id || 1,
      requirements: "Laptop required",
      tags: ["web", "react", "nodejs"],
      status: "open",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    },
    {
      id: 5,
      title: "Hackathon 2026",
      description: "24-hour coding marathon to build innovative solutions.",
      category: "competition",
      date: "2026-03-15",
      time: "9:00 AM",
      location: "Computer Lab",
      maxParticipants: 100,
      currentParticipants: 67,
      organizer: user?.name || "Coding Club",
      organizerId: user?.id || 1,
      requirements: "Team of 3-4 members",
      tags: ["hackathon", "coding", "competition"],
      status: "open",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
    }
  ];

  const mockOrganizerRegistrations = [
    {
      id: 201,
      eventId: 1,
      userId: 2,
      userName: "Alice Johnson",
      userEmail: "alice@university.edu",
      status: "pending",
      registeredAt: "2026-01-25T10:30:00"
    },
    {
      id: 202,
      eventId: 1,
      userId: 3,
      userName: "Bob Smith",
      userEmail: "bob@university.edu",
      status: "confirmed",
      registeredAt: "2026-01-24T14:20:00"
    },
    {
      id: 203,
      eventId: 1,
      userId: 4,
      userName: "Carol Williams",
      userEmail: "carol@university.edu",
      status: "pending",
      registeredAt: "2026-01-26T09:15:00"
    },
    {
      id: 204,
      eventId: 5,
      userId: 5,
      userName: "David Brown",
      userEmail: "david@university.edu",
      status: "confirmed",
      registeredAt: "2026-01-23T16:45:00"
    },
    {
      id: 205,
      eventId: 5,
      userId: 6,
      userName: "Emma Davis",
      userEmail: "emma@university.edu",
      status: "pending",
      registeredAt: "2026-01-27T11:30:00"
    }
  ];

// Remove the FIRST useEffect (lines 131-148) completely
// Keep only ONE useEffect like this:

useEffect(() => {
  const checkAuth = async () => {
    if (!isLoggedIn || !user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin" && user.role !== "organizer") {
      alert("Access denied. This page is only for organizers.");
      navigate("/");
      return;
    }

    try {
      // Fetch events
      const response = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventsData = await response.json();
      
      // Fetch registrations
      const regsResponse = await fetch("http://localhost:5000/api/events/registrations/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const regsData = await regsResponse.json();
      
      console.log("Events:", eventsData);
      console.log("Registrations:", regsData);
      
      // Add currentParticipants count to each event
      const eventsWithCounts = eventsData.map(event => ({
        ...event,
        id: event._id, // Add id field for compatibility
        currentParticipants: regsData.filter(reg => 
          reg.eventId === event._id && reg.status === 'confirmed'
        ).length,
        status: 'open' // Add default status
      }));
      
      setEvents(eventsWithCounts);
      setRegistrations(regsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsLoading(false);
    }
  };

  checkAuth();
}, []);

useEffect(() => {
  const checkAuth = async () => {
    if (!isLoggedIn || !user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin" && user.role !== "organizer") {
      alert("Access denied. This page is only for organizers.");
      navigate("/");
      return;
    }

    try {
      // Fetch events
      const response = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventsData = await response.json();
      
      // Fetch registrations
      const regsResponse = await fetch("http://localhost:5000/api/events/registrations/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const regsData = await regsResponse.json();
      
      // Add currentParticipants count to each event
      const eventsWithCounts = eventsData.map(event => ({
        ...event,
        currentParticipants: regsData.filter(reg => 
          reg.eventId === event._id && reg.status === 'confirmed'
        ).length
      }));
      
      setEvents(eventsWithCounts);
      setRegistrations(regsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsLoading(false);
    }
  };

  checkAuth();
}, []);
const testEmail = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/events/test-email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error("Test email error:", error);
    alert("Failed to send test email");
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

const handleCreateEvent = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
    
    const response = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        dateTime: dateTime,
        place: formData.location,
        photo: formData.image,
        category: formData.category,
        maxParticipants: formData.maxParticipants,
        requirements: formData.requirements,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      }),
    });

    if (response.ok) {
      const newEvent = await response.json();
      setEvents([...events, newEvent.event]);
      setShowCreateModal(false);
      setFormData({
        title: "",
        description: "",
        category: "workshop",
        date: "",
        time: "",
        location: "",
        maxParticipants: "",
        organizer: "",
        requirements: "",
        tags: "",
        image: ""
      });
      setImagePreview(null);
      alert("Event created successfully!");
    }
  } catch (error) {
    console.error("Error creating event:", error);
    alert("Failed to create event");
  } finally {
    setLoading(false);
  }
};

const handleApproveRegistration = async (regId, eventId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/${eventId}/registrations/${regId}/approve`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      // Refresh registrations
      const regsResponse = await fetch("http://localhost:5000/api/events/registrations/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const regsData = await regsResponse.json();
      setRegistrations(regsData);
      
      alert("Registration approved!");
    } else {
      const errorData = await response.json();
      alert(`Failed to approve: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error approving registration:", error);
    alert("Failed to approve registration");
  }
};

const handleRejectRegistration = async (regId, eventId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/${eventId}/registrations/${regId}/reject`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      // Refresh registrations
      const regsResponse = await fetch("http://localhost:5000/api/events/registrations/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const regsData = await regsResponse.json();
      setRegistrations(regsData);
      
      alert("Registration rejected!");
    } else {
      const errorData = await response.json();
      alert(`Failed to reject: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error rejecting registration:", error);
    alert("Failed to reject registration");
  }
};

const getEventRegistrations = (eventId) => {
  console.log("Getting registrations for event:", eventId);
  console.log("All registrations:", registrations);
  const filtered = registrations.filter(reg => {
    console.log(`Comparing reg.eventId ${reg.eventId} with ${eventId}`);
    return reg.eventId === eventId || reg.event?._id === eventId;
  });
  console.log("Filtered registrations:", filtered);
  return filtered;
};

const getPendingCount = (eventId) => {
  return registrations.filter(reg => 
    (reg.eventId === eventId || reg.event?._id === eventId) && 
    reg.status === "pending"
  ).length;
};


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .event-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event-card:hover {
          transform: translateY(-8px);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #1e40af, #3b82f6);
          border-radius: 10px;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-open {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .status-closed {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .status-pending {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }

        .status-confirmed {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .status-rejected {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .image-upload-area {
          border: 2px dashed rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        .image-upload-area:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.05);
        }

        @media (max-width: 768px) {
          .mobile-hidden {
            display: none;
          }
        }
      `}</style>

      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0.6s' }}></div>
          </div>
          
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <Navbar user={user} isLoggedIn={isLoggedIn} />

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <div className="mb-8 animate-slideDown">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Organizer Dashboard
              </span>
            </h1>
            <p className="text-white/70 text-lg">Manage your events and approve student registrations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slideDown" style={{ animationDelay: '0.1s' }}>
            <div className="glass-effect rounded-2xl p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-semibold mb-1">Total Events</p>
                  <p className="text-4xl font-black text-white">{events.length}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-semibold mb-1">Total Participants</p>
                  <p className="text-4xl font-black text-white">
                    {events.reduce((sum, event) => sum + event.currentParticipants, 0)}
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-semibold mb-1">Pending Approvals</p>
                  <p className="text-4xl font-black text-white">
                    {registrations.filter(r => r.status === "pending").length}
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 p-2 rounded-2xl glass-effect animate-slideDown" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setActiveTab("myEvents")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "myEvents"
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                My Events
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("approvals")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all relative ${
                activeTab === "approvals"
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Approvals
                {registrations.filter(r => r.status === "pending").length > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    {registrations.filter(r => r.status === "pending").length}
                  </span>
                )}
              </span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="ml-auto px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white shadow-lg shadow-green-500/30 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </span>
            </button>
          </div>

          {activeTab === "myEvents" && (
            <div className="space-y-6 animate-fadeIn">
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <div
                      key={event.id}
                      className="event-card rounded-2xl overflow-hidden glass-effect cursor-pointer animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.photo || event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className={`status-badge ${event.status === 'open' ? 'status-open' : 'status-closed'}`}>
                            {event.status}
                          </span>
                          {getPendingCount(event.id) > 0 && (
                            <span className="status-badge status-pending">
                              {getPendingCount(event.id)} Pending
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {event.title}
                          </h3>
                          <p className="text-white/70 text-sm line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(event.dateTime).toLocaleDateString()} at {new Date(event.dateTime).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{event.currentParticipants}/{event.maxParticipants} registered</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab("approvals");
                              setSelectedEvent(event);
                            }}
                            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg shadow-blue-500/30 transition-all"
                          >
                            Manage Registrations
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-float">📅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Events Yet</h3>
                  <p className="text-white/70 text-lg mb-6">Create your first event to get started!</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white rounded-xl font-semibold shadow-lg transition-all"
                  >
                    Create Event
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "approvals" && (
            <div className="space-y-6 animate-fadeIn">
              {selectedEvent ? (
                <>
                  <div className="glass-effect rounded-2xl p-6 mb-6">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="mb-4 text-white/70 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to All Events
                    </button>
                    <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {selectedEvent.title}
                    </h2>
                    <p className="text-white/70 mt-2">Registrations: {getEventRegistrations(selectedEvent.id).length}</p>
                  </div>

                  <div className="space-y-4">
                    {getEventRegistrations(selectedEvent.id).map((reg) => (
                      <div key={reg.id} className="glass-effect rounded-2xl p-6 animate-scaleIn">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {reg.userName.charAt(0)}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">{reg.userName}</h3>
                                <p className="text-white/60 text-sm">{reg.userEmail}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white/70 mt-3">
  <span className="flex items-center gap-1">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    {new Date(reg.registeredAt).toLocaleDateString()}
  </span>
  <span className={`status-badge status-${reg.status}`}>
    {reg.status}
  </span>
</div>
                          </div>

{reg.status === "pending" && (
  <div className="flex gap-3">
    <button
      onClick={() => handleApproveRegistration(reg.id, selectedEvent._id)}
      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Approve
    </button>
    <button
      onClick={() => handleRejectRegistration(reg.id, selectedEvent._id)}
      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      Reject
    </button>
  </div>
)}
                        </div>
                      </div>
                    ))}

                    {getEventRegistrations(selectedEvent.id).length === 0 && (
                      <div className="text-center py-20">
                        <div className="text-6xl mb-4 animate-float">👥</div>
                        <p className="text-white/70 text-lg">No registrations yet for this event</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="event-card glass-effect rounded-2xl p-6 cursor-pointer animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {event.title}
                      </h3>
                      <div className="space-y-3 text-white/70">
                        <div className="flex items-center justify-between">
                          <span>Total Registrations:</span>
                          <span className="font-bold text-white">{getEventRegistrations(event.id).length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Pending:</span>
                          <span className="font-bold text-yellow-400">{getPendingCount(event.id)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Confirmed:</span>
                          <span className="font-bold text-green-400">
                            {getEventRegistrations(event.id).filter(r => r.status === "confirmed").length}
                          </span>
                        </div>
                      </div>
                      <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl font-semibold transition-all">
                        View Registrations
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl glass-effect border border-white/20 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Create New Event
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreateEvent} className="space-y-6">
                  <div>
                    <label className="block text-white/90 font-semibold mb-2">Event Image</label>
                    <div className="image-upload-area rounded-xl p-6 text-center cursor-pointer relative overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-semibold">Click to change image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12">
                          <svg className="w-16 h-16 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-white/70 font-semibold mb-2">Click to upload event image</p>
                          <p className="text-white/50 text-sm">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-white/90 font-semibold mb-2">Event Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter event title"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white/90 font-semibold mb-2">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        placeholder="Describe your event in detail"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all resize-none custom-scrollbar"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-semibold mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white transition-all cursor-pointer"
                      >
                        <option value="workshop" className="bg-gray-900">Workshop</option>
                        <option value="competition" className="bg-gray-900">Competition</option>
                        <option value="cultural" className="bg-gray-900">Cultural</option>
                        <option value="sports" className="bg-gray-900">Sports</option>
                        <option value="seminar" className="bg-gray-900">Seminar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/90 font-semibold mb-2">Max Participants *</label>
                      <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        required
                        min="1"
                        placeholder="50"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-semibold mb-2">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-semibold mb-2">Time *</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white/90 font-semibold mb-2">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        placeholder="Room 301, Tech Building"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-semibold mb-2">Organizer Name *</label>
                      <input
                        type="text"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name or club name"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 font-semibold mb-2">Requirements</label>
                      <input
                        type="text"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="e.g., Laptop required"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white/90 font-semibold mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="web, react, nodejs"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Event...
                        </span>
                      ) : (
                        'Create Event'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Organizer;