import nodemailer from 'nodemailer';

function toBoolean(value, defaultValue = false) {
  if (value == null) {
    return defaultValue;
  }

  return String(value).toLowerCase() === 'true';
}

function getMailerConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM,
    MAIL_TO
  } = process.env;

  const missing = [];

  if (!SMTP_HOST) missing.push('SMTP_HOST');
  if (!SMTP_PORT) missing.push('SMTP_PORT');
  if (!SMTP_USER) missing.push('SMTP_USER');
  if (!SMTP_PASS) missing.push('SMTP_PASS');
  if (!MAIL_TO) missing.push('MAIL_TO');

  if (missing.length > 0) {
    throw new Error(`Faltan variables SMTP: ${missing.join(', ')}`);
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: toBoolean(SMTP_SECURE, Number(SMTP_PORT) === 465),
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM || SMTP_USER,
    to: MAIL_TO
  };
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let transporter;
let config;

function getTransporter() {
  if (transporter) {
    return { transporter, config };
  }

  config = getMailerConfig();
  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  return { transporter, config };
}

export async function sendContactEmail({ name, countryCode, phone, email, subject, message }) {
  const { transporter: smtp, config: currentConfig } = getTransporter();
  const fullPhone = `${countryCode} ${phone}`.trim();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(fullPhone);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  await smtp.sendMail({
    from: `Portafolio Contacto <${currentConfig.from}>`,
    to: currentConfig.to,
    replyTo: email,
    subject: `Nuevo contacto: ${subject}`,
    text: [
      'Nuevo mensaje desde el portafolio',
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Teléfono: ${fullPhone}`,
      `Asunto: ${subject}`,
      '',
      'Mensaje:',
      message
    ].join('\n'),
    html: `
      <h2>Nuevo mensaje desde el portafolio</h2>
      <p><strong>Nombre:</strong> ${safeName}</p>
      <p><strong>Correo:</strong> ${safeEmail}</p>
      <p><strong>Teléfono:</strong> ${safePhone}</p>
      <p><strong>Asunto:</strong> ${safeSubject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${safeMessage}</p>
    `
  });
}

export async function sendContactAutoReplyEmail({ name, email, subject }) {
  const { transporter: smtp, config: currentConfig } = getTransporter();
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);

  await smtp.sendMail({
    from: `Christopher Paucar <${currentConfig.from}>`,
    to: email,
    subject: 'Confirmación de recepción de tu mensaje',
    text: [
      `Estimado/a ${name},`,
      '',
      'Gracias por contactarte a través de mi portafolio profesional.',
      `He recibido correctamente tu mensaje con el asunto: "${subject}".`,
      'Lo revisaré con atención y te responderé a la brevedad posible.',
      '',
      'Saludos cordiales,',
      'Christopher Paucar'
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
        <p>Estimado/a <strong>${safeName}</strong>,</p>
        <p>
          Gracias por contactarte a través de mi portafolio profesional.<br />
          He recibido correctamente tu mensaje con el asunto:
          <strong>${safeSubject}</strong>.
        </p>
        <p>
          Lo revisaré con atención y te responderé a la brevedad posible.
        </p>
        <p style="margin-top: 20px;">
          Saludos cordiales,<br />
          <strong>Christopher Paucar</strong>
        </p>
      </div>
    `
  });
}
