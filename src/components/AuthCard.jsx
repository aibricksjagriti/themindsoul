import { useState, useRef } from "react";

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState("login");
  const cardRef = useRef(null);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      const firstInput = document.querySelector(`#${tab} input`);
      firstInput?.focus();
    }, 120);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const invalidInput = Array.from(form.querySelectorAll("input")).find(
      (input) => !input.checkValidity()
    );

    if (invalidInput) {
      invalidInput.focus();
      invalidInput.setAttribute("aria-invalid", "true");
      const card = cardRef.current;
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
      return;
    }

    const btn = form.querySelector(".btn");
    const prevText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Done ✓";

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = prevText;
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b1020] to-[#111a2f] text-[#eaf1ff]">
      {/* Blobs background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-[45vmax] h-[45vmax] bg-gradient-to-br from-[#7aa8ff] via-transparent to-transparent blur-[60px] opacity-55 animate-blob1 left-[-10vmax] top-[-8vmax] mix-blend-screen"></div>
        <div className="absolute w-[45vmax] h-[45vmax] bg-gradient-to-br from-[#b58bff] via-[#7aa8ff] to-transparent blur-[60px] opacity-55 animate-blob2 right-[-12vmax] bottom-[-14vmax] mix-blend-screen"></div>
        <div className="absolute w-[50vmax] h-[50vmax] bg-gradient-to-br from-[#4de6d1] via-[#8db6ff] to-transparent blur-[60px] opacity-45 animate-blob3 left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
        <div className="grain absolute inset-[-50%] opacity-10 pointer-events-none"></div>
      </div>

      {/* Auth Card */}
      <div
        ref={cardRef}
        className="card w-[92vw] max-w-[520px] rounded-[22px] border border-white/15 bg-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl saturate-125 overflow-hidden"
      >
        {/* Tabs */}
        <nav className="flex justify-center gap-2 p-3 bg-gradient-to-b from-white/10 to-white/5">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`tab font-bold px-4 py-2 rounded-full text-sm transition ${
                activeTab === tab
                  ? "text-white bg-gradient-to-r from-[#87b4ff40] to-[#55e3c440] shadow-inner"
                  : "text-[#a8b6d5]"
              }`}
            >
              {tab === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </nav>

        {/* Panel */}
        {activeTab === "login" ? (
          <section
            id="login"
            className="p-6 animate-fadeup"
            aria-labelledby="tab-login"
          >
            <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder=" "
                  autoComplete="email"
                  className="peer w-full text-base text-white p-4 rounded-xl bg-[rgba(12,18,32,0.45)] border border-white/20 focus:border-[#87b4ff] focus:shadow-[0_0_0_4px_rgba(135,180,255,0.18),0_10px_22px_rgba(0,0,0,0.25)] outline-none"
                />
                <label
                  htmlFor="login-email"
                  className="absolute left-3 top-3 px-1 text-[#a8b6d5] bg-[rgba(12,18,32,0.8)] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#a8b6d5] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[#87b4ff]"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type="password"
                  required
                  minLength="6"
                  placeholder=" "
                  autoComplete="current-password"
                  className="peer w-full text-base text-white p-4 rounded-xl bg-[rgba(12,18,32,0.45)] border border-white/20 focus:border-[#87b4ff] focus:shadow-[0_0_0_4px_rgba(135,180,255,0.18),0_10px_22px_rgba(0,0,0,0.25)] outline-none"
                />
                <label
                  htmlFor="login-password"
                  className="absolute left-3 top-3 px-1 text-[#a8b6d5] bg-[rgba(12,18,32,0.8)] transition-all peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[#87b4ff]"
                >
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="btn w-full py-3 rounded-xl font-extrabold text-[#0b111c] bg-gradient-to-r from-[#87b4ff] to-[#55e3c4] shadow-[0_14px_28px_rgba(135,180,255,0.25),0_10px_22px_rgba(85,227,196,0.18)] hover:brightness-110 active:scale-95 transition"
              >
                Log in
              </button>
              <p className="text-center text-[#a8b6d5] text-sm mt-2">
                No account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabSwitch("signup")}
                  className="text-[#87b4ff] underline"
                >
                  Create one
                </button>
              </p>
            </form>
          </section>
        ) : (
          <section
            id="signup"
            className="p-6 animate-fadeup"
            aria-labelledby="tab-signup"
          >
            <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  id="signup-name"
                  type="text"
                  required
                  placeholder=" "
                  autoComplete="name"
                  className="peer w-full text-base text-white p-4 rounded-xl bg-[rgba(12,18,32,0.45)] border border-white/20 focus:border-[#87b4ff] focus:shadow-[0_0_0_4px_rgba(135,180,255,0.18),0_10px_22px_rgba(0,0,0,0.25)] outline-none"
                />
                <label
                  htmlFor="signup-name"
                  className="absolute left-3 top-3 px-1 text-[#a8b6d5] bg-[rgba(12,18,32,0.8)] transition-all peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[#87b4ff]"
                >
                  Full name
                </label>
              </div>

              <div className="relative">
                <input
                  id="signup-email"
                  type="email"
                  required
                  placeholder=" "
                  autoComplete="email"
                  className="peer w-full text-base text-white p-4 rounded-xl bg-[rgba(12,18,32,0.45)] border border-white/20 focus:border-[#87b4ff] focus:shadow-[0_0_0_4px_rgba(135,180,255,0.18),0_10px_22px_rgba(0,0,0,0.25)] outline-none"
                />
                <label
                  htmlFor="signup-email"
                  className="absolute left-3 top-3 px-1 text-[#a8b6d5] bg-[rgba(12,18,32,0.8)] transition-all peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[#87b4ff]"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  id="signup-password"
                  type="password"
                  required
                  placeholder=" "
                  minLength="6"
                  autoComplete="new-password"
                  className="peer w-full text-base text-white p-4 rounded-xl bg-[rgba(12,18,32,0.45)] border border-white/20 focus:border-[#87b4ff] focus:shadow-[0_0_0_4px_rgba(135,180,255,0.18),0_10px_22px_rgba(0,0,0,0.25)] outline-none"
                />
                <label
                  htmlFor="signup-password"
                  className="absolute left-3 top-3 px-1 text-[#a8b6d5] bg-[rgba(12,18,32,0.8)] transition-all peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[#87b4ff]"
                >
                  Create password
                </label>
              </div>

              <button
                type="submit"
                className="btn w-full py-3 rounded-xl font-extrabold text-[#0b111c] bg-gradient-to-r from-[#87b4ff] to-[#55e3c4] shadow-[0_14px_28px_rgba(135,180,255,0.25),0_10px_22px_rgba(85,227,196,0.18)] hover:brightness-110 active:scale-95 transition"
              >
                Create account
              </button>
              <p className="text-center text-[#a8b6d5] text-sm mt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabSwitch("login")}
                  className="text-[#87b4ff] underline"
                >
                  Log in
                </button>
              </p>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
