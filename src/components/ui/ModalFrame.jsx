import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ModalFrame({ isOpen, onClose, title, description, children, closeDisabled = false }) {
  const id = useId();
  const ref = useRef(null);
  const close = useRef(onClose);
  close.current = onClose;
  const disabled = useRef(closeDisabled);
  disabled.current = closeDisabled;
  useEffect(() => {
    if (!isOpen) return;
    const focus = document.activeElement;
    const overflow = document.body.style.overflow;
    const root = document.getElementById("root");
    const wasInert = root?.inert;
    document.body.style.overflow = "hidden";
    if (root) root.inert = true;
    (ref.current?.querySelector("input:not(:disabled),select:not(:disabled),textarea:not(:disabled)") || ref.current?.querySelector("button"))?.focus();
    const key = (event) => {
      if (event.key === "Escape" && !disabled.current) close.current?.();
      if (event.key !== "Tab") return;
      const elements = [...ref.current.querySelectorAll('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),a[href]')];
      const first = elements[0], last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = overflow; if (root) root.inert = wasInert; document.removeEventListener("keydown", key); if (focus?.isConnected) focus.focus(); };
  }, [isOpen]);
  if (!isOpen) return null;
  const content = <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !closeDisabled) onClose?.(); }}>
    <section ref={ref} className="modal-card" role="dialog" aria-modal="true" aria-labelledby={id}>
      <button className="modal-close" onClick={onClose} disabled={closeDisabled} aria-label="Close dialog"><X size={17} /></button>
      <p className="eyebrow">MindSoul Wellness</p><h2 className="modal-heading" id={id}>{title}</h2>{description && <p className="modal-description">{description}</p>}{children}
    </section>
  </div>;
  return typeof document === "undefined" ? content : createPortal(content, document.body);
}
