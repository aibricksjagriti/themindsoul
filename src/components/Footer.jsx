import { Link } from "react-router-dom";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Brand } from "./Navbar";

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div><Brand /><p className="footer-about">A space for connection, understanding, and emotional wellbeing. Here for you, your family, and your community.</p></div>
      <div><h3>Explore</h3><ul><li><Link to="/about">Our story</Link></li><li><Link to="/counsellors">Find a counsellor</Link></li><li><Link to="/contacts">Get in touch</Link></li></ul></div>
      <div><h3>For your community</h3><ul><li><Link to="/corporate-wellness">Workplace wellbeing</Link></li><li><Link to="/school-workshop">School workshops</Link></li><li><Link to="/counsellor-login">Counsellor sign in</Link></li></ul></div>
      <div><h3>Let's connect</h3><ul><li><a href="mailto:themindsoul.in@gmail.com">themindsoul.in@gmail.com <ArrowUpRight size={12} className="inline" /></a></li><li><a href="tel:+918698668886">+91 86986 68886</a></li><li><a href="https://www.instagram.com/themindsoul.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><Instagram size={15} /> Instagram</a></li></ul></div>
    </div><div className="footer-bottom"><p>© {new Date().getFullYear()} MindSoul Wellness. All rights reserved.</p><Link to="/privacy-policy">Privacy & policies</Link><p>Made for a more mindful everyday.</p></div>
  </div></footer>;
}
