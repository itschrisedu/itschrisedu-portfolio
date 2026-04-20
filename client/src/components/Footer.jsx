import { FiArrowUp, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa6';

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Instagram: FiInstagram,
  TikTok: FaTiktok,
  Facebook: FiFacebook
};

export default function Footer({ socialLinks }) {
  return (
    <footer className="footer">
      <div className="redes">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className={`social-link social-${social.label.toLowerCase()}`}
          >
            {(() => {
              const Icon = socialIcons[social.label];
              return Icon ? <Icon /> : social.label;
            })()}
          </a>
        ))}
      </div>
      <a href="#inicio" className="arriba" aria-label="Volver arriba">
        <FiArrowUp />
      </a>
      <p>© {new Date().getFullYear()} Christopher Paucar. Todos los derechos reservados.</p>
    </footer>
  );
}
