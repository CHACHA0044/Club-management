import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import Navbar from "../common/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const userRole = res.data.user.role;

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
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes floatMedium {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, -20px) scale(1.1);
          }
        }

        @keyframes floatFast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes shimmerWave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .float-slow {
          animation: floatSlow 20s ease-in-out infinite;
        }

        .float-medium {
          animation: floatMedium 15s ease-in-out infinite;
        }

        .float-fast {
          animation: floatFast 4s ease-in-out infinite;
        }

        .pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmerWave 3s infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(59, 130, 246, 0.2);
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.4);
        }

        .btn-primary:active {
          transform: translateY(-1px);
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px white inset;
          -webkit-text-fill-color: #1e3a8a;
        }
      `}</style>

      <Navbar user={null} isLoggedIn={false} />

      <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950 gradient-shift">

          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl float-slow"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl float-medium"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/25 rounded-full blur-3xl float-slow" style={{ animationDelay: '5s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl float-medium" style={{ animationDelay: '7s' }}></div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent pulse-slow" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent pulse-slow" style={{ animationDelay: '4.5s' }}></div>
          </div>

          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 w-full max-w-lg">

          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl float-fast"></div>

          <div className="glass-card rounded-3xl shadow-2xl p-8 sm:p-12 border border-blue-200/20 animate-slideUp">

            <div className="text-center mb-10 animate-slideUp delay-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-6 float-fast shadow-lg shadow-blue-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-blue-950 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Welcome Back
              </h1>

              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"></div>
                <div className="h-1 w-4 bg-blue-300 rounded-full"></div>
              </div>

              <p className="text-blue-800/70 text-lg font-medium">Sign in to access your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl animate-slideUp shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-2xl">⚠️</div>
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">

              <div className="animate-slideUp delay-200">
                <label htmlFor="email" className="block text-blue-950 font-bold mb-3 text-sm uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <svg className="w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field w-full pl-12 pr-4 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-950 font-medium text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="animate-slideUp delay-300">
                <label htmlFor="password" className="block text-blue-950 font-bold mb-3 text-sm uppercase tracking-wide">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <svg className="w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full pl-12 pr-14 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-950 font-medium text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between animate-slideUp delay-400">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-white border-2 border-blue-300 rounded focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer transition-all"
                  />
                  <span className="ml-3 text-blue-900 font-semibold text-sm group-hover:text-blue-700 transition-colors">Remember me</span>
                </label>
                <Link
                  to="#"
                  className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors hover:underline decoration-2 underline-offset-4"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed animate-slideUp delay-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Signing you in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="relative my-8 animate-slideUp delay-500">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-blue-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-blue-800 font-bold text-sm tracking-wide">NEW HERE?</span>
              </div>
            </div>

            <div className="text-center animate-slideUp delay-500">
              <p className="text-blue-900 text-base mb-4 font-medium">
                Don't have an account yet?
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-all hover:shadow-md border-2 border-blue-200 hover:border-blue-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Create New Account</span>
              </Link>
            </div>

            <div className="text-center mt-6 pt-6 border-t border-blue-100 animate-slideUp delay-500">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors font-semibold text-sm group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl float-fast" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="absolute top-15 left-10 text-blue-300/10 text-9xl font-black float-slow">
          🔐
        </div>
        <div className="absolute bottom-15 right-10 text-blue-300/10 text-9xl font-black float-medium">
          ✨
        </div>
      </div>
    </>
  );
};

export default Login;