export default function Projects({ projects }) {
  const isFrontendWeb = (project) => {
    const tags = [project.category, ...(project.stack || [])].join(' ').toLowerCase();
    return ['frontend', 'react', 'html', 'css', 'ui', 'ux', 'web', 'php'].some((keyword) => tags.includes(keyword));
  };

  const isBackend = (project) => {
    const tags = [project.category, ...(project.stack || [])].join(' ').toLowerCase();
    return ['backend', 'api', 'node', 'express', 'database'].some((keyword) => tags.includes(keyword));
  };

  const isAiData = (project) => {
    const tags = [project.category, ...(project.stack || [])].join(' ').toLowerCase();
    return ['ia', 'machine learning', 'python', 'reconocimiento', 'biometr', 'algoritmos'].some((keyword) =>
      tags.includes(keyword)
    );
  };

  const getGroupRank = (project) => {
    if (isFrontendWeb(project)) {
      return 1;
    }
    if (isBackend(project)) {
      return 2;
    }
    if (isAiData(project)) {
      return 3;
    }
    return 4;
  };

  const technologyWeight = {
    react: 10,
    typescript: 9,
    node: 8,
    express: 8,
    api: 7,
    php: 6,
    javascript: 6,
    python: 6,
    'machine learning': 7,
    ia: 7,
    biometría: 6,
    html: 5,
    css: 5
  };

  const getTechScore = (project) => {
    const tags = [project.category, ...(project.stack || [])].join(' ').toLowerCase();
    return Object.entries(technologyWeight).reduce((total, [tech, score]) => {
      return total + (tags.includes(tech) ? score : 0);
    }, 0);
  };

  const orderedProjects = [...projects].sort((first, second) => {
    const groupDiff = getGroupRank(first) - getGroupRank(second);
    if (groupDiff !== 0) {
      return groupDiff;
    }

    const scoreDiff = getTechScore(second) - getTechScore(first);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return Number(second.collaboration) - Number(first.collaboration);
  });

  return (
    <section id="proyectos" className="section section-alt">
      <div className="container">
        <h2>Portafolio</h2>
        <p className="muted section-intro">
          Proyectos seleccionados con enfoque profesional en arquitectura, impacto y calidad técnica.
        </p>
        <div className="projects-grid">
          {orderedProjects.map((project) => (
            <article key={project.title} className="project-card">
              {project.collaboration ? <span className="project-badge">Colaboración destacada</span> : null}
              <img
                className="project-image"
                src={project.image}
                alt={`Vista referencial de ${project.title}`}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/images/projects/taskflow-backend.svg';
                }}
              />
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="muted">{project.description}</p>
              <div className="project-tags">
                {project.stack?.map((tech) => (
                  <span key={`${project.title}-${tech}`} className="project-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                Ver proyecto
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
