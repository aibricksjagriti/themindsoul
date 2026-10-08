import { Link } from "react-router-dom";
import { HeartHandshake, Sprout, Users, ArrowUpRight } from "lucide-react";
import PageHeading from "../ui/PageHeading";

const values = [
  [HeartHandshake, "Listen first", "Understanding your experience comes before finding a way forward. We make room for your questions, feelings, and story."],
  [Sprout, "Grow at your pace", "Everyone's journey is different. Small steps and thoughtful conversations can help you build your own way forward."],
  [Users, "Care beyond the individual", "Our wellbeing is connected. We support the relationships and communities that shape our everyday lives."],
];
export default function Breadcrumb() {
  return <div className="about-page"><PageHeading eyebrow="Our story" title={<>Wellbeing belongs<br />in everyday life.</>} description="We bring people, families, schools, and workplaces together around one shared purpose: making room for emotional understanding and growth." />
    <section className="container split-story section-space !pt-4"><img className="story-image" src="/counselors/rutambara-1.jpg" alt="A member of the MindSoul care team" loading="lazy" /><div><p className="eyebrow">The heart of MindSoul</p><h2>A little more connection.<br />A little more understanding.</h2><p>Life brings change, uncertainty, and moments when a little support makes a difference. MindSoul creates space for those conversations.</p><p>Through counselling, expressive arts, and emotional wellbeing programs, we help individuals and communities explore new ways to connect with themselves and with each other.</p><Link className="button button-secondary" to="/counsellors">Meet our counsellors <ArrowUpRight size={16} /></Link></div></section>
    <section className="section-space" style={{ background: "#edf2e8" }}><div className="container"><div className="section-heading"><div><p className="eyebrow">What guides us</p><h2>Care with people<br />at its centre.</h2></div></div><div className="service-grid">{values.map((value) => { const Icon = value[0]; return <article className="service-card" key={value[1]}><span className="service-icon"><Icon size={30} strokeWidth={1.4} /></span><h3>{value[1]}</h3><p>{value[2]}</p></article>; })}</div></div></section>
    <section className="container section-space"><div className="cta-band"><div><h2>Let's make room<br />for what matters.</h2><p>Find personal support or explore a program for your community.</p></div><Link className="button button-light" to="/contacts">Start a conversation <ArrowUpRight size={17} /></Link></div></section>
  </div>;
}
