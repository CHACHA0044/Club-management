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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0%   { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .anim-fadeInUp     { animation: fadeInUp 0.8s ease-out forwards; }
        .anim-scaleIn      { animation: scaleIn 0.6s ease-out forwards; }
        .anim-slideInLeft  { animation: slideInLeft 0.8s ease-out forwards; }
        .anim-float        { animation: floatOrb 6s ease-in-out infinite; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .gradient-text {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 30%, #f06595 60%, #cc5de8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .feature-card {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }

        .btn-shimmer {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-shimmer::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.5s ease;
        }
        .btn-shimmer:hover::before { left: 100%; }
        .btn-shimmer:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
        .btn-shimmer:active { transform: translateY(0); }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)',
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <Navbar user={user} isLoggedIn={isLoggedIn} />

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 overflow-hidden pt-16">
          {/* Background blur orbs — contained inside this section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-24 left-8 sm:left-16 w-56 sm:w-96 h-56 sm:h-96 bg-blue-500 rounded-full blur-3xl opacity-20 anim-float" />
            <div className="absolute bottom-16 right-8 sm:right-20 w-48 sm:w-80 h-48 sm:h-80 bg-blue-400 rounded-full blur-3xl opacity-20 anim-float delay-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-blue-600 rounded-full blur-3xl opacity-15 anim-float delay-600" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
            {/* Brand Icon */}
            <div className="flex justify-center mb-6 anim-scaleIn">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40">
                <span className="text-2xl sm:text-4xl">🎯</span>
              </div>
            </div>

            {/* Heading */}
            <div className="anim-fadeInUp mb-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight">
                Welcome to
              </h1>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black gradient-text leading-tight mt-1">
                Club Hub
              </h1>
            </div>

            {/* Subtitle */}
            <p className="anim-fadeInUp delay-200 opacity-0 text-base sm:text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed font-medium px-2 mb-3"
              style={{ animationFillMode: 'forwards' }}>
              Your centralized platform for managing college club events, registrations, and announcements
            </p>

            <p className="anim-fadeInUp delay-300 opacity-0 text-sm sm:text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed px-2 mb-8"
              style={{ animationFillMode: 'forwards' }}>
              Say goodbye to scattered Google Forms and WhatsApp groups. Streamline everything in one unified platform.
            </p>

            {/* CTA Buttons */}
            <div className="anim-fadeInUp delay-400 opacity-0 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
              style={{ animationFillMode: 'forwards' }}>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/events")}
                    className="btn-shimmer px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl shadow-pink-500/30"
                  >
                    <span className="flex items-center justify-center gap-2">Browse Events <span>→</span></span>
                  </button>
                  <button
                    onClick={() => navigate("/my-registrations")}
                    className="btn-shimmer px-8 py-4 glass-card text-white font-bold text-base sm:text-lg rounded-2xl hover:bg-white/10"
                  >
                    My Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="btn-shimmer px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl shadow-pink-500/30"
                  >
                    <span className="flex items-center justify-center gap-2">Get Started <span>→</span></span>
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-shimmer px-8 py-4 rounded-2xl text-white font-bold text-base sm:text-lg border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-colors"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            {/* Mini Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mt-14 sm:mt-20 px-2">
              {[
                { emoji: "🎯", title: "Smart Management", desc: "Powerful tools for every club" },
                { emoji: "📅", title: "Event Tracking", desc: "Never miss an update again" },
                { emoji: "✅", title: "Easy Registration", desc: "One-tap signup process" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 sm:p-6 rounded-2xl feature-card anim-scaleIn opacity-0 text-left"
                  style={{ animationDelay: `${0.5 + idx * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="text-4xl mb-3">{feature.emoji}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CLUB HUB ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Why Choose Club Hub?</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mb-4 rounded-full" />
              <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto">
                Everything you need to manage club activities effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: "👥", title: "For Students",
                  items: ["Discover upcoming events instantly", "Register with one simple click", "Track registration status live", "Receive real-time announcements"],
                  accent: "",
                },
                {
                  icon: "⚡", title: "For Organizers",
                  items: ["Create and manage events", "Approve / reject participants", "Send mass announcements", "View participant analytics"],
                  accent: "bg-gradient-to-br from-pink-500/10 to-red-500/10",
                },
                {
                  icon: "🎓", title: "For Clubs",
                  items: ["Centralized event management", "No more Google Forms chaos", "Professional appearance", "Better engagement tracking"],
                  accent: "",
                },
              ].map((card, idx) => (
                <div key={idx} className={`glass-card ${card.accent} p-7 sm:p-8 rounded-3xl feature-card md:${idx === 2 ? 'col-span-2 lg:col-span-1' : ''}`}>
                  <div className="text-5xl sm:text-6xl mb-5">{card.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{card.title}</h3>
                  <ul className="space-y-3 text-white/75 text-sm sm:text-base">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-pink-400 font-bold text-lg shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">How It Works</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mb-4 rounded-full" />
              <p className="text-base sm:text-xl text-white/60 max-w-xl mx-auto">Get started in four simple steps</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { num: 1, emoji: "🚀", title: "Create Account", desc: "Sign up as a student or club admin in seconds" },
                { num: 2, emoji: "🔍", title: "Explore Events", desc: "Browse all upcoming club events in one place" },
                { num: 3, emoji: "📝", title: "Register", desc: "Click to register and get instant confirmation" },
                { num: 4, emoji: "📢", title: "Stay Updated", desc: "Receive announcements and track your status" },
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/30 hover:scale-110 transition-transform">
                    <span className="text-xl sm:text-3xl font-black text-white">{step.num}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl mb-3">{step.emoji}</div>
                  <h3 className="text-base sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Trusted by Students</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { number: "500+", label: "Active Students" },
                { number: "50+", label: "Campus Clubs" },
                { number: "200+", label: "Events Hosted" },
                { number: "98%", label: "Satisfaction" },
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 sm:p-8 rounded-3xl text-center feature-card">
                  <div className="text-3xl sm:text-5xl font-black gradient-text mb-2">{stat.number}</div>
                  <p className="text-white/70 font-medium text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">
              Ready to Transform Your Club Management?
            </h2>
            <p className="text-base sm:text-xl text-white/60 mb-10">
              Join hundreds of students and clubs already using Club Hub
            </p>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/register")}
                className="btn-shimmer px-10 sm:px-16 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-2xl shadow-pink-500/30"
              >
                <span className="flex items-center justify-center gap-3">
                  Start Free Today <span className="text-2xl">→</span>
                </span>
              </button>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-black/40 py-10 sm:py-14 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-2xl font-black gradient-text mb-3">Club Hub</h4>
                <p className="text-white/50 text-sm leading-relaxed">Simplifying club management for modern campuses</p>
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-3">Quick Links</h4>
                <div className="space-y-2">
                  {[["Events", "/events"], ["Login", "/login"], ["Register", "/register"]].map(([label, path]) => (
                    <button key={label} onClick={() => navigate(path)} className="block text-white/50 hover:text-pink-400 transition-colors text-sm">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-3">Contact</h4>
                <p className="text-white/50 text-sm mb-1">📧 support@clubhub.com</p>
                <p className="text-white/50 text-sm">📞 +91 XXX XXX XXXX</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-center">
              <p className="text-white/40 text-sm">© 2025 Club Hub. Built with ❤️ for students.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;