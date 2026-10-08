export default function PageHeading({ eyebrow, title, description, children }) {
  return <header className="page-heading">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h1>{title}</h1>
    {description && <p className="page-description">{description}</p>}
    {children && <div className="heading-actions">{children}</div>}
  </header>;
}
