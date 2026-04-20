import { useState } from 'react';
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FiEye } from 'react-icons/fi';
import {
  FaApple,
  FaBook,
  FaCamera,
  FaCar,
  FaGamepad,
  FaHeadphones,
  FaTiktok,
  FaPersonHiking,
  FaPlane
} from 'react-icons/fa6';
import CvModal from './CvModal';

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Instagram: FiInstagram,
  TikTok: FaTiktok,
  Facebook: FiFacebook
};

const interestIcons = {
  gamepad: FaGamepad,
  headphones: FaHeadphones,
  plane: FaPlane,
  apple: FaApple,
  hiking: FaPersonHiking,
  book: FaBook,
  car: FaCar,
  camera: FaCamera
};

export default function About({ hero, socialLinks, personalInfo, interests }) {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <section id="inicio" className="sobremi">
      <div className="inicio-hero-bg" aria-hidden="true" />
      <div className="inicio-hero">
        <div className="contenido-banner">
          <div className="contenedor-img">
            <img src={hero.profileImage} alt="Christopher Paucar" />
          </div>
          <h1>CHRISTOPHER PAUCAR</h1>
          <h2>{hero.role.replace(' | ', ' - ')}</h2>
          <div className="redes">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`social-link social-${social.label.toLowerCase()}`}
                >
                  {Icon ? <Icon /> : social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div id="sobre-mi" className="contenido-seccion sobre-content">
        <h2>Sobre Mí</h2>
        <p>
          <span>Hola, soy Christopher Paucar.</span> {hero.description}
        </p>

        <div className="fila">
          <div className="col">
            <h3>Datos Personales</h3>
            <ul>
              {personalInfo.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  {item.value}
                </li>
              ))}
              <li>
                <strong>Cargo</strong>
                <span>FREELANCE</span>
              </li>
            </ul>
          </div>

          <div className="col">
            <h3>Intereses</h3>
            <div className="contenedor-intereses">
              {interests.map((interest) => {
                const Icon = interestIcons[interest.icon];
                return (
                  <button type="button" className="interes" key={interest.id}>
                    {Icon ? <Icon className="interes-icon" /> : null}
                    <span>{interest.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="cv-actions">
          <button type="button" className="cv-trigger" onClick={() => setIsCvModalOpen(true)}>
            Ver currículum <FiEye />
            <span className="overlay" />
          </button>
        </div>
      </div>

      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} pdfUrl={hero.cvUrl} />
    </section>
  );
}
