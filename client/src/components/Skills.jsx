export default function Skills({ technicalSkills, softSkills }) {
  return (
    <section id="skills" className="skills">
      <div className="contenido-seccion">
        <h2>Skills</h2>
        <div className="fila">
          <div className="col">
            <h3>Technical Skills</h3>
            {technicalSkills.map((skill) => (
              <div className="skill" key={skill.name}>
                <span>{skill.name}</span>
                <div className="barra-skill">
                  <div className="progreso" style={{ width: `${skill.value}%` }}>
                    <span>{skill.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col">
            <h3>Professional Skills</h3>
            {softSkills.map((skill) => (
              <div className="skill" key={skill.name}>
                <span>{skill.name}</span>
                <div className="barra-skill">
                  <div className="progreso" style={{ width: `${skill.value}%` }}>
                    <span>{skill.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
