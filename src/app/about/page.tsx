export default function About() {
  return (
    <section className="section" style={{ minHeight: "100vh", paddingTop: "calc(var(--nav-h) + var(--section-py))" }}>
      <div className="container">
        <div className="section-header animate-fade-up">
          <span className="t-label">The Firm</span>
          <h1 className="t-headline">Our Story</h1>
          <div className="gold-line"></div>
        </div>
        <p className="t-body animate-fade-up delay-1">About us content coming soon...</p>
      </div>
    </section>
  );
}
