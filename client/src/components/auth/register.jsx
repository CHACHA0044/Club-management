import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../../api/auth";
import Navbar from "../common/Navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await registerUser({ name, email, password, role });
      setSuccess(res.data.message || "Registration successful!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950">
      <Navbar user={null} isLoggedIn={false} />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-400/25 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 3 }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 4.5 }}
        />
      </div>

      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:40px_40px]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24 pb-12">
        <motion.div 
          className="w-full max-w-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
            variants={floatingVariants}
            animate="animate"
          />
          
          <motion.div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-blue-200/20"
            variants={itemVariants}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-6 shadow-lg shadow-blue-500/50"
                variants={floatingVariants}
                animate="animate"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-blue-950 mb-3 tracking-tight">
                Join Club Hub
              </h1>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full" />
                <div className="h-1 w-4 bg-blue-300 rounded-full" />
              </div>
              
              <p className="text-blue-800/70 text-lg font-medium">Create your account to get started</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {success && (
                <motion.div 
                  className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-2xl">✅</div>
                    <p className="text-green-700 font-semibold">{success}</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-2xl">⚠️</div>
                    <p className="text-red-700 font-semibold">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleRegister} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-blue-950 font-bold mb-3 text-sm uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <svg className="w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-blue-200 rounded-xl text-blue-950 font-medium text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-blue-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
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
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-blue-200 rounded-xl text-blue-950 font-medium text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-blue-200"
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
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
                    className="w-full pl-12 pr-14 py-3.5 bg-white border-2 border-blue-200 rounded-xl text-blue-950 font-medium text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-blue-200"
                    placeholder="Minimum 6 characters"
                    minLength="6"
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
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-blue-950 font-bold mb-3 text-sm uppercase tracking-wide">
                  Account Type
                </label>
                <div className="relative h-14 bg-gray-100 rounded-xl border-2 border-blue-200 p-1">
                  <motion.div
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg"
                    animate={{
                      x: role === "admin" ? "calc(100% + 8px)" : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                  <div className="relative h-full flex">
                    <button
                      type="button"
                      onClick={() => setRole("student")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-bold text-sm transition-colors ${
                        role === "student" ? "text-white" : "text-blue-900"
                      }`}
                    >
                      <span className="text-lg">🎓</span>
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-bold text-sm transition-colors ${
                        role === "admin" ? "text-white" : "text-blue-900"
                      }`}
                    >
                      <span className="text-lg">🎯</span>
                      <span>Organizer</span>
                    </button>
                  </div>
                </div>
                <motion.p 
                  className="text-sm text-blue-700 mt-2 text-center font-medium"
                  key={role}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {role === "student" 
                    ? "Register for events and track your participation" 
                    : "Create and manage events, approve registrations"}
                </motion.p>
              </motion.div>

              <motion.div className="flex items-start" variants={itemVariants}>
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-5 h-5 mt-0.5 text-blue-600 bg-white border-2 border-blue-300 rounded focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer transition-all" 
                  required
                />
                <label htmlFor="terms" className="ml-3 text-blue-900 font-medium text-sm">
                  I agree to the{" "}
                  <Link to="#" className="text-blue-600 font-bold hover:text-blue-800 transition-colors hover:underline">
                    Terms & Conditions
                  </Link>
                  {" "}and{" "}
                  <Link to="#" className="text-blue-600 font-bold hover:text-blue-800 transition-colors hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </form>

            <motion.div className="relative my-8" variants={itemVariants}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-blue-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-blue-800 font-bold text-sm tracking-wide">ALREADY REGISTERED?</span>
              </div>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <p className="text-blue-900 text-base mb-4 font-medium">
                Have an account already?
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-all hover:shadow-md border-2 border-blue-200 hover:border-blue-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </Link>
            </motion.div>

            <motion.div className="text-center mt-6 pt-6 border-t border-blue-100" variants={itemVariants}>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors font-semibold text-sm group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>

        <motion.div 
          className="absolute top-14 left-10 text-blue-300/10 text-9xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🎯
        </motion.div>
        <motion.div 
          className="absolute bottom-15 right-10 text-blue-300/10 text-9xl"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
};

export default Register;