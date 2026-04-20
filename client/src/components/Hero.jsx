import { FiArrowRight, FiEye, FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiSend } from 'react-icons/fi';

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Instagram: FiInstagram,
  Facebook: FiFacebook
};

export default function Hero({ hero, socialLinks, onOpenCv }) {
  return (
    <section id="inicio" className="section hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Portafolio profesional</p>
          <h1>{hero.name}</h1>
          <h2>{hero.role}</h2>
          <p className="muted">{hero.description}</p>
          <div className="hero-actions">
            <a href="#proyectos" className="btn btn-primary">
              {hero.ctaPrimary} <FiArrowRight />
            </a>
            <a href="#contacto" className="btn btn-ghost">
              {hero.ctaSecondary} <FiSend />
            </a>
            <button type="button" className="btn btn-ghost" onClick={onOpenCv}>
              Ver CV <FiEye />
            </button>
          </div>

          <div className="social-row">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
                {(() => {
                  const Icon = socialIcons[social.label];
                  return Icon ? <Icon /> : social.label;
                })()}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <img src={hero.profileImage} alt="Foto de Christopher Paucar" className="profile-image" />
          <h3>¿Qué ofrezco?</h3>
          <ul>
            <li>Diseño visual moderno y elegante</li>
            <li>Desarrollo React escalable</li>
            <li>Backend robusto para formularios y datos</li>
            <li>Optimización para captar clientes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
