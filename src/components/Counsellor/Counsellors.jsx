import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import useCounsellors from "../../hooks/useCounsellors";
import PageHeading from "../ui/PageHeading";
import StatePanel from "../ui/StatePanel";
import CounsellorCard from "../ui/CounsellorCard";

const options = { expertise: ["Therapist", "Clinical Psychologist", "Child Specialist", "Counselling Psychologist"], languages: ["English", "Hindi", "Kannada", "Marathi", "Tamil", "Telugu", "Punjabi", "French"] };
const list = (value) => Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
export default function Counsellors() {
  const { counsellors, loading, error, retry } = useCounsellors();
  const [filters, setFilters] = useState({ expertise: [], languages: [] });
  const [query, setQuery] = useState("");
  const toggle = (field, value) => setFilters((old) => ({ ...old, [field]: old[field].includes(value) ? old[field].filter((item) => item !== value) : [...old[field], value] }));
  const filtered = useMemo(() => counsellors.filter((c) => {
    const matches = Object.keys(filters).every((field) => !filters[field].length || list(c[field]).some((value) => filters[field].some((selected) => selected.toLowerCase() === String(value).trim().toLowerCase())));
    const text = [c.firstName,c.lastName,...list(c.expertise),...list(c.languages)].join(" ").toLowerCase();
    return matches && text.includes(query.trim().toLowerCase());
  }), [counsellors, filters, query]);
  const count = filters.expertise.length + filters.languages.length;
  const reset = () => { setFilters({ expertise: [], languages: [] }); setQuery(""); };
  return <div><PageHeading eyebrow="Find your person" title="Someone to listen. A space to grow." description="Explore our counsellors and find someone whose experience, language, and approach feel right for you." />
    <div className="container directory-layout"><aside className="surface filter-panel"><div className="flex justify-between items-center"><h2 className="flex items-center gap-2"><SlidersHorizontal size={16} /> Refine your search</h2>{count > 0 && <button className="text-link" onClick={reset}>Clear</button>}</div>
      {Object.entries(options).map(([field,values]) => <fieldset key={field}><legend>{field === "expertise" ? "AREA OF EXPERTISE" : "LANGUAGE"}</legend>{values.map((value) => <label key={value}><input type="checkbox" checked={filters[field].includes(value)} onChange={() => toggle(field,value)} />{value}</label>)}</fieldset>)}
      <p className="mt-7 text-xs text-gray-500">Not sure where to start? <a className="text-link" href="/contacts">Talk to our team.</a></p>
    </aside><div><div className="directory-toolbar"><p aria-live="polite">{loading ? "Loading counsellors..." : `${filtered.length} counsellor${filtered.length === 1 ? "" : "s"} to explore`}</p><div className="search-field"><Search size={17} /><input aria-label="Search counsellors by name, expertise or language" placeholder="Name, expertise, or language" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      {count > 0 && <div className="flex flex-wrap gap-2 mb-5">{Object.entries(filters).flatMap(([field,values]) => values.map((value) => <button className="button button-secondary !min-h-8 !py-1 !px-3 !text-xs" key={value} onClick={() => toggle(field,value)} aria-label={`Remove ${value} filter`}>{value}<X size={12} /></button>))}</div>}
      {loading ? <StatePanel loading title="Finding your support team" /> : error ? <StatePanel title="We couldn't load the directory" description={error} onRetry={retry} /> : !filtered.length ? <StatePanel title="Let's broaden the search" description="Try a different name or remove a filter to find more counsellors." onRetry={reset} /> : <div className="counsellor-grid">{filtered.map((c) => <CounsellorCard key={c.counsellorId} counsellor={c} />)}</div>}
    </div></div>
  </div>;
}
