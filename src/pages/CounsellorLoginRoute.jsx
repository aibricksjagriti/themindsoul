// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CounselorLogin from "../components/CounselorLogin";

// export default function CounsellorLoginRoute() {
//   const navigate = useNavigate();
//   const [openOtp, setOpenOtp] = useState(false);

//   return (
//     <div className="h-[80vh]">
//       <CounselorLogin
//         isOpen={true} // ALWAYS OPEN ON THIS ROUTE
//         onClose={() => navigate(-1)} // go back when closing modal
//         openOtpModal={() => setOpenOtp(true)}
//       />

//       {/* OPTIONAL: OTP MODAL */}
//       {openOtp && (
//         <OtpModal isOpen={openOtp} onClose={() => setOpenOtp(false)} />
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import CounselorLogin from "../components/CounselorLogin";
import OtpPage from "../components/Counsellor/OtpPage";

export default function CounsellorLoginRoute() {
  const [openOtp, setOpenOtp] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="h-[80vh]">
      {showLogin && (
        <CounselorLogin
          isOpen={true}
          onClose={() => setShowLogin(false)} // DO NOT navigate
          onOtpOpen={() => setOpenOtp(true)} // OTP opens safely
        />
      )}

      {openOtp && (
        <OtpPage isOpen={openOtp} onClose={() => setOpenOtp(false)} />
      )}
    </div>
  );
}
