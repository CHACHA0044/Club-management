import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./common/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
  const isLoggedIn = !!(sessionStorage.getItem("token") || localStorage.getItem("token"));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .gradient-text {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 25%, #f06595 50%, #cc5de8 75%, #845ef7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        @media (max-width: 768px) {
          .mobile-text-sm {
            font-size: 0.875rem;
          }
          .mobile-text-base {
            font-size: 1rem;
          }
          .mobile-text-lg {
            font-size: 1.125rem;
          }
          .mobile-text-xl {
            font-size: 1.25rem;
          }
          .mobile-text-2xl {
            font-size: 1.5rem;
          }
          .mobile-text-3xl {
            font-size: 1.875rem;
          }
          .mobile-text-4xl {
            font-size: 2.25rem;
          }
        }
      `}</style>

      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <Navbar user={user} isLoggedIn={isLoggedIn} />
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
           <div className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-80 sm:h-80 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-float delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-float delay-600"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center space-y-6 sm:space-y-8 mb-12">
              {/* Logo/Brand */}
              <div className="flex items-center justify-center gap-3 mb-4 animate-scaleIn">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <span className="text-2xl sm:text-3xl">🎯</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="animate-fadeInUp">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4" style={{ fontFamily: "sans-serif" }}>
                  Welcome to
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black gradient-text mb-6" style={{ fontFamily: " sans-serif" }}>
                  Club Hub
                </h1>
              </div>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium animate-fadeInUp delay-200 px-4">
                Your centralized platform for managing college club events, registrations, and announcements
              </p>
              
              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-300 px-4">
                Say goodbye to scattered Google Forms and WhatsApp groups. Streamline your club activities in one unified platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fadeInUp delay-400 px-4">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate("/events")}
                      className="btn-primary px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-pink-500/30 transform hover:scale-105 transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Browse Events</span>
                        <span>→</span>
                      </span>
                    </button>
                    <button
                      onClick={() => navigate("/my-registrations")}
                      className="px-8 py-4 glass-effect text-white font-bold text-lg rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all"
                    >
                      My Dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      className="btn-primary px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-pink-500/30 transform hover:scale-105 transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Get Started</span>
                        <span>→</span>
                      </span>
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-8 py-4 glass-effect text-white font-bold text-lg rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 px-4">
              {[
                { emoji: "🎯", title: "Smart Management", desc: "Organize efficiently with powerful tools" },
                { emoji: "📅", title: "Event Tracking", desc: "Never miss important updates" },
                { emoji: "✅", title: "Easy Registration", desc: "One-click signup process" }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-effect p-6 rounded-2xl card-hover animate-scaleIn"
                  style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                >
                  <div className="text-5xl mb-4">{feature.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Why Choose Club Hub?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mb-6"></div>
              <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                Everything you need to manage club activities effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 - Students */}
              <div className="glass-effect p-8 rounded-3xl card-hover">
                <div className="text-6xl mb-6">👥</div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  For Students
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Discover upcoming events instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Register with one simple click</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Track registration status live</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Receive real-time announcements</span>
                  </li>
                </ul>
              </div>

              {/* Feature Card 2 - Organizers */}
              <div className="glass-effect p-8 rounded-3xl card-hover bg-gradient-to-br from-pink-500/10 to-red-500/10">
                <div className="text-6xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  For Organizers
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Create and manage events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Approve/reject participants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Send mass announcements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>View participant analytics</span>
                  </li>
                </ul>
              </div>

              {/* Feature Card 3 - Clubs */}
              <div className="glass-effect p-8 rounded-3xl card-hover md:col-span-2 lg:col-span-1">
                <div className="text-6xl mb-6">🎓</div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  For Clubs
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Centralized event management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>No more Google Forms chaos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Professional appearance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold text-xl">✓</span>
                    <span>Better engagement tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                How It Works
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mb-6"></div>
              <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                Get started in four simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: 1, emoji: "🚀", title: "Create Account", desc: "Sign up as a student or club admin in seconds" },
                { num: 2, emoji: "🔍", title: "Explore Events", desc: "Browse all upcoming club events in one place" },
                { num: 3, emoji: "📝", title: "Register", desc: "Click to register and get instant confirmation" },
                { num: 4, emoji: "📢", title: "Stay Updated", desc: "Receive announcements and track your status" }
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/30 transform hover:scale-110 transition-all">
                    <span className="text-3xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {step.num}
                    </span>
                  </div>
                  <div className="text-4xl mb-4">{step.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-white/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Trusted by Students
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "500+", label: "Active Students" },
                { number: "50+", label: "Campus Clubs" },
                { number: "200+", label: "Events Hosted" },
                { number: "98%", label: "Satisfaction" }
              ].map((stat, idx) => (
                <div key={idx} className="glass-effect p-8 rounded-3xl text-center card-hover">
                  <div className="text-4xl sm:text-5xl font-black gradient-text mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {stat.number}
                  </div>
                  <p className="text-white/80 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              Ready to Transform Your Club Management?
            </h2>
            <p className="text-lg sm:text-xl text-white/70 mb-10">
              Join hundreds of students and clubs already using Club Hub
            </p>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/register")}
                className="btn-primary px-12 py-5 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-xl rounded-xl shadow-2xl shadow-pink-500/30 transform hover:scale-105 transition-all"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Start Free Today</span>
                  <span className="text-2xl">→</span>
                </span>
              </button>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-2xl font-bold gradient-text mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Club Hub
                </h4>
                <p className="text-white/60 leading-relaxed">
                  Simplifying club management for modern campuses
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate("/events")} className="block text-white/60 hover:text-pink-400 transition-colors">
                    Events
                  </button>
                  <button onClick={() => navigate("/login")} className="block text-white/60 hover:text-pink-400 transition-colors">
                    Login
                  </button>
                  <button onClick={() => navigate("/register")} className="block text-white/60 hover:text-pink-400 transition-colors">
                    Register
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
                <p className="text-white/60 mb-2">📧 support@clubhub.com</p>
                <p className="text-white/60">📞 +91 XXX XXX XXXX</p>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-white/50">&copy; 2025 Club Hub. Built with ❤️ for students.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;