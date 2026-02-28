import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import ScrollReveal from "../common/ScrollReveal";
import { useToast } from "../../context/ToastContext";

const EventsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("browse");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const catBtnRef = useRef(null);
  const { showToast } = useToast();
  const [userRegistrations, setUserRegistrations] = useState([]);

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

  const CATEGORIES = [
    { value: "all", label: "All Categories" },
    { value: "workshop", label: "Workshops" },
    { value: "competition", label: "Competitions" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "seminar", label: "Seminars" },
  ];

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
    tags: ""
  });

  const user = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
  const isLoggedIn = !!(sessionStorage.getItem("token") || localStorage.getItem("token"));
  const isAdmin = user?.role === "admin";
  const API_URL = process.env.REACT_APP_API_URL || "/api";

  // Position and open dropdown
  const openDropdown = (e) => {
    e.stopPropagation();
    if (!categoryOpen && catBtnRef.current) {
      const rect = catBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setCategoryOpen(v => !v);
  };

  // Close category dropdown on outside click
  useEffect(() => {
    if (!categoryOpen) return;
    const handler = () => setCategoryOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [categoryOpen]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchMyRegistrations = async () => {
      if (!isLoggedIn) return;
      try {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        const response = await fetch(`${API_URL}/events/registrations/my`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserRegistrations(data);
      } catch (error) {
        console.error("Error fetching my registrations:", error);
      }
    };

    fetchEvents();
    fetchMyRegistrations();
  }, [isLoggedIn]);
  // const mockEvents = [
  //   {
  //     id: 1,
  //     title: "Web Development Bootcamp",
  //     description: "Learn modern web development with React, Node.js, and MongoDB. This comprehensive bootcamp covers everything from basics to advanced concepts.",
  //     category: "workshop",
  //     date: "2026-02-15",
  //     time: "10:00 AM",
  //     location: "Room 301, Tech Building",
  //     maxParticipants: 50,
  //     currentParticipants: 32,
  //     organizer: "Tech Club",
  //     requirements: "Laptop required",
  //     tags: ["web", "react", "nodejs"],
  //     status: "open",
  //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
  //   },
  //   {
  //     id: 2,
  //     title: "AI/ML Workshop Series",
  //     description: "Dive deep into machine learning algorithms and neural networks. Hands-on projects included.",
  //     category: "workshop",
  //     date: "2026-02-20",
  //     time: "2:00 PM",
  //     location: "Lab 204, Science Building",
  //     maxParticipants: 40,
  //     currentParticipants: 38,
  //     organizer: "AI Research Club",
  //     requirements: "Basic Python knowledge",
  //     tags: ["AI", "ML", "python"],
  //     status: "open",
  //     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
  //   },
  //   {
  //     id: 3,
  //     title: "Annual Cultural Fest",
  //     description: "Join us for a celebration of diversity with music, dance, and food from around the world.",
  //     category: "cultural",
  //     date: "2026-03-05",
  //     time: "5:00 PM",
  //     location: "Main Auditorium",
  //     maxParticipants: 500,
  //     currentParticipants: 324,
  //     organizer: "Cultural Society",
  //     requirements: "None",
  //     tags: ["cultural", "fest", "music"],
  //     status: "open",
  //     image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
  //   },
  //   {
  //     id: 4,
  //     title: "Startup Pitch Competition",
  //     description: "Present your startup idea to industry experts and investors. Winner gets seed funding!",
  //     category: "competition",
  //     date: "2026-02-28",
  //     time: "1:00 PM",
  //     location: "Innovation Hub",
  //     maxParticipants: 20,
  //     currentParticipants: 20,
  //     organizer: "Entrepreneurship Cell",
  //     requirements: "Business plan required",
  //     tags: ["startup", "business", "competition"],
  //     status: "closed",
  //     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"
  //   },
  //   {
  //     id: 5,
  //     title: "Hackathon 2026",
  //     description: "24-hour coding marathon to build innovative solutions. Form teams and compete for amazing prizes!",
  //     category: "competition",
  //     date: "2026-03-15",
  //     time: "9:00 AM",
  //     location: "Computer Lab",
  //     maxParticipants: 100,
  //     currentParticipants: 67,
  //     organizer: "Coding Club",
  //     requirements: "Team of 3-4 members",
  //     tags: ["hackathon", "coding", "competition"],
  //     status: "open",
  //     image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
  //   },
  //   {
  //     id: 6,
  //     title: "Photography Workshop",
  //     description: "Master the art of photography with professional photographers. Bring your camera!",
  //     category: "workshop",
  //     date: "2026-02-18",
  //     time: "11:00 AM",
  //     location: "Art Studio",
  //     maxParticipants: 25,
  //     currentParticipants: 15,
  //     organizer: "Photography Club",
  //     requirements: "Camera (phone camera acceptable)",
  //     tags: ["photography", "art", "creative"],
  //     status: "open",
  //     image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
  //   }
  // ];

  // useEffect(() => {
  //   setEvents(mockEvents);
  // }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newEvent = {
        id: events.length + 1,
        ...formData,
        currentParticipants: 0,
        status: "open",
        tags: formData.tags.split(",").map(tag => tag.trim()),
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
      };

      setEvents([newEvent, ...events]);
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
        tags: ""
      });
      setLoading(false);
      setActiveTab("browse");
      showToast("Event created successfully!", "success");
    }, 1000);
  };

  const handleRegister = async (eventId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      if (userRegistrations.some(reg => (reg.event?._id || reg.eventId) === eventId)) {
        showToast("Already registered for this event", "info");
        return;
      }

      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(`${API_URL}/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showToast("Successfully registered for event!", "success");
        // Update local registrations
        const regData = await response.json();
        setUserRegistrations(prev => [...prev, regData.registration]);
      } else {
        const data = await response.json();
        showToast(data.message || "Failed to register", "error");
      }
    } catch (error) {
      console.error("Error registering:", error);
      showToast("Failed to register for event", "error");
    }
  };

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

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
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

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
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

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #1e3a8a, #2563eb);
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

        @media (max-width: 768px) {
          .mobile-hidden {
            display: none;
          }
        }

        /* Toast Notifications */
        .toast-notification {
          animation: toast-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .toast-notification.hiding {
          animation: toast-out 0.3s ease-in forwards;
        }

        @keyframes toast-out {
          to {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
          }
        }
      `}</style>

      <div className="min-h-screen" style={{
        background: 'linear-gradient(160deg, #0a1628 0%, #0f2d6b 55%, #1a47a0 100%)',
        fontFamily: "'Nunito', sans-serif"
      }}>
        {/* Animated Background */}
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

        {/* Header
        <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                    Events Hub
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {isLoggedIn ? (
                  <>
                    <span className="hidden sm:inline text-white/80 text-sm">
                      Welcome, <span className="font-semibold text-blue-300">{user?.name || "User"}</span>
                    </span>
                    <button
                      onClick={() => {
                        sessionStorage.clear();
                        localStorage.clear();
                        navigate("/login");
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg transition-all text-sm font-medium shadow-lg shadow-blue-500/30"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header> */}
        <Navbar user={user} isLoggedIn={isLoggedIn} />
        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          {/* Heading */}
          <div className="mb-10 ml-2 animate-slideDown">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              All <span className="text-blue-400">Events</span>
            </h1>
            <p className="text-white/60 text-lg font-medium">Explore and join upcoming activities and competitions</p>
          </div>

          {/* Tabs */}
          {isAdmin && (
            <div className="flex flex-wrap gap-3 mb-8 p-2 rounded-2xl glass-effect animate-slideDown">
              <button
                onClick={() => setActiveTab("browse")}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "browse"
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Events
                </span>
              </button>

              <button
                onClick={() => setActiveTab("create")}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "create"
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </span>
              </button>
            </div>
          )}

          {/* Browse Events Tab */}
          {
            activeTab === "browse" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 rounded-2xl glass-effect" style={{ overflow: 'visible' }}>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all"
                    />
                    <svg className="w-5 h-5 text-white/50 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Custom animated category dropdown */}
                  <div className="relative" style={{ minWidth: '180px' }}>
                    <button
                      ref={catBtnRef}
                      type="button"
                      onClick={openDropdown}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <span>{CATEGORIES.find(c => c.value === filterCategory)?.label}</span>
                      <svg
                        className="w-4 h-4 text-white/60 flex-shrink-0 transition-transform duration-200"
                        style={{ transform: categoryOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Portal dropdown — renders on document.body to escape stacking context */}
                    {ReactDOM.createPortal(
                      <div
                        onClick={e => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          top: dropdownPos.top,
                          left: dropdownPos.left,
                          width: dropdownPos.width || 180,
                          zIndex: 99999,
                          background: 'rgba(15,45,107,0.98)',
                          border: '1px solid rgba(59,130,246,0.3)',
                          borderRadius: '16px',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                          opacity: categoryOpen ? 1 : 0,
                          transform: categoryOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
                          transformOrigin: 'top',
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                          pointerEvents: categoryOpen ? 'auto' : 'none',
                        }}
                      >
                        <div className="py-2 px-1">
                          {CATEGORIES.map((cat, i) => (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => { setFilterCategory(cat.value); setCategoryOpen(false); }}
                              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-left"
                              style={{
                                color: filterCategory === cat.value ? '#fff' : 'rgba(255,255,255,0.6)',
                                background: filterCategory === cat.value ? 'rgba(59,130,246,0.3)' : 'transparent',
                                opacity: categoryOpen ? 1 : 0,
                                transform: categoryOpen ? 'translateX(0)' : 'translateX(-6px)',
                                transition: `opacity 0.16s ease ${i * 0.035}s, transform 0.16s ease ${i * 0.035}s, background 0.15s`,
                              }}
                            >
                              <span>{cat.label}</span>
                              {filterCategory === cat.value && (
                                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>,
                      document.body
                    )}
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <ScrollReveal
                      key={event._id}
                      delay={(index % 3) * 100}
                      className="h-full"
                    >
                      <div
                        className="event-card rounded-2xl overflow-hidden glass-effect cursor-pointer h-full"
                        onClick={() => setSelectedEvent(event)}
                      >
                        {/* Event Image */}
                        <div className="relative h-48 rounded-2xl overflow-hidden">
                          <img
                            src={event.photo || event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-3xl"
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`status-badge ${event.status === 'open' ? 'status-open' : 'status-closed'}`}>
                              {event.status}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                              {event.title}
                            </h2>
                            <span className="text-white text-sm font-medium truncate">
                              {event.description}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-white/70">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatEventDate(event.dateTime)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="truncate">{event.place}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>{event.currentParticipants}/{event.maxParticipants} registered</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-blue-700/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Register Button */}
                          {(() => {
                            const isRegistered = userRegistrations.some(reg => (reg.event?._id || reg.eventId) === event._id);
                            return (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRegister(event._id);
                                }}
                                disabled={event.status === 'closed'}
                                className={`w-full py-3 rounded-xl font-semibold transition-all ${event.status === 'open'
                                  ? isRegistered
                                    ? 'bg-slate-800 text-white/90 border border-white/10'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg shadow-blue-500/30'
                                  : 'bg-white/10 text-white/50 cursor-not-allowed'
                                  }`}
                              >
                                {event.status === 'closed'
                                  ? 'Registration Closed'
                                  : isRegistered
                                    ? 'Registered'
                                    : 'Register Now'
                                }
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4 animate-float">🔍</div>
                    <p className="text-white/70 text-lg">No events found matching your criteria</p>
                  </div>
                )}
              </div>
            )
          }

          {/* Create Event Tab */}
          {
            activeTab === "create" && isAdmin && (
              <div className="max-w-4xl mx-auto animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-2xl glass-effect">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Create New Event
                  </h2>

                  <form onSubmit={handleSubmitEvent} className="space-y-6">
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
                          placeholder="Describe your event"
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
                        <label className="block text-white/90 font-semibold mb-2">Organizer *</label>
                        <input
                          type="text"
                          name="organizer"
                          value={formData.organizer}
                          onChange={handleInputChange}
                          required
                          placeholder="Tech Club"
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
                          placeholder="Laptop required"
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
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                          </span>
                        ) : (
                          'Create Event'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("browse")}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )
          }
        </main>

        {/* Event Details Modal */}
        {
          selectedEvent && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedEvent(null)}
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
                    onClick={() => setSelectedEvent(null)}
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
                      {selectedEvent.tags.map((tag, idx) => (
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
                    {(() => {
                      const isRegistered = userRegistrations.some(reg => (reg.event?._id || reg.eventId) === selectedEvent._id);
                      const isClosed = selectedEvent.status === 'closed';

                      return (
                        <button
                          onClick={() => {
                            if (!isRegistered) {
                              handleRegister(selectedEvent._id);
                              setSelectedEvent(null);
                            }
                          }}
                          disabled={isClosed}
                          className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest transition-all ${isClosed
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : isRegistered
                              ? 'bg-slate-800 text-white/90 border border-white/10'
                              : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg shadow-blue-500/30'
                            }`}
                        >
                          {isClosed ? 'Registration Closed' : isRegistered ? 'Registered' : 'Register for Event'}
                        </button>
                      );
                    })()}
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default EventsPage;