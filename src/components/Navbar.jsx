import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight, Sprout, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./LoginPage";

const links = [["/", "Home"], ["/about", "Our story"], ["/counsellors", "Counsellors"], ["/contacts", "Contact"]];
export function Brand() {
  return <Link to="/" className="brand" aria-label="MindSoul home"><span className="brand-mark"><Sprout size={23} strokeWidth={1.5} /></span><span className="brand-name">MindSoul<small>Wellness, together</small></span></Link>;
}
export default function Navbar() {
  const { user, role, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [programs, setPrograms] = useState(false);
  const [account, setAccount] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);
  const toggleRef = useRef(null);
  const signedIn = !!user || role === "counsellor";
  const dashboard = role === "counsellor" ? "/counsellor-dashboard" : "/user-dashboard";
  useEffect(() => { setMobile(false); setPrograms(false); setAccount(false); }, [location.pathname]);
  useEffect(() => {
    const click = (event) => { if (!dropdownRef.current?.contains(event.target)) { setPrograms(false); setAccount(false); } };
    const escape = (event) => { if (event.key === "Escape") { setMobile(false); setPrograms(false); setAccount(false); } };
    document.addEventListener("pointerdown", click); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", click); document.removeEventListener("keydown", escape); };
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const overflow = document.body.style.overflow;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    mobileRef.current?.querySelector("button")?.focus();
    const trap = (event) => {
      if (event.key !== "Tab") return;
      const elements = [...mobileRef.current.querySelectorAll('a,button:not(:disabled)')];
      const first = elements[0], last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trap);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", trap); toggle?.focus(); };
  }, [mobile]);
  const logout = async () => {
    setLoggingOut(true);
    try { await logoutUser(); setMobile(false); setAccount(false); navigate("/"); }
    catch (error) { alert(error.message || "Could not log out. Please try again."); }
    finally { setLoggingOut(false); }
  };
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="container header-inner" ref={dropdownRef}>
      <Brand />
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.slice(0,3).map(([to,label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
        <div className="nav-dropdown"><button aria-expanded={programs} aria-controls="program-menu" onClick={() => { setPrograms(!programs); setAccount(false); }}>Programs <ChevronDown size={13} /></button>
          {programs && <div id="program-menu" className="dropdown-panel"><Link to="/corporate-wellness">Workplace wellbeing</Link><Link to="/school-workshop">School workshops</Link></div>}
        </div><NavLink to="/contacts">Contact</NavLink>
      </nav>
      <div className="header-actions">
        {signedIn ? <div className="nav-dropdown"><button aria-expanded={account} aria-controls="account-menu" onClick={() => { setAccount(!account); setPrograms(false); }}><User size={16} /> My space <ChevronDown size={13} /></button>
          {account && <div id="account-menu" className="dropdown-panel"><Link to={dashboard}>My dashboard</Link><button onClick={logout} disabled={loggingOut}><LogOut size={14} className="inline mr-2" />{loggingOut ? "Signing out..." : "Sign out"}</button></div>}
        </div> : <button onClick={() => setLoginOpen(true)}>Sign in</button>}
        <Link className="button button-primary" to="/counsellors">Find support <ArrowUpRight size={15} /></Link>
      </div>
      <button ref={toggleRef} className="mobile-menu-toggle" aria-label="Open navigation" aria-expanded={mobile} onClick={() => setMobile(true)}><Menu size={24} /></button>
    </div></header>
    {mobile && <div className="mobile-backdrop" onClick={() => setMobile(false)}><nav className="mobile-menu" aria-label="Mobile navigation" role="dialog" aria-modal="true" ref={mobileRef} onClick={(event) => event.stopPropagation()}>
      <div className="mobile-menu-heading"><Brand /><button aria-label="Close navigation" onClick={() => setMobile(false)}><X size={24} /></button></div>
      {links.map(([to,label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
      <NavLink to="/corporate-wellness">Workplace wellbeing</NavLink><NavLink to="/school-workshop">School workshops</NavLink>
      {signedIn ? <><Link className="button button-primary" to={dashboard}>My dashboard</Link><button onClick={logout} disabled={loggingOut}>{loggingOut ? "Signing out..." : "Sign out"}</button></> : <button className="button button-primary" onClick={() => { setMobile(false); setLoginOpen(true); }}>Sign in</button>}
    </nav></div>}
    <LoginPage isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
  </>;
}
