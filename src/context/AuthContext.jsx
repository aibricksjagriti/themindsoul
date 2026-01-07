// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";

// // const AuthContext = createContext();

// export const AuthContext = createContext(); // 👈 FIXED

// export function AuthProvider({ children }) {
//   // Safe JSON parse helper
//   const safeParse = (value) => {
//     try {
//       if (!value || value === "undefined" || value === "null") return null;
//       return JSON.parse(value);
//     } catch (err) {
//       console.warn("Invalid JSON in localStorage:", value);
//       return null;
//     }
//   };

//   const [user, setUser] = useState(() =>
//     typeof window !== "undefined"
//       ? safeParse(localStorage.getItem("user"))
//       : null
//   );

//   const [token, setToken] = useState(() =>
//     typeof window !== "undefined" ? localStorage.getItem("token") || null : null
//   );

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const savedUser = safeParse(localStorage.getItem("user"));
//     const savedToken = localStorage.getItem("token");

//     setUser(savedUser);
//     setToken(savedToken || null);
//   }, []);

//   const login = (userData, tokenValue) => {
//     setUser(userData);
//     setToken(tokenValue);

//     if (typeof window !== "undefined") {
//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("token", tokenValue);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// src/context/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   // Safe JSON parse helper
//   const safeParse = (value) => {
//     try {
//       if (!value || value === "undefined" || value === "null") return null;
//       return JSON.parse(value);
//     } catch (err) {
//       console.warn("Invalid JSON in localStorage:", value);
//       return null;
//     }
//   };

//   const [user, setUser] = useState(() =>
//     typeof window !== "undefined"
//       ? safeParse(localStorage.getItem("user"))
//       : null
//   );

//   const [token, setToken] = useState(() =>
//     typeof window !== "undefined" ? localStorage.getItem("token") || null : null
//   );

//   // 🔥 NEW: Manage role
//   const [role, setRole] = useState(() =>
//     typeof window !== "undefined" ? localStorage.getItem("role") || null : null
//   );

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const savedUser = safeParse(localStorage.getItem("user"));
//     const savedToken = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("role");

//     setUser(savedUser);
//     setToken(savedToken || null);
//     setRole(savedRole || null);
//   }, []);

//   // ------------------------------------------
//   // 🔥 LOGIN — save user, token & role
//   // ------------------------------------------
//   const login = (userData, tokenValue) => {
//     const userRole = userData?.role || null;

//     setUser(userData);
//     setToken(tokenValue);
//     setRole(userRole);

//     if (typeof window !== "undefined") {
//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("token", tokenValue);
//       localStorage.setItem("role", userRole); // 🔥 SAVE ROLE
//     }
//   };

//   // ------------------------------------------
//   // 🔥 LOGOUT — remove user, token & role
//   // ------------------------------------------
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     setRole(null);

//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, role, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const safeParse = (value) => {
    try {
      if (!value || value === "undefined" || value === "null") return null;
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------
  // INIT AUTH STATE
  // ------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    setUser(safeParse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setLoading(false);
  }, []);

  // ------------------------------------------
  // LOGIN (USER / COUNSELLOR)
  // ------------------------------------------
  const login = (userData, tokenValue) => {
    const userRole = userData?.role || null;

    setUser(userData);
    setToken(tokenValue);
    // setRole(userRole);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
    // localStorage.setItem("role", userRole);
  };

  // ------------------------------------------
  // USER LOGOUT (LOCAL STORAGE)
  // ------------------------------------------
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    // setRole(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("role");
    localStorage.removeItem("isUserLoggedIn");
  };

  // ------------------------------------------
  // COUNSELLOR LOGOUT (ROLE ONLY)
  // ------------------------------------------
  const logoutCounsellor = () => {
    setRole(null);
    localStorage.removeItem("role");
    // ❌ DO NOT touch user or token
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        login,
        logoutUser,
        logoutCounsellor,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
