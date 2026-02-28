import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./common/Navbar";
import ScrollReveal from "./common/ScrollReveal";


const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
  const isLoggedIn = !!(sessionStorage.getItem("token") || localStorage.getItem("token"));

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-16px); }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.65s ease-out forwards; }
        .d1 { animation-delay: 0.08s; }
        .d2 { animation-delay: 0.2s;  }
        .d3 { animation-delay: 0.32s; }
        .d4 { animation-delay: 0.44s; }
        .d5 { animation-delay: 0.56s; }
        .orb  { animation: floatOrb 7s  ease-in-out infinite; }
        .orb2 { animation: floatOrb 9s  ease-in-out infinite 2s; }
        .orb3 { animation: floatOrb 11s ease-in-out infinite 4s; }

        .stat-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.25s ease;
        }
        .stat-card:hover { background: rgba(255,255,255,0.1); }

        .feature-pill {
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.25);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .feature-pill:hover {
          background: rgba(59,130,246,0.22);
          border-color: rgba(59,130,246,0.5);
        }

        .cta-primary {
          position: relative; overflow: hidden;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .cta-primary::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform 0.45s ease;
        }
        .cta-primary:hover::after { transform: translateX(100%); }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(37,99,235,0.55); }
        .cta-primary:active { transform: translateY(0); }

        .cta-ghost {
          border: 1.5px solid rgba(255,255,255,0.3);
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .cta-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.55); }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(160deg, #0a1628 0%, #0f2d6b 55%, #1a47a0 100%)',
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <Navbar user={user} isLoggedIn={isLoggedIn} />

        {/* ── HERO ── */}
        <section className="relative flex flex-col items-center justify-center min-h-screen px-5 pt-20 pb-16 overflow-hidden text-center">

          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <div className="orb  absolute top-24   left-[8%]  w-64 h-64 sm:w-96 sm:h-96  bg-blue-500   rounded-full blur-3xl opacity-[0.18]" />
            <div className="orb2 absolute bottom-16 right-[6%] w-56 h-56 sm:w-80 sm:h-80  bg-blue-400   rounded-full blur-3xl opacity-[0.14]" />
            <div className="orb3 absolute top-1/2  left-1/2  w-48 h-48  sm:w-64 sm:h-64  bg-indigo-500 rounded-full blur-3xl opacity-[0.1]  -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-5">

            {/* University badge */}
            <div className="fade-up d1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block shrink-0" />
              Integral University, Lucknow
            </div>

            {/* Brand */}
            <div className="fade-up d2">
              <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-none">
                Events<span className="text-blue-400">@IU</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/65 font-medium max-w-lg mx-auto leading-relaxed px-2">
                The official events portal for Integral University students and club organizers —
                discover, register, and manage campus events in one place.
              </p>
            </div>

            {/* CTA */}
            <div className="fade-up d3 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {isLoggedIn ? (
                <>
                  <button onClick={() => navigate("/events")}
                    className="cta-primary px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-800/40">
                    Browse Events →
                  </button>
                  <button onClick={() => navigate("/my-registrations")}
                    className="cta-ghost px-7 py-3 text-white font-semibold text-sm sm:text-base rounded-xl">
                    My Registrations
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/register")}
                    className="cta-primary px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-800/40">
                    Get Started →
                  </button>
                  <button onClick={() => navigate("/login")}
                    className="cta-ghost px-7 py-3 text-white font-semibold text-sm sm:text-base rounded-xl">
                    Sign In
                  </button>
                </>
              )}
            </div>

            {/* Feature chips */}
            <div className="fade-up d4 flex flex-wrap justify-center gap-2 sm:gap-3">
              {[
                { icon: "🗓️", label: "Register for Events" },
                { icon: "📣", label: "Club Announcements" },
                { icon: "✅", label: "Track Your Signups" },
                { icon: "🎓", label: "Student & Organizer Roles" },
              ].map((c) => (
                <div key={c.label}
                  className="feature-pill px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm text-white/75 font-medium select-none">
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="divider-line mx-6 sm:mx-16" />

        {/* ── ABOUT ── */}
        <section className="px-5 sm:px-10 py-14 sm:py-20 max-w-7xl mx-auto text-center">
          <div className="fade-up d4">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                Built for <span className="text-blue-400">IU Campus Life</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10">
                Events@IU replaces scattered WhatsApp groups, Google Forms, and email chains
                with a single, organized platform. Students can browse all live events, register
                with one tap, and stay updated. Organizers can create events, review applications,
                and send announcements — all from one dashboard.
              </p>
            </ScrollReveal>

            {/* Two-column features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  icon: "🎯",
                  title: "For Students",
                  desc: "Browse upcoming workshops, fests, and competitions. Register instantly and track your status in real time.",
                },
                {
                  icon: "⚙️",
                  title: "For Organizers",
                  desc: "Create and publish events, set participant limits, approve registrations, and broadcast updates to attendees.",
                },
                {
                  icon: "🔔",
                  title: "Announcements",
                  desc: "Stay informed with real-time club announcements. No more missed events due to buried group messages.",
                },
                {
                  icon: "📊",
                  title: "Registration Tracking",
                  desc: "See who registered, monitor capacity, and manage approvals — all in a clean, organised view.",
                },
              ].map((f, idx) => (
                <ScrollReveal key={f.title} delay={idx * 100}>
                  <div className="stat-card rounded-2xl p-5 flex gap-4 items-start h-full">
                    <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base mb-1">{f.title}</h3>
                      <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="divider-line mx-6 sm:mx-16" />
        <footer className="py-6 px-5 text-center">
          <p className="text-white/30 text-xs sm:text-sm">
            © {new Date().getFullYear()} Events@IU · Integral University, Lucknow
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;