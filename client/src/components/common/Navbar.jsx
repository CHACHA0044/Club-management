import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
  const isLoggedIn = !!(sessionStorage.getItem("token") || localStorage.getItem("token"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: isScrolled 
      ? "rgba(255, 255, 255, 0.95)" 
      : "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: isScrolled 
      ? "0 4px 20px rgba(30, 64, 175, 0.1)" 
      : "0 2px 10px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: isScrolled ? "0.75rem 0" : "1rem 0",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const brandStyle = {
    fontSize: "1.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #1e40af, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textDecoration: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const navLinksContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const linkStyle = (active) => ({
    color: active ? "#1e40af" : "#475569",
    textDecoration: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    fontWeight: active ? "600" : "500",
    fontSize: "0.95rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    background: active ? "rgba(30, 64, 175, 0.08)" : "transparent",
    cursor: "pointer",
  });

  const buttonStyle = {
    color: "white",
    background: "linear-gradient(135deg, #1e40af, #3b82f6)",
    border: "none",
    padding: "0.6rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 10px rgba(30, 64, 175, 0.2)",
  };

  const mobileMenuButtonStyle = {
    display: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    color: "#1e40af",
    fontSize: "1.5rem",
  };

  const mobileMenuStyle = {
    display: "none",
    position: "fixed",
    top: isScrolled ? "60px" : "72px",
    left: 0,
    right: 0,
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(30, 64, 175, 0.1)",
    padding: "1.5rem",
    flexDirection: "column",
    gap: "0.75rem",
    animation: "slideDown 0.3s ease-out",
    borderTop: "1px solid rgba(30, 64, 175, 0.1)",
  };

  const mobileLinkStyle = (active) => ({
    ...linkStyle(active),
    width: "100%",
    textAlign: "center",
    padding: "0.8rem 1rem",
  });

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .nav-link:hover {
            background: rgba(30, 64, 175, 0.08);
            color: #1e40af;
            transform: translateY(-2px);
          }

          .nav-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(30, 64, 175, 0.4);
          }

          .nav-button:active {
            transform: translateY(0);
          }

          .brand-link:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
          }

          .mobile-menu-button {
            display: none;
          }

          @media (max-width: 768px) {
            .nav-links-desktop {
              display: none !important;
            }

            .mobile-menu-button {
              display: block !important;
            }

            .mobile-menu-open {
              display: flex !important;
            }
          }

          @media (min-width: 769px) {
            .mobile-menu {
              display: none !important;
            }
          }

          /* Hamburger Animation */
          .hamburger {
            width: 24px;
            height: 20px;
            position: relative;
            cursor: pointer;
          }

          .hamburger span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: #1e40af;
            border-radius: 3px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: 0.25s ease-in-out;
          }

          .hamburger span:nth-child(1) {
            top: 0px;
          }

          .hamburger span:nth-child(2) {
            top: 8px;
          }

          .hamburger span:nth-child(3) {
            top: 16px;
          }

          .hamburger.open span:nth-child(1) {
            top: 8px;
            transform: rotate(135deg);
          }

          .hamburger.open span:nth-child(2) {
            opacity: 0;
            left: -30px;
          }

          .hamburger.open span:nth-child(3) {
            top: 8px;
            transform: rotate(-135deg);
          }
        `}
      </style>

      <nav style={navStyle}>
        <div style={containerStyle}>
          {/* Brand */}
          <Link 
            to="/" 
            style={brandStyle}
            className="brand-link"
            onClick={handleLinkClick}
          >
            Club Hub
          </Link>

          {/* Desktop Navigation */}
          <div 
            style={navLinksContainerStyle}
            className="nav-links-desktop"
          >
            <Link 
              to="/events" 
              style={linkStyle(isActive("/events"))}
              className="nav-link"
            >
              Events
            </Link>

            {isLoggedIn ? (
              <>
                {user?.role === "admin" ? (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      style={linkStyle(isActive("/admin/dashboard"))}
                      className="nav-link"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/admin/events/create" 
                      style={linkStyle(isActive("/admin/events/create"))}
                      className="nav-link"
                    >
                      Create Event
                    </Link>
                  </>
                ) : (
                  <Link 
                    to="/my-registrations" 
                    style={linkStyle(isActive("/my-registrations"))}
                    className="nav-link"
                  >
                    My Registrations
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  style={buttonStyle}
                  className="nav-button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={linkStyle(isActive("/login"))}
                  className="nav-link"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  style={{...buttonStyle, textDecoration: "none", display: "inline-block"}}
                  className="nav-button"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            style={mobileMenuButtonStyle}
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          style={mobileMenuStyle}
          className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        >
          <Link 
            to="/events" 
            style={mobileLinkStyle(isActive("/events"))}
            className="nav-link"
            onClick={handleLinkClick}
          >
            Events
          </Link>

          {isLoggedIn ? (
            <>
              {user?.role === "admin" ? (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    style={mobileLinkStyle(isActive("/admin/dashboard"))}
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/admin/events/create" 
                    style={mobileLinkStyle(isActive("/admin/events/create"))}
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Create Event
                  </Link>
                </>
              ) : (
                <Link 
                  to="/my-registrations" 
                  style={mobileLinkStyle(isActive("/my-registrations"))}
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  My Registrations
                </Link>
              )}
              <button 
                onClick={handleLogout}
                style={{...buttonStyle, width: "100%"}}
                className="nav-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                style={mobileLinkStyle(isActive("/login"))}
                className="nav-link"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={{...buttonStyle, width: "100%", textDecoration: "none", display: "block", textAlign: "center"}}
                className="nav-button"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div style={{ height: isScrolled ? "60px" : "72px" }}></div>
    </>
  );
};

export default Navbar;