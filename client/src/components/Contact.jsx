import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaLocationDot, FaMobileScreenButton, FaTruckFast, FaWhatsapp } from 'react-icons/fa6';
import { personalInfo } from '../data/portfolioData';

const initialState = {
  name: '',
  countryCode: '+593',
  phone: '',
  email: '',
  subject: '',
  message: ''
};

const countryOptions = [
  { value: '+49', label: 'Alemania (+49)' },
  { value: '+966', label: 'Arabia Saudita (+966)' },
  { value: '+54', label: 'Argentina (+54)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+43', label: 'Austria (+43)' },
  { value: '+32', label: 'Bélgica (+32)' },
  { value: '+591', label: 'Bolivia (+591)' },
  { value: '+55', label: 'Brasil (+55)' },
  { value: '+1', label: 'Canadá (+1)' },
  { value: '+56', label: 'Chile (+56)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+57', label: 'Colombia (+57)' },
  { value: '+82', label: 'Corea del Sur (+82)' },
  { value: '+506', label: 'Costa Rica (+506)' },
  { value: '+53', label: 'Cuba (+53)' },
  { value: '+45', label: 'Dinamarca (+45)' },
  { value: '+593', label: 'Ecuador (+593)' },
  { value: '+503', label: 'El Salvador (+503)' },
  { value: '+971', label: 'Emiratos Árabes Unidos (+971)' },
  { value: '+34', label: 'España (+34)' },
  { value: '+1', label: 'Estados Unidos (+1)' },
  { value: '+33', label: 'Francia (+33)' },
  { value: '+30', label: 'Grecia (+30)' },
  { value: '+502', label: 'Guatemala (+502)' },
  { value: '+504', label: 'Honduras (+504)' },
  { value: '+91', label: 'India (+91)' },
  { value: '+353', label: 'Irlanda (+353)' },
  { value: '+39', label: 'Italia (+39)' },
  { value: '+81', label: 'Japón (+81)' },
  { value: '+52', label: 'México (+52)' },
  { value: '+505', label: 'Nicaragua (+505)' },
  { value: '+47', label: 'Noruega (+47)' },
  { value: '+64', label: 'Nueva Zelanda (+64)' },
  { value: '+31', label: 'Países Bajos (+31)' },
  { value: '+507', label: 'Panamá (+507)' },
  { value: '+595', label: 'Paraguay (+595)' },
  { value: '+51', label: 'Perú (+51)' },
  { value: '+48', label: 'Polonia (+48)' },
  { value: '+351', label: 'Portugal (+351)' },
  { value: '+44', label: 'Reino Unido (+44)' },
  { value: '+420', label: 'República Checa (+420)' },
  { value: '+1', label: 'República Dominicana (+1)' },
  { value: '+40', label: 'Rumanía (+40)' },
  { value: '+7', label: 'Rusia (+7)' },
  { value: '+65', label: 'Singapur (+65)' },
  { value: '+27', label: 'Sudáfrica (+27)' },
  { value: '+46', label: 'Suecia (+46)' },
  { value: '+41', label: 'Suiza (+41)' },
  { value: '+90', label: 'Turquía (+90)' },
  { value: '+598', label: 'Uruguay (+598)' },
  { value: '+58', label: 'Venezuela (+58)' }
];

const phoneDigitRules = {
  '+1': { min: 10, max: 10 },
  '+7': { min: 10, max: 10 },
  '+27': { min: 9, max: 9 },
  '+30': { min: 10, max: 10 },
  '+31': { min: 9, max: 9 },
  '+32': { min: 9, max: 9 },
  '+33': { min: 9, max: 9 },
  '+34': { min: 9, max: 9 },
  '+39': { min: 9, max: 10 },
  '+40': { min: 9, max: 9 },
  '+41': { min: 9, max: 9 },
  '+43': { min: 10, max: 11 },
  '+44': { min: 10, max: 10 },
  '+45': { min: 8, max: 8 },
  '+46': { min: 9, max: 9 },
  '+47': { min: 8, max: 8 },
  '+48': { min: 9, max: 9 },
  '+49': { min: 10, max: 11 },
  '+51': { min: 9, max: 9 },
  '+52': { min: 10, max: 10 },
  '+53': { min: 8, max: 8 },
  '+54': { min: 10, max: 10 },
  '+55': { min: 10, max: 11 },
  '+56': { min: 9, max: 9 },
  '+57': { min: 10, max: 10 },
  '+58': { min: 10, max: 10 },
  '+61': { min: 9, max: 9 },
  '+64': { min: 8, max: 10 },
  '+65': { min: 8, max: 8 },
  '+81': { min: 10, max: 11 },
  '+82': { min: 9, max: 10 },
  '+86': { min: 11, max: 11 },
  '+90': { min: 10, max: 10 },
  '+91': { min: 10, max: 10 },
  '+351': { min: 9, max: 9 },
  '+353': { min: 9, max: 9 },
  '+420': { min: 9, max: 9 },
  '+502': { min: 8, max: 8 },
  '+503': { min: 8, max: 8 },
  '+504': { min: 8, max: 8 },
  '+505': { min: 8, max: 8 },
  '+506': { min: 8, max: 8 },
  '+507': { min: 8, max: 8 },
  '+591': { min: 8, max: 8 },
  '+593': { min: 10, max: 10 },
  '+595': { min: 9, max: 9 },
  '+598': { min: 8, max: 9 },
  '+966': { min: 9, max: 9 },
  '+971': { min: 9, max: 9 }
};

function getPhoneRule(countryCode) {
  return phoneDigitRules[countryCode] || { min: 6, max: 15 };
}

function getPhoneRuleMessage(countryCode) {
  const rule = getPhoneRule(countryCode);
  if (rule.min === rule.max) {
    return `Ingresa exactamente ${rule.max} dígitos para este país.`;
  }

  return `Ingresa entre ${rule.min} y ${rule.max} dígitos para este país.`;
}

function isValidName(value) {
  return /^[A-ZÁÉÍÓÚÑÜ\s]{2,80}$/.test(value.trim());
}

const EMAIL_REGEX =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '');
}

function isValidEmail(value) {
  const email = normalizeEmail(value);
  if (email.length < 6 || email.length > 254) {
    return false;
  }

  if (email.includes('..')) {
    return false;
  }

  return EMAIL_REGEX.test(email);
}

function normalizePhone(value) {
  return value.replace(/\D/g, '');
}

function normalizeName(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/[^A-ZÁÉÍÓÚÑÜ\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s+/, '');
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Contact() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [sendProgress, setSendProgress] = useState(0);
  const sendIntervalRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const selectedPhoneRule = getPhoneRule(formData.countryCode);

  const whatsappEntry = personalInfo.find((item) => item.label === 'WhatsApp');
  const emailEntry = personalInfo.find((item) => item.label === 'Email');

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setFormData((prev) => ({ ...prev, [name]: normalizeName(value) }));
      return;
    }

    if (name === 'countryCode') {
      const nextRule = getPhoneRule(value);
      setFormData((prev) => ({
        ...prev,
        countryCode: value,
        phone: normalizePhone(prev.phone).slice(0, nextRule.max)
      }));
      return;
    }

    if (name === 'phone') {
      const digitsOnly = normalizePhone(value).slice(0, selectedPhoneRule.max);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    if (name === 'email') {
      setFormData((prev) => ({ ...prev, [name]: normalizeEmail(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    return () => {
      if (sendIntervalRef.current) {
        window.clearInterval(sendIntervalRef.current);
      }

      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const startSendProgress = () => {
    if (sendIntervalRef.current) {
      window.clearInterval(sendIntervalRef.current);
    }

    setSendProgress(0);

    const durationMs = 2000;
    const stepMs = 40;
    let elapsedMs = 0;

    sendIntervalRef.current = window.setInterval(() => {
      elapsedMs += stepMs;
      const nextProgress = Math.min(100, Math.round((elapsedMs / durationMs) * 100));
      setSendProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(sendIntervalRef.current);
        sendIntervalRef.current = null;
      }
    }, stepMs);
  };

  const resetSuccessMessage = () => {
    if (successTimeoutRef.current) {
      window.clearTimeout(successTimeoutRef.current);
    }

    successTimeoutRef.current = window.setTimeout(() => {
      setStatus({ type: 'idle', message: '' });
      successTimeoutRef.current = null;
    }, 5000);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const normalizedName = normalizeName(formData.name).trim();
    const normalizedEmail = normalizeEmail(formData.email);
    const normalizedPhone = normalizePhone(formData.phone);
    const normalizedSubject = formData.subject.trim();
    const normalizedMessage = formData.message.trim();

    if (!isValidName(normalizedName)) {
      setStatus({ type: 'error', message: 'El nombre debe contener solo letras y espacios.' });
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setStatus({ type: 'error', message: 'Ingresa un correo válido.' });
      return;
    }

    if (normalizedPhone.length < selectedPhoneRule.min || normalizedPhone.length > selectedPhoneRule.max) {
      setStatus({ type: 'error', message: getPhoneRuleMessage(formData.countryCode) });
      return;
    }

    if (normalizedSubject.length < 3) {
      setStatus({ type: 'error', message: 'El asunto debe tener al menos 3 caracteres.' });
      return;
    }

    if (normalizedMessage.length < 10) {
      setStatus({ type: 'error', message: 'El mensaje debe tener al menos 10 caracteres.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Enviando mensaje...' });
    startSendProgress();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: normalizedName,
          countryCode: formData.countryCode,
          phone: normalizedPhone,
          email: normalizedEmail,
          subject: normalizedSubject,
          message: normalizedMessage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }

      setStatus({ type: 'success', message: 'Mensaje enviado con éxito.' });
      setSendProgress(100);
      resetSuccessMessage();
      setFormData(initialState);
    } catch (error) {
      if (sendIntervalRef.current) {
        window.clearInterval(sendIntervalRef.current);
        sendIntervalRef.current = null;
      }

      setSendProgress(0);
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <section id="contacto" className="contacto" aria-label="Formulario y datos de contacto">
      <div className="contenido-seccion">
        <h2>CONTACTO</h2>
        <div className="fila">
          <div className="col">
            <form className="contact-form" onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Tu Nombre"
                value={formData.name}
                onChange={onChange}
                pattern="[A-ZÁÉÍÓÚÑÜ\s]{2,80}"
                title="Solo se permiten letras y espacios."
                autoComplete="name"
                style={{ textTransform: 'uppercase' }}
                required
              />
              <div className="phone-row">
                <select name="countryCode" value={formData.countryCode} onChange={onChange} required>
                  {countryOptions.map((option) => (
                    <option key={`${option.label}-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Número telefónico"
                  value={formData.phone}
                  onChange={onChange}
                  inputMode="numeric"
                  pattern={`\\d{${selectedPhoneRule.min},${selectedPhoneRule.max}}`}
                  minLength={selectedPhoneRule.min}
                  maxLength={selectedPhoneRule.max}
                  title={getPhoneRuleMessage(formData.countryCode)}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Dirección de correo"
                value={formData.email}
                onChange={onChange}
                title="Ingresa un correo válido, por ejemplo: nombre@dominio.com"
                autoComplete="email"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Tema"
                value={formData.subject}
                onChange={onChange}
                minLength={3}
                required
              />
              <textarea
                name="message"
                rows="8"
                placeholder="Mensaje"
                value={formData.message}
                onChange={onChange}
                minLength={10}
                required
              />

              <button type="submit" disabled={status.type === 'loading'}>
                <span className="send-button-content">
                  {status.type !== 'loading' && (
                    <span className="send-button-label">Enviar Mensaje</span>
                  )}
                  {status.type === 'loading' ? (
                    <span className="send-button-track" aria-hidden="true">
                      <span className="send-button-plane" style={{ left: `${Math.min(84, sendProgress * 0.84)}%` }}>
                        <FaTruckFast />
                      </span>
                    </span>
                  ) : (
                    <FaTruckFast />
                  )}
                </span>
                <span className="overlay" />
              </button>

              {status.type !== 'idle' && (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              )}
            </form>
          </div>

          <div className="col">
            <img src="/images/ubicacion.png" alt="Ubicación de Ambato" className="contact-map" />
            <div className="info">
              <ul>
                <li>
                  <FaLocationDot />
                  {personalInfo.find((item) => item.label === 'Ubicación')?.value}
                </li>
                <li>
                  <FaMobileScreenButton />
                  Llámame: {personalInfo.find((item) => item.label === 'Teléfono')?.value}
                </li>
                {whatsappEntry?.href ? (
                  <li>
                    <FaWhatsapp />
                    <a href={whatsappEntry.href} target="_blank" rel="noreferrer">
                      WhatsApp: {whatsappEntry.value}
                    </a>
                  </li>
                ) : null}
                <li>
                  <FaEnvelope />
                  {emailEntry?.href ? (
                    <a href={emailEntry.href}>{emailEntry.value}</a>
                  ) : (
                    emailEntry?.value
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
