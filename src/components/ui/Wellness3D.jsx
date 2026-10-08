import { Heart, Sprout } from "lucide-react";

export default function Wellness3D({ className = "" }) {
  return <div className={`wellness-scene ${className}`} aria-hidden="true">
    <div className="wellness-shadow" />
    <div className="wellness-object">
      <div className="wellness-orbit" />
      <div className="wellness-orb"><Heart strokeWidth={1.3} /></div>
      <div className="wellness-leaf"><Sprout strokeWidth={1.5} /></div>
      <div className="wellness-dot" />
    </div>
  </div>;
}
