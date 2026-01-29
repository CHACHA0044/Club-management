import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();
  const isOrganizer = user?.role === "organizer" || user?.role === "admin";
  const isStudent = user?.role === "student";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo/Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="text-white hover:text-blue-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Club Hub
                </span>
              </h1>
            </div>

            {/* Navigation Links & User Menu */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  {/* Role-based Navigation */}
                  {isOrganizer && (
                    <>
                      <button
                        onClick={() => navigate("/organizer")}
                        className="hidden sm:block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => navigate("/events")}
                        className="hidden sm:block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
                      >
                        Browse Events
                      </button>
                    </>
                  )}

                  {isStudent && (
                    <>
                      <button
                        onClick={() => navigate("/events")}
                        className="hidden sm:block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
                      >
                        Events
                      </button>
                      <button
                        onClick={() => navigate("/my-registrations")}
                        className="hidden sm:block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
                      >
                        My Registrations
                      </button>
                    </>
                  )}

                  {/* User Info */}
                  <span className="hidden sm:inline text-white/80 text-sm">
                    Welcome, <span className="font-semibold text-blue-300">{user?.name || "User"}</span>
                  </span>

                  {/* Role Badge */}
                  {user?.role && (
                    <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      isOrganizer 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-green-700 text-white'
                    }`}>
                      {isOrganizer ? '🎯 Organizer' : '🎓 Student'}
                    </span>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
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

          {/* Mobile Navigation Menu (only for logged in users) */}
          {isLoggedIn && (
            <div className="sm:hidden mt-4 flex flex-wrap gap-2">
              {isOrganizer && (
                <>
                  <button
                    onClick={() => navigate("/organizer")}
                    className="flex-1 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium text-center"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/events")}
                    className="flex-1 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium text-center"
                  >
                    Events
                  </button>
                </>
              )}

              {isStudent && (
                <>
                  <button
                    onClick={() => navigate("/events")}
                    className="flex-1 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium text-center"
                  >
                    Events
                  </button>
                  <button
                    onClick={() => navigate("/my-registrations")}
                    className="flex-1 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium text-center"
                  >
                    My Registrations
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;