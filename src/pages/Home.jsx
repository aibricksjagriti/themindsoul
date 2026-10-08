import { createElement } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, HeartHandshake, Users, Sprout, Building2, MessageCircle, CalendarDays, Heart } from "lucide-react";
import HeroSection from "../components/Home/HeroSection";
import CounsellorCard from "../components/ui/CounsellorCard";
import StatePanel from "../components/ui/StatePanel";
import useCounsellors from "../hooks/useCounsellors";

const services = [
  { Icon: HeartHandshake, title: "For you & your family", description: "A space to explore your feelings, navigate change, and build stronger connections with the people you love.", to: "/counsellors", link: "Explore counselling" },
  { Icon: Sprout, title: "For growing minds", description: "Engaging school workshops that help children develop emotional awareness, confidence, and a sense of belonging.", to: "/school-workshop", link: "Explore school programs" },
  { Icon: Building2, title: "For healthier workplaces", description: "Bring emotional intelligence, connection, and wellbeing into the everyday life of your team.", to: "/corporate-wellness", link: "Explore workplace programs" },
];
const questions = [
  ["How do I choose a counsellor?", "Explore each counsellor's profile, areas of focus, experience, and languages. Choose someone whose approach feels right for your needs. Our team can help if you're unsure."],
  ["What happens in a counselling session?", "Your first conversation is a chance to share what brings you here, ask questions, and discuss what you would like to work towards. You can share at a pace that feels comfortable."],
  ["Are sessions available online?", "You can book online sessions from a counsellor's profile. Choose an available date and time, complete your booking, and find your session details in your dashboard."],
  ["Can you create a program for my school or workplace?", "Yes. Contact us with your team's needs and we'll discuss a program that fits your community, goals, and setting."],
];
export default function Home() {
  const { counsellors, loading, error, retry } = useCounsellors();
  return <div className="home-page">
    <HeroSection />
    <div className="care-strip"><div className="container">{[[Heart, "Individual & family care"], [Users, "School communities"], [Building2, "Workplace wellbeing"], [MessageCircle, "Online conversations"]].map(([Icon,label]) => <div className="care-strip-item" key={label}>{createElement(Icon, { size: 20, strokeWidth: 1.5 })}<span>{label}</span></div>)}</div></div>
    <section className="container section-space"><div className="section-heading"><div><p className="eyebrow">Care that meets you where you are</p><h2>Different lives.<br />A shared need to feel supported.</h2></div><p>From personal conversations to community programs, find a way forward that works for you.</p></div><div className="service-grid">{services.map(({ Icon, title, description, to, link }) => <article key={title} className="service-card"><span className="service-icon">{createElement(Icon, { size: 32, strokeWidth: 1.4 })}</span><h3>{title}</h3><p>{description}</p><Link to={to} className="text-link">{link} <ArrowUpRight size={15} /></Link></article>)}</div></section>
    <section id="counsellor-section" className="section-space" style={{ background: "#f0f3ec" }}><div className="container"><div className="section-heading"><div><p className="eyebrow">People who listen</p><h2>Find a connection<br />that feels right.</h2></div><Link to="/counsellors" className="button button-secondary">Meet our counsellors <ArrowUpRight size={16} /></Link></div>
      {loading ? <StatePanel loading title="Finding your support team" description="We're loading our counsellor profiles." /> : error ? <StatePanel title="Let's try that again" description="We couldn't load our counsellors right now." onRetry={retry} /> : counsellors.length ? <div className="counsellor-grid">{counsellors.slice(0,3).map((c) => <CounsellorCard key={c.counsellorId} counsellor={c} />)}</div> : <StatePanel title="We're here to help" description="Get in touch with our team to find the right support." />}
    </div></section>
    <section className="container section-space"><div className="section-heading"><div><p className="eyebrow">Start small. Move forward.</p><h2>Your first step doesn't<br />have to feel like a big one.</h2></div></div><div className="steps-grid">{[["01", "Find your person", "Explore profiles and choose a counsellor who understands the support you're looking for."], ["02", "Make time for yourself", "Pick a day and time that fits your life. Complete your booking securely online."], ["03", "Begin a conversation", "Join your online session and take the next step at your own pace."]].map(([number,title,description]) => <article key={number}><p className="step-number">{number}</p><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="container section-space split-story"><img className="story-image" src="/home/children.jpg" alt="Children sharing a moment together" loading="lazy" /><div><p className="eyebrow">More than a session</p><h2>Feeling better starts<br />with feeling understood.</h2><p>We believe emotional wellbeing belongs in everyday life. In our families, classrooms, workplaces, and in the quiet moments we make for ourselves.</p><p>MindSoul brings together counselling and community programs with a simple intention: to make room for understanding, connection, and growth.</p><Link to="/about" className="button button-secondary">Discover our approach <ArrowUpRight size={16} /></Link></div></section>
    <section className="section-space" style={{ background: "#f4efe7" }}><div className="container faq-layout"><div><p className="eyebrow">A little clarity</p><h2>It's okay to<br />have questions.</h2><p className="page-description">Starting something new can feel uncertain. Here are a few things that may help.</p><Link to="/contacts" className="text-link mt-6">Ask our team <ArrowUpRight size={15} /></Link></div><div className="faq-list">{questions.map(([question,answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="container section-space"><div className="cta-band"><div><h2>Take a moment for yourself.<br />We'll meet you there.</h2><p>A conversation can be a good place to start.</p></div><Link className="button button-light" to="/counsellors">Find your support <CalendarDays size={17} /></Link></div></section>
  </div>;
}
