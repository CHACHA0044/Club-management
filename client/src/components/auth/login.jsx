import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import Navbar from "../common/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await loginUser({ email, password });
      
      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // Get user role from response
      const userRole = res.data.user.role;
      
      // Redirect based on role
      if (userRole === "organizer" || userRole === "admin") {
        navigate("/organizer");
      } else {
        navigate("/events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        
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
            transform: translateY(-20px);
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

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 3s linear infinite;
        }

        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-pulseGlow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        input:focus {
          outline: none;
        }
      `}</style>
      <Navbar user={null} isLoggedIn={false} />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-black gradient-animate">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0.6s' }}></div>
          </div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-blue-900 p-8 md:p-10 animate-fadeInUp">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-black text-blue-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welcome Back
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Sign in to continue to Club Hub</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl animate-fadeInUp">
                <p className="text-red-700 text-center font-semibold">⚠️ {error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="animate-fadeInUp delay-100">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-lg">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-blue-900 text-xl">📧</span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-blue-900 rounded-xl text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all duration-300"
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="animate-fadeInUp delay-200">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2 text-lg">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-blue-900 text-xl">🔒</span>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-blue-900 rounded-xl text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between animate-fadeInUp delay-300">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-blue-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-700 font-medium">Remember me</span>
                </label>
                <a href="#" className="text-blue-900 font-bold hover:text-blue-700 transition-colors duration-300">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fadeInUp delay-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 animate-fadeInUp delay-300">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-semibold">OR</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center animate-fadeInUp delay-300">
              <p className="text-gray-600 text-lg">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-blue-900 font-bold hover:text-blue-700 transition-colors duration-300 underline decoration-2 underline-offset-4"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6 animate-fadeInUp delay-300">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors duration-300 font-medium"
              >
                <span>←</span>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </>
  );
};

export default Login;