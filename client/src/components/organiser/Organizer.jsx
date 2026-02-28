import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import ScrollReveal from "../common/ScrollReveal";


const Organizer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myEvents");
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatEventDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'long' }).toLowerCase();

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    const time = d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${day}${getOrdinal(day)} of ${month} , ${time}`;
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };
    return `${day}${getOrdinal(day)} of ${month}`;
  };

  const formatTimeOnly = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };


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

  // API configuration
  const API_URL = process.env.REACT_APP_API_URL || "/api";


  useEffect(() => {
    const checkAuth = async () => {
      if (!token || !user) {
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
        const response = await fetch(`${API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const eventsData = await response.json();

        // Fetch registrations
        const regsResponse = await fetch(`${API_URL}/events/registrations/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const regsData = await regsResponse.json();

        // Add currentParticipants count to each event
        const eventsWithCounts = eventsData.map(event => ({
          ...event,
          id: event._id,
          currentParticipants: regsData.filter(reg =>
            reg.eventId === event._id && reg.status === 'confirmed'
          ).length,
          status: 'open'
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
  }, [token, user, navigate, API_URL]);
  const testEmail = async () => {
    try {
      const response = await fetch(`${API_URL}/events/test-email`, {
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

      const response = await fetch(`${API_URL}/events`, {
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
        `${API_URL}/events/${eventId}/registrations/${regId}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Refresh registrations
        const regsResponse = await fetch(`${API_URL}/events/registrations/all`, {
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
        `${API_URL}/events/${eventId}/registrations/${regId}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Refresh registrations
        const regsResponse = await fetch(`${API_URL}/events/registrations/all`, {
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

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This will also remove all registrations for this event.")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter(e => e._id !== eventId));
        setShowDetailsModal(false);
        setSelectedEvent(null);
        alert("Event deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete event: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
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
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
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
        background: 'linear-gradient(160deg, #0a1628 0%, #0f2d6b 55%, #1a47a0 100%)',
        fontFamily: "'Nunito', sans-serif"
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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Organizer Dashboard
              </span>
            </h1>
            <p className="text-white/70 text-lg">Manage your events and approve student registrations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ScrollReveal delay={100} className="h-full">
              <div className="glass-effect rounded-2xl p-6 border-l-4 border-blue-500 h-full">
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
            </ScrollReveal>

            <ScrollReveal delay={200} className="h-full">
              <div className="glass-effect rounded-2xl p-6 border-l-4 border-green-500 h-full">
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
            </ScrollReveal>

            <ScrollReveal delay={300} className="h-full">
              <div className="glass-effect rounded-2xl p-6 border-l-4 border-yellow-500 h-full">
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
            </ScrollReveal>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 p-2 rounded-2xl glass-effect animate-slideDown" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setActiveTab("myEvents")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "myEvents"
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
              onClick={() => setActiveTab("allEvents")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "allEvents"
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30"
                : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                All Events
              </span>
            </button>

            <button
              onClick={() => setActiveTab("approvals")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all relative ${activeTab === "approvals"
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
              {(() => {
                const myEvents = events.filter(e => e.organizerId === user?._id || e.creator === user?._id || e.organizer === user?.name);
                return myEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myEvents.map((event, index) => (
                      <ScrollReveal
                        key={event.id}
                        delay={(index % 3) * 100}
                        className="h-full"
                      >
                        <div
                          className="event-card rounded-2xl overflow-hidden glass-effect cursor-pointer h-full"
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowDetailsModal(true);
                          }}
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
                              <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                {event.title}
                              </h2>
                              <p className="text-white/80 text-sm truncate">
                                {event.description}
                              </p>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-white/70">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDateOnly(event.dateTime)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/70">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{formatTimeOnly(event.dateTime)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/70">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>{event.currentParticipants}/{event.maxParticipants} registered</span>
                              </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                  setShowDetailsModal(true);
                                }}
                                className="flex-1 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg"
                              >
                                Details
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTab("approvals");
                                  setSelectedEvent(event);
                                }}
                                className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                                title="Manage Registrations"
                              >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Manage
                              </button>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
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
                );
              })()}
            </div>
          )}

          {activeTab === "allEvents" && (
            <div className="space-y-6 animate-fadeIn">
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <ScrollReveal
                      key={event.id}
                      delay={(index % 3) * 100}
                      className="h-full"
                    >
                      <div
                        className="event-card rounded-2xl overflow-hidden glass-effect cursor-pointer h-full"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowDetailsModal(true);
                        }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={event.photo || event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`status-badge ${event.status === 'open' ? 'status-open' : 'status-closed'}`}>
                              {event.status}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        <div className="p-6 space-y-4">
                          <div>
                            <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                              {event.title}
                            </h2>
                            <p className="text-white/80 text-sm truncate">{event.description}</p>
                          </div>
                          <div className="space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDateOnly(event.dateTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{formatTimeOnly(event.dateTime)}</span>
                            </div>
                          </div>
                          <div className="pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                                setShowDetailsModal(true);
                              }}
                              className="w-full py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-float">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
                  <p className="text-white/70 text-lg">System-wide events will appear here.</p>
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
                    <h2 className="text-3xl font-bold text-white">
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
                                {formatEventDate(reg.registeredAt)}
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
                      <h3 className="text-xl font-bold text-white mb-4">
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
                  <h2 className="text-3xl font-bold text-white">
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

        {/* Premium Event Details Modal for Organizers */}
        {showDetailsModal && selectedEvent && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => {
              setShowDetailsModal(false);
              setSelectedEvent(null);
            }}
          >
            <div
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl glass-effect border border-white/20 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 overflow-hidden m-4 rounded-3xl">
                <img
                  src={selectedEvent.photo || selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedEvent(null);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-blue-500/30">
                        {selectedEvent.category}
                      </span>
                      <span className={`px-3 py-1 rounded-lg bg-black/20 border border-white/5 text-[10px] font-bold uppercase tracking-widest ${selectedEvent.status === 'open' ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedEvent.status}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">Description</h3>
                  <p className="text-white/80 leading-relaxed font-medium">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Date</p>
                      <p className="text-white font-bold text-sm tracking-tight">{formatDateOnly(selectedEvent.dateTime)}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Time</p>
                      <p className="text-white font-bold text-sm tracking-tight">{formatTimeOnly(selectedEvent.dateTime)}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Location</p>
                      <p className="text-white font-bold text-sm tracking-tight truncate max-w-[120px]" title={selectedEvent.place}>{selectedEvent.place}</p>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Organizer</p>
                      <p className="text-white font-bold text-sm tracking-tight truncate max-w-[120px]" title={selectedEvent.organizer}>{selectedEvent.organizer}</p>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Capacity</p>
                      <p className="text-white font-bold text-xs tracking-tight">{selectedEvent.currentParticipants}/{selectedEvent.maxParticipants}</p>
                      <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${(selectedEvent.currentParticipants / selectedEvent.maxParticipants) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Requirements</p>
                      <p className="text-white font-bold text-sm tracking-tight truncate max-w-[120px]" title={selectedEvent.requirements || 'None'}>{selectedEvent.requirements || 'None'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-700/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setActiveTab("approvals");
                      // selectedEvent remains set for the approvals view
                    }}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                  >
                    Manage Registrations
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-500/30 transition-all"
                  >
                    Delete Event
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedEvent(null);
                    }}
                    className="sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Organizer;