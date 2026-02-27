import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isOrganizer = user?.role === "organizer" || user?.role === "admin";
  const isStudent = user?.role === "student";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-blue-950/80 backdrop-blur-xl shadow-lg shadow-blue-900/20' 
          : 'bg-transparent'
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <motion.button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg 
                className="w-7 h-7 text-white group-hover:text-blue-300 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </motion.div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Club Hub
            </h1>
          </motion.button>

          <nav className="hidden lg:flex items-center gap-1">
            {isLoggedIn ? (
              <>
                {isOrganizer && (
                  <>
                    <motion.button
                      onClick={() => navigate("/organizer")}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${
                        isActive("/organizer") 
                          ? "text-white bg-white/10" 
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Dashboard
                      {isActive("/organizer") && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => navigate("/events")}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${
                        isActive("/events") 
                          ? "text-white bg-white/10" 
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Events
                      {isActive("/events") && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  </>
                )}

                {isStudent && (
                  <>
                    <motion.button
                      onClick={() => navigate("/events")}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${
                        isActive("/events") 
                          ? "text-white bg-white/10" 
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Events
                      {isActive("/events") && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => navigate("/my-registrations")}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${
                        isActive("/my-registrations") 
                          ? "text-white bg-white/10" 
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      My Registrations
                      {isActive("/my-registrations") && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  </>
                )}

                <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/10">
                  <div className="hidden xl:flex items-center gap-2">
                    <span className="text-white/60 text-sm">Welcome,</span>
                    <span className="text-blue-300 font-semibold text-sm">{user?.name || "User"}</span>
                  </div>

                  {user?.role && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg ${
                        isOrganizer 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' 
                          : 'bg-gradient-to-r from-green-500 to-green-700 text-white'
                      }`}
                    >
                      {isOrganizer ? '🎯' : '🎓'}
                    </motion.span>
                  )}

                  <motion.button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => navigate("/register")}
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/30 transition-all"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </div>
            )}
          </nav>

          <div className="flex lg:hidden items-center gap-2">
            {isLoggedIn && user?.role && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isOrganizer 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-green-700 text-white'
                }`}
              >
                {isOrganizer ? '🎯' : '🎓'}
              </motion.span>
            )}
            
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-white/10 overflow-hidden"
            >
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <div className="px-3 py-2 text-white/60 text-xs font-medium">
                    Welcome, <span className="text-blue-300 font-semibold">{user?.name || "User"}</span>
                  </div>

                  {isOrganizer && (
                    <>
                      <motion.button
                        onClick={() => navigate("/organizer")}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg text-left ${
                          isActive("/organizer") 
                            ? "text-white bg-white/10" 
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        📊 Dashboard
                      </motion.button>
                      <motion.button
                        onClick={() => navigate("/events")}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg text-left ${
                          isActive("/events") 
                            ? "text-white bg-white/10" 
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🎉 Browse Events
                      </motion.button>
                    </>
                  )}

                  {isStudent && (
                    <>
                      <motion.button
                        onClick={() => navigate("/events")}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg text-left ${
                          isActive("/events") 
                            ? "text-white bg-white/10" 
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🎉 Events
                      </motion.button>
                      <motion.button
                        onClick={() => navigate("/my-registrations")}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg text-left ${
                          isActive("/my-registrations") 
                            ? "text-white bg-white/10" 
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        📋 My Registrations
                      </motion.button>
                    </>
                  )}

                  <div className="mt-2 pt-2 border-t border-white/10">
                    <motion.button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium text-left"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🚪 Logout
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <motion.button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/30"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;