import { Heart, RefreshCw } from "lucide-react";

export default function StatePanel({ title, description, loading = false, onRetry }) {
  return <div className="state-panel" role={onRetry ? "alert" : "status"}>
    <span className={`state-icon ${loading ? "is-loading" : ""}`}><Heart size={24} /></span>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {onRetry && <button className="button button-secondary" onClick={onRetry}><RefreshCw size={16} /> Try again</button>}
  </div>;
}
