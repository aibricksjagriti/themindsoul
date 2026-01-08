// import React, { useState } from "react";
// import CounselorLogin from "../components/CounselorLogin";
// import OtpPage from "../components/Counsellor/OtpPage";

// export default function CounsellorLoginRoute() {
//   const [openOtp, setOpenOtp] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="h-[80vh]">
//       {showLogin && (
//         <CounselorLogin
//           isOpen={true}
//           onClose={() => setShowLogin(false)} // DO NOT navigate
//           onOtpOpen={() => setOpenOtp(true)} // OTP opens safely
//         />
//       )}

//       {openOtp && (
//         <OtpPage isOpen={openOtp} onClose={() => setOpenOtp(false)} />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CounselorLogin from "../components/CounselorLogin";
import OtpPage from "../components/Counsellor/OtpPage";

export default function CounsellorLoginRoute() {
  const navigate = useNavigate();
  const [openOtp, setOpenOtp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    // const hasToken = document.cookie.includes("mindsoul_token");

    // ✅ HARD BLOCK LOGIN PAGE IF ALREADY LOGGED IN
    if (role === "counsellor") {
      navigate("/counsellor-dashboard", { replace: true });
      return;
    }

    // open login modal ONLY if not logged in
    setShowLogin(true);
  }, [navigate]);

  return (
    <div className="h-[80vh]">
      {showLogin && (
        <CounselorLogin
          isOpen={true}
          onClose={() => setShowLogin(false)}
          onOtpOpen={() => setOpenOtp(true)}
        />
      )}

      {openOtp && (
        <OtpPage isOpen={openOtp} onClose={() => setOpenOtp(false)} />
      )}
    </div>
  );
}
