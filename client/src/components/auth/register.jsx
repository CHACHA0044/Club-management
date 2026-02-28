import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import Navbar from "../common/Navbar";
import ScrollReveal from "../common/ScrollReveal";


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
    setError(""); setSuccess("");
    setIsLoading(true);
    try {
      const res = await registerUser({ name, email, password, role });
      setSuccess(res.data.message || "Account created! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(160deg, #0a1628 0%, #0f2d6b 55%, #1a47a0 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease-out both; }
        .d1{animation-delay:.08s} .d2{animation-delay:.16s} .d3{animation-delay:.24s} .d4{animation-delay:.32s} .d5{animation-delay:.4s}
        .glass-field {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          color: #fff;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
          padding: 13px 14px 13px 46px;
          font-size: 0.9rem;
          font-family: 'Nunito', sans-serif;
          outline: none;
        }
        .glass-field::placeholder { color: rgba(255,255,255,0.3); }
        .glass-field:focus { border-color: rgba(59,130,246,0.6); background: rgba(255,255,255,0.09); }
        .submit-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          border: none; border-radius: 14px;
          color: #fff; font-size: 0.95rem; font-weight: 700;
          font-family: 'Nunito', sans-serif;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      <Navbar />

      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-16 left-8 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-10 right-8 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10 relative z-10">
        <ScrollReveal className="w-full max-w-md">

          {/* Glass card */}
          <div
            className="p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "24px",
            }}
          >
            {/* Header */}
            <div className="text-center mb-7 fade-up d1">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.35)" }}
              >
                <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                Events<span className="text-blue-400">@IU</span>
              </h1>
              <p className="text-white/50 text-sm">Create your account to get started</p>
            </div>

            {/* Error / Success */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300 fade-up"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-green-300 fade-up"
                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
                {success}
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">

              {/* Full Name */}
              <div className="fade-up d2">
                <label className="block text-white/55 text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                <div className="relative">
                  <svg className="w-4 h-4 text-blue-400/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-field"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="fade-up d2">
                <label className="block text-white/55 text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                <div className="relative">
                  <svg className="w-4 h-4 text-blue-400/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-field"
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="fade-up d3">
                <label className="block text-white/55 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                <div className="relative">
                  <svg className="w-4 h-4 text-blue-400/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-field"
                    style={{ paddingRight: "46px" }}
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-400/60 hover:text-blue-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Account Type */}
              <div className="fade-up d4">
                <label className="block text-white/55 text-xs font-bold uppercase tracking-widest mb-2">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "student", label: "Student", icon: "🎓" },
                    { value: "organizer", label: "Organizer", icon: "⚙️" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className="py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                      style={
                        role === opt.value
                          ? { background: "rgba(59,130,246,0.3)", border: "1px solid rgba(59,130,246,0.7)", color: "#fff" }
                          : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                      }
                    >
                      <span>{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="fade-up d5 mt-1">
                <button type="submit" disabled={isLoading} className="submit-btn">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>Create Account <span>→</span></>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div
              className="mt-6 pt-5 text-center fade-up d5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-white/40 text-sm mb-3">Already have an account?</p>
              <Link
                to="/login"
                className="inline-block px-5 py-2 rounded-xl text-sm font-semibold text-blue-300 hover:text-white transition-colors"
                style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)" }}
              >
                Sign In →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Register;