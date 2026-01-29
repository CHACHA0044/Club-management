import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
  const isLoggedIn = !!(sessionStorage.getItem("token") || localStorage.getItem("token"));

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-between px-6 md:px-12 lg:px-20 py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent animate-shimmer">
                Club Hub
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-200">
              Your centralized platform for managing college club events,
              registrations, and announcements
            </p>
            
            <p className="text-lg text-blue-200 leading-relaxed animate-fade-in-up animation-delay-400">
              Say goodbye to scattered Google Forms and WhatsApp groups. 
              Streamline your club activities in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up animation-delay-600">
              {isLoggedIn ? (
                <>
                  {user?.role === "admin" ? (
                    <button
                      onClick={() => navigate("/admin/events/create")}
                      className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">Create Event</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/events")}
                      className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">Browse Events</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/my-registrations")}
                    className="group px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    My Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="group px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Hero Visual - Floating Cards */}
          <div className="relative hidden lg:flex justify-center items-center h-[500px]">
            <div className="absolute inset-0 flex flex-col justify-between items-center">
              <div className="group relative bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 hover:bg-white/30 animate-float">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">Smart Management</h3>
                <p className="text-blue-100">Organize efficiently</p>
              </div>

              <div className="group relative bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:bg-white/30 animate-float animation-delay-300 self-end">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-white mb-2">Event Tracking</h3>
                <p className="text-blue-100">Never miss out</p>
              </div>

              <div className="group relative bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 hover:scale-105 hover:bg-white/30 animate-float animation-delay-600 self-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Easy Registration</h3>
                <p className="text-blue-100">One-click signup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Why Choose Club Hub?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage club activities effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  👥
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">For Students</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-blue-500 font-bold text-xl">✓</span>
                    <span>Discover upcoming events</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <span className="text-blue-500 font-bold text-xl">✓</span>
                    <span>Register with one click</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <span className="text-blue-500 font-bold text-xl">✓</span>
                    <span>Track registration status</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-225">
                    <span className="text-blue-500 font-bold text-xl">✓</span>
                    <span>Receive real-time announcements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-purple-500 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-4">For Organizers</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-purple-500 font-bold text-xl">✓</span>
                    <span>Create and manage events</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <span className="text-purple-500 font-bold text-xl">✓</span>
                    <span>Approve/reject participants</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <span className="text-purple-500 font-bold text-xl">✓</span>
                    <span>Send mass announcements</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-225">
                    <span className="text-purple-500 font-bold text-xl">✓</span>
                    <span>View participant analytics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-indigo-500 transition-all duration-500 hover:-translate-y-3 overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  🎓
                </div>
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">For Clubs</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-indigo-500 font-bold text-xl">✓</span>
                    <span>Centralized event management</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <span className="text-indigo-500 font-bold text-xl">✓</span>
                    <span>No more Google Forms chaos</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <span className="text-indigo-500 font-bold text-xl">✓</span>
                    <span>Professional appearance</span>
                  </li>
                  <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-225">
                    <span className="text-indigo-500 font-bold text-xl">✓</span>
                    <span>Better engagement tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: 1, title: "Create Account", desc: "Sign up as a student or club admin in seconds", color: "blue" },
              { num: 2, title: "Explore Events", desc: "Browse all upcoming club events in one place", color: "purple" },
              { num: 3, title: "Register", desc: "Click to register and get instant confirmation", color: "indigo" },
              { num: 4, title: "Stay Updated", desc: "Receive announcements and track your status", color: "pink" }
            ].map((step, idx) => (
              <div key={idx} className="group text-center animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className={`relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-${step.color}-500 to-${step.color}-700 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700`}>
                  <span className="relative z-10">{step.num}</span>
                  <div className={`absolute inset-0 bg-${step.color}-400 rounded-full opacity-50 animate-ping`}></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Active Students" },
              { number: "50+", label: "Campus Clubs" },
              { number: "200+", label: "Events Hosted" },
              { number: "98%", label: "Satisfaction Rate" }
            ].map((stat, idx) => (
              <div key={idx} className="group text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                  {stat.number}
                </div>
                <p className="text-white/90 text-lg font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)] animate-spin-slow"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Ready to Transform Your Club Management?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Join hundreds of students and clubs already using Club Hub
          </p>
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/register")}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Start Free Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-2xl font-bold text-blue-400 mb-4">Club Hub</h4>
              <p className="text-slate-400 leading-relaxed">
                Simplifying club management for modern campuses
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-blue-400 mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/events" className="block text-slate-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-300">
                  Events
                </Link>
                <Link to="/login" className="block text-slate-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-300">
                  Login
                </Link>
                <Link to="/register" className="block text-slate-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-300">
                  Register
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-blue-400 mb-4">Contact</h4>
              <p className="text-slate-400 mb-2">Email: support@clubhub.com</p>
              <p className="text-slate-400">Phone: +91 XXX XXX XXXX</p>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>&copy; 2025 Club Hub. Built for Hackathon 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;