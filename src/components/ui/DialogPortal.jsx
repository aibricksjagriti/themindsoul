import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function DialogPortal({ children, onClose, locked = false, label }) {
  const ref = useRef(null);
  const close = useRef(onClose); close.current = onClose;
  const busy = useRef(locked); busy.current = locked;
  useEffect(() => {
    const previous = document.activeElement;
    const root = document.getElementById("root");
    const inert = root?.inert;
    const overflow = document.body.style.overflow;
    if (root) root.inert = true;
    document.body.style.overflow = "hidden";
    (ref.current.querySelector("button:not(:disabled),input:not(:disabled)") || ref.current).focus();
    const key = (event) => {
      if (event.key === "Escape" && !busy.current) close.current?.();
      if (event.key !== "Tab") return;
      const focusable = [...ref.current.querySelectorAll('button:not(:disabled):not([tabindex="-1"]),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled)')];
      const first = focusable[0], last = focusable.at(-1);
      if (!first) { event.preventDefault(); ref.current.focus(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown",key);
    return () => { document.removeEventListener("keydown",key); document.body.style.overflow = overflow; if (root) root.inert = inert; if (previous?.isConnected) previous.focus(); };
  }, [label]);
  const content = <div ref={ref} className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>{children}</div>;
  return typeof document === "undefined" ? content : createPortal(content,document.body);
}
