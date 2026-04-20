function TimelineColumn({ title, items }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <div className="timeline-list">
        {items.map((item) => (
          <div key={`${item.title}-${item.period}`} className="timeline-item">
            <p className="timeline-period">{item.period}</p>
            <h4>{item.title}</h4>
            <p className="timeline-place">{item.place}</p>
            <p className="muted">{item.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Timeline({ education, experience, trainings, profileSummary }) {
  return (
    <section id="trayectoria" className="section">
      <div className="container">
        <h2>Trayectoria</h2>
        <p className="muted section-intro">Formación y experiencia aplicadas a proyectos reales de alto impacto.</p>
        <article className="card timeline-summary">
          <h3>Perfil Profesional</h3>
          <p className="muted">{profileSummary}</p>
        </article>
        <div className="timeline-grid">
          <TimelineColumn title="Educación" items={education} />
          <TimelineColumn title="Experiencia" items={experience} />
          <TimelineColumn title="Cursos y Capacitaciones" items={trainings} />
        </div>
      </div>
    </section>
  );
}
