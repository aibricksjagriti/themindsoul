import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteForm from "../components/Contact Us/QuoteForm";
import PageHeading from "../components/ui/PageHeading";

export default function Contacts() {
  return <div><PageHeading eyebrow="Let's connect" title="A conversation is a good start." description="Looking for personal support or a program for your community? Tell us what you have in mind. We'll help you find the next step." />
    <div className="container contact-grid"><div><h2 className="text-3xl">We're here to listen.</h2><p className="page-description">For counselling enquiries, contact our team or explore the counsellor directory. For a school or workplace program, share a few details using the form.</p><div className="contact-details"><a href="mailto:themindsoul.in@gmail.com"><span><Mail size={21} /></span>themindsoul.in@gmail.com</a><a href="tel:+918698668886"><span><Phone size={21} /></span>+91 86986 68886</a></div><Link className="button button-secondary mt-5" to="/counsellors">Find personal support <ArrowUpRight size={16} /></Link><img className="mt-10 rounded-2xl w-full h-52 object-cover" src="/home/organization.jpg" alt="People connecting in a workplace" loading="lazy" /></div>
      <div className="surface"><p className="eyebrow">For schools & workplaces</p><h2 className="text-3xl mb-3">Create a program together.</h2><p className="text-sm text-gray-500 mb-7">A few details will help us understand your community's needs.</p><QuoteForm /></div>
    </div>
  </div>;
}
