
import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../common/ScrollReveal";


// Status map for registrations


const statusMap = {
  pending: { icon: "⏳", text: "Pending Approval", color: "text-yellow-600" },
  confirmed: { icon: "✅", text: "Confirmed", color: "text-green-600" },
  rejected: { icon: "❌", text: "Rejected", color: "text-red-600" }
};

const MyRegistrations = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

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



  useEffect(() => {
    const fetchData = async () => {
      const userObj = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");


      if (!userObj) return;

      try {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        const API_URL = process.env.REACT_APP_API_URL || "/api";
        const eventsResponse = await fetch(`${API_URL}/events`);
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const regsResponse = await fetch(`${API_URL}/events/registrations/my`, {
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

  const userObj = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
  const isLoggedIn = !!(sessionStorage.getItem("token") || localStorage.getItem("token"));

  const getEvent = (eventId) => events.find(e => e._id === eventId);

  return (
    <>
      <Navbar user={userObj} isLoggedIn={isLoggedIn} />
      <div className="min-h-screen pt-32 pb-12 px-4 md:px-8 lg:px-20" style={{
        background: 'linear-gradient(160deg,#0a1628 0%,#0f2d6b 55%,#1a47a0 100%)',
        fontFamily: "'Nunito',sans-serif"
      }}>
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="mb-10 ml-2">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              My <span className="text-blue-400">Registrations</span>
            </h1>
            <p className="text-white/60 text-lg font-medium">Manage your event signups and track their status</p>
          </div>

          {registrations.length > 0 ? (
            <div className="flex flex-col gap-6">
              {registrations.map((reg, idx) => {
                const event = reg.event; // Population is handled on the server
                if (!event) return null;
                const status = statusMap[reg.status] || statusMap.pending;

                return (
                  <ScrollReveal key={reg._id || reg.id} delay={idx * 100}>
                    <div className="group relative glass-card overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 rounded-3xl">
                      <div className="flex flex-col lg:flex-row items-stretch">
                        {/* Event Image Section */}
                        <div className="lg:w-72 h-48 lg:h-auto overflow-hidden relative">
                          <img
                            src={event.photo || event.image}
                            alt={event.title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden"></div>
                          <div className="absolute bottom-4 left-4 lg:hidden">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                        </div>

                        {/* Event Details Section */}
                        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-blue-500/30">
                                  {event.category}
                                </span>
                                <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/20 border border-white/5 text-[10px] font-bold text-white/50">
                                  REG #{reg._id?.slice(-6).toUpperCase()}
                                </span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                {event.title}
                              </h3>
                            </div>

                            <div className="hidden lg:flex flex-col items-end">
                              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-black/30 border border-white/10 ${status.color}`}>
                                <span className="text-lg">{status.icon}</span>
                                <span className="font-black text-sm uppercase tracking-tighter">{status.text}</span>
                              </div>
                              <p className="text-[10px] text-white/30 mt-2 font-bold uppercase tracking-widest italic">
                                Updated {formatEventDate(reg.updatedAt || reg.registeredAt)}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Date</p>
                                <p className="text-white font-bold text-sm tracking-tight">{formatDateOnly(event.dateTime)}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Time</p>
                                <p className="text-white font-bold text-sm tracking-tight">{formatTimeOnly(event.dateTime)}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Location</p>
                                <p className="text-white font-bold text-sm tracking-tight truncate max-w-[120px]">{event.place}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Organizer</p>
                                <p className="text-white font-bold text-sm tracking-tight">{event.organizer || "Admin"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              {reg.status === "confirmed" && (
                                <div className="flex items-center gap-1.5 text-green-400 text-xs font-black uppercase italic">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                  Ready for arrival
                                </div>
                              )}
                              {reg.status === "pending" && (
                                <div className="flex items-center gap-1.5 text-yellow-500 text-xs font-black uppercase italic">
                                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                                  Awaiting approval
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 rounded-[32px] border-2 border-dashed border-white/10 bg-white/5">
              <div className="text-7xl mb-6 grayscale opacity-50 animate-bounce">📝</div>
              <h3 className="text-3xl font-black text-white mb-3">LIST IS EMPTY</h3>
              <p className="text-white/40 font-bold uppercase tracking-widest text-center max-w-sm px-6 mb-10">
                You haven't registered for any events yet. Join the club today!
              </p>
              <button
                onClick={() => navigate('/events')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:scale-105 transition-all active:scale-95"
              >
                Find Events
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyRegistrations;
