import React, { useState } from "react";
import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";

export default function Registration({
  isOpen,
  onClose,
  onSignupSuccess,
  onSwitchToLogin,
}) {
  if (!isOpen) return null;

  const accent = "#7a3cff";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_SIGNUP =
    "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/signup";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(API_SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Try again.");
        setLoading(false);
        return;
      }

      if (onSignupSuccess) onSignupSuccess(data);

      // Close signup modal
      onClose();

      // Open login modal & prefill email
      if (onSwitchToLogin) {
        setTimeout(() => {
          onSwitchToLogin(email);
        }, 300);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/google",
        { method: "POST" }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Google signup failed.");
        return;
      }

      if (onSignupSuccess) onSignupSuccess(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError("Google Sign-Up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm px-3">
      <div className="relative bg-transparent shadow-2xl w-full max-w-[850px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white animate-fadeIn">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl bg-primary">
          <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
            <FaHeart className="text-2xl" />
            <p className="text-2xl">MindSoul</p>
          </div>

          <div className="flex flex-col gap-6 font-sans">
            <p className="text-3xl font-medium leading-snug font-serif">
              Join MindSoul and begin your emotional wellness journey today.
            </p>
            <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
              <FaPlay className="text-white" />
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-2xl md:rounded-tr-2xl md:rounded-br-2xl space-y-5 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

          <div className="text-left space-y-2 w-[285px]">
            <h3 className="font-medium text-2xl font-heading">
              Create an Account
            </h3>
            <p className="text-[14px] text-gray-400 leading-relaxed">
              Join MindSoul Wellness to explore emotional healing and growth.
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-4 w-[285px]"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
            />

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-[285px] h-[45px] bg-primary hover:bg-light hover:text-textDark rounded-md transition text-white disabled:opacity-60 text-md"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex flex-col items-center gap-3">
            {/* <p className="text-lg">Or Sign Up with Google</p>
            <FaGoogle
              onClick={handleGoogleSignup}
              className="text-2xl cursor-pointer hover:scale-110 transition"
            /> */}
            <p
              onClick={() => {
                onClose();
                if (onSwitchToLogin) onSwitchToLogin();
              }}
              className="text-light hover:underline cursor-pointer mt-2 text-lg"
            >
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
