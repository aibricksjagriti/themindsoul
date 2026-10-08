import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, ShieldCheck } from "lucide-react";
import Wellness3D from "../ui/Wellness3D";

export default function HeroSection() {
  return <section className="hero"><div className="container hero-grid">
    <div><p className="eyebrow">Your wellbeing, at your pace</p><h1>A little support.<br />A <em>brighter</em><br />everyday.</h1>
      <p className="hero-copy">You don't have to figure it all out alone. Find thoughtful counselling and emotional wellbeing support for you, your family, and the people around you.</p>
      <div className="hero-actions"><Link to="/counsellors" className="button button-primary">Find your counsellor <ArrowUpRight size={17} /></Link><Link to="/about" className="text-link">Get to know us <ArrowUpRight size={15} /></Link></div>
      <p className="hero-note"><ShieldCheck size={16} /> A caring space. A conversation that starts with you.</p>
    </div>
    <div className="hero-visual"><Wellness3D className="hero-wellness-3d" /><img src="/home-1.jpg" alt="A woman taking a peaceful moment for herself" className="hero-photo" fetchPriority="high" /><div className="hero-caption"><span className="caption-icon"><Heart size={22} strokeWidth={1.5} /></span><div><strong>Room to be yourself.</strong><p>Support for wherever you are in life.</p></div></div></div>
  </div></section>;
}
