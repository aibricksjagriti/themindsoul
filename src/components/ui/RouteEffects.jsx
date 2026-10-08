import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = { "/": "A little support. A brighter everyday.", "/about": "Our story", "/counsellors": "Find your counsellor", "/contacts": "Let's connect", "/corporate-wellness": "Workplace wellbeing", "/school-workshop": "School workshops", "/privacy-policy": "Privacy & policies", "/user-dashboard": "Your wellbeing space", "/counsellor-dashboard": "Your counsellor space", "/counsellor/profile": "Your professional profile", "/counsellor-login": "Counsellor sign in" };
export default function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => { document.title = `${titles[pathname] || "Counsellor profile"} | MindSoul Wellness`; window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}
