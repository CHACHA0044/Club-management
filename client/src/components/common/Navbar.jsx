import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── animation variants ─────────────────────────────────────────── */
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.045 },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: -12 },
  open: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } },
};

/* ── component ──────────────────────────────────────────────────── */
const Navbar = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);

  const isOrganizer = user?.role === "organizer" || user?.role === "admin";
  const isStudent = user?.role === "student";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => { setMobileMenu(false); }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const getDailyEmoji = () => {
    const emojis = ["🌟", "🔥", "🚀", "⚡", "✨", "🌈", "💎"];
    const dayIndex = new Date().getDay(); // 0 is Sunday
    return emojis[dayIndex];
  };

  const formatName = (name) => {
    if (!name) return "User";
    const firstName = name.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.05 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl rounded-b-3xl overflow-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* ── Main bar ── */}
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Brand */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group shrink-0"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600/30 border border-blue-400/30 rounded-lg flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            {!isHomePage && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-xl font-black text-white"
              >
                Events<span className="text-blue-400">@IU</span>
              </motion.span>
            )}
          </motion.button>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {isLoggedIn ? (
              <>
                {isOrganizer && (
                  <>
                    <NavBtn active={isActive("/organizer")} onClick={() => navigate("/organizer")}>Dashboard</NavBtn>
                    <NavBtn active={isActive("/events")} onClick={() => navigate("/events")}>Browse Events</NavBtn>
                  </>
                )}
                {isStudent && (
                  <>
                    <NavBtn active={isActive("/events")} onClick={() => navigate("/events")}>Events</NavBtn>
                    <NavBtn active={isActive("/my-registrations")} onClick={() => navigate("/my-registrations")}>My Registrations</NavBtn>
                  </>
                )}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                  <div className="flex flex-col items-start gap-0">
                    <span className="hidden xl:block text-white/55 text-sm">
                      {getDailyEmoji()}, <span className="text-blue-300 font-black">{formatName(user?.name)}</span>
                    </span>
                    {isStudent && <div className="h-0.5 w-full bg-green-500 rounded-full mt-0.5"></div>}
                    {isOrganizer && <div className="h-0.5 w-full bg-purple-500 rounded-full mt-0.5"></div>}
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white rounded-xl text-sm font-semibold transition-colors"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {!isActive("/login") && (
                  <motion.button
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 text-sm font-semibold rounded-xl transition-all text-blue-300 hover:text-white"
                    style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.5)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    Login
                  </motion.button>
                )}
                {!isActive("/register") && (
                  <motion.button
                    onClick={() => navigate("/register")}
                    className="px-5 py-2 text-sm font-semibold rounded-xl transition-all text-blue-300 hover:text-white"
                    style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.5)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    Register
                  </motion.button>
                )}
              </div>
            )}
          </nav>

          {/* ── Mobile right side ── */}
          <div className="flex lg:hidden items-center gap-2">
            {isLoggedIn && (isStudent || isOrganizer) && (
              <div className="flex flex-col items-center">
                <span className="text-[10px] mt-1 sm:mt-0 font-black text-blue-300 uppercase leading-none">
                  {getDailyEmoji()}, {formatName(user?.name)}
                </span>
                <div className={`h-0.5 w-full rounded-full mt-0.5 ${isStudent ? 'bg-green-500' : 'bg-purple-500'}`}></div>
              </div>
            )}
            <motion.button
              onClick={() => setMobileMenu((v) => !v)}
              className="p-2.5 text-white rounded-xl hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden overflow-hidden rounded-b-2xl"
          >
            <motion.div className="px-4 py-5 flex flex-col gap-1.5 overflow-hidden">

              {isLoggedIn ? (
                <>
                  {/* User greeting */}
                  {isOrganizer && (
                    <>
                      <MobileNavBtn variants={itemVariants} active={isActive("/organizer")} onClick={() => navigate("/organizer")}>
                        <span>📊</span> Dashboard
                      </MobileNavBtn>
                      <MobileNavBtn variants={itemVariants} active={isActive("/events")} onClick={() => navigate("/events")}>
                        <span>🗓️</span> Browse Events
                      </MobileNavBtn>
                    </>
                  )}
                  {isStudent && (
                    <>
                      <MobileNavBtn variants={itemVariants} active={isActive("/events")} onClick={() => navigate("/events")}>
                        <span>🗓️</span> Events
                      </MobileNavBtn>
                      <MobileNavBtn variants={itemVariants} active={isActive("/my-registrations")} onClick={() => navigate("/my-registrations")}>
                        <span>📋</span> My Registrations
                      </MobileNavBtn>
                    </>
                  )}

                  {/* Logout */}
                  <motion.div variants={itemVariants} className="mt-2 pt-2 border-t border-white/8">
                    <MobileNavBtn onClick={handleLogout}>
                      <span>🚪</span> Logout
                    </MobileNavBtn>
                  </motion.div>
                </>
              ) : (
                <>
                  {!isActive("/login") && (
                    <MobileNavBtn
                      variants={itemVariants}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </MobileNavBtn>
                  )}
                  {!isActive("/register") && (
                    <MobileNavBtn
                      variants={itemVariants}
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </MobileNavBtn>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header >
  );
};

/* ── Helper sub-components ────────────────────────────────────────── */

const NavBtn = ({ children, active, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${active
      ? "text-white bg-white/12"
      : "text-white/70 hover:text-white hover:bg-white/8"
      }`}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.94 }}
  >
    {children}
    {active && (
      <motion.span
        layoutId="nav-underline"
        className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-400 rounded-full"
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
    )}
  </motion.button>
);

const MobileNavBtn = ({ children, active, onClick, primary, variants }) => (
  <motion.button
    variants={variants}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold text-left transition-colors ${active ? "bg-white/10 text-white" : "text-blue-300 hover:text-white"
      }`}
    style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.5)' }}
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);

const RoleBadge = ({ organizer, compact }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${organizer ? "bg-purple-600/80 text-white" : "bg-green-600/80 text-white"
    }`}>
    {compact
      ? (organizer ? "🎯" : "🎓")
      : (organizer ? "Organizer" : "Student")}
  </span>
);

export default Navbar;