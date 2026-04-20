import { Router } from 'express';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { sendContactAutoReplyEmail, sendContactEmail } from '../services/mailer.js';

const EMAIL_REGEX =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '');
}

function isEmail(value) {
  const email = normalizeEmail(value);
  if (email.length < 6 || email.length > 254) {
    return false;
  }

  if (email.includes('..')) {
    return false;
  }

  return EMAIL_REGEX.test(email);
}

function isValidName(value) {
  return /^[A-ZÁÉÍÓÚÑÜ\s]{2,80}$/.test(value);
}

function normalizePhone(value) {
  return String(value || '').replace(/\s+/g, '').replace(/-/g, '');
}

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

export function createContactRouter(db) {
  const router = Router();

  router.post('/', async (req, res) => {
    const { name, countryCode, phone, email, subject, message } = req.body;
    const safeName = String(name || '')
      .toUpperCase()
      .replace(/[^A-ZÁÉÍÓÚÑÜ\s]/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    const safeEmail = normalizeEmail(email);
    const safeSubject = String(subject || '').trim();
    const safeMessage = String(message || '').trim();
    const safeCountryCode = String(countryCode || '').trim();
    const safePhone = normalizePhone(phone);

    if (!safeName || !safeEmail || !safeSubject || !safeMessage || !safeCountryCode || !safePhone) {
      return res.status(400).json({ error: 'Completa todos los campos obligatorios.' });
    }

    if (!isValidName(safeName)) {
      return res.status(400).json({ error: 'El nombre debe contener solo letras y espacios.' });
    }

    if (!isEmail(safeEmail)) {
      return res.status(400).json({ error: 'Correo electrónico inválido.' });
    }

    if (!/^\+\d{1,4}$/.test(safeCountryCode)) {
      return res.status(400).json({ error: 'Código de país inválido.' });
    }

    const phoneRule = getPhoneRule(safeCountryCode);
    if (safePhone.length < phoneRule.min || safePhone.length > phoneRule.max) {
      if (phoneRule.min === phoneRule.max) {
        return res.status(400).json({ error: `El número debe tener ${phoneRule.max} dígitos para ese país.` });
      }

      return res.status(400).json({ error: `El número debe tener entre ${phoneRule.min} y ${phoneRule.max} dígitos para ese país.` });
    }

    const parsedPhone = parsePhoneNumberFromString(`${safeCountryCode}${safePhone}`);
    if (!parsedPhone || !parsedPhone.isValid()) {
      return res.status(400).json({ error: 'El número telefónico no parece real para el país seleccionado.' });
    }

    if (safeSubject.length < 3 || safeSubject.length > 120) {
      return res.status(400).json({ error: 'El asunto debe tener entre 3 y 120 caracteres.' });
    }

    if (safeMessage.length < 10 || safeMessage.length > 2000) {
      return res.status(400).json({ error: 'El mensaje debe tener entre 10 y 2000 caracteres.' });
    }

    try {
      await sendContactEmail({
        name: safeName,
        countryCode: safeCountryCode,
        phone: safePhone,
        email: safeEmail,
        subject: safeSubject,
        message: safeMessage
      });

      try {
        await sendContactAutoReplyEmail({
          name: safeName,
          email: safeEmail,
          subject: safeSubject
        });
      } catch (autoReplyError) {
        console.warn('No se pudo enviar la confirmación automática al usuario:', autoReplyError?.message || autoReplyError);
      }

      const createdAt = new Date().toISOString();
      const result = await db.run(
        `
        INSERT INTO contacts (name, phone, email, subject, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [safeName, `${safeCountryCode} ${safePhone}`, safeEmail, safeSubject, safeMessage, createdAt]
      );

      return res.status(201).json({
        message: 'Mensaje enviado correctamente a tu correo.',
        id: result.lastID
      });
    } catch (error) {
      const errorMessage = String(error?.message || '');
      if (errorMessage.includes('Faltan variables SMTP')) {
        return res.status(500).json({ error: 'El servicio de correo no está configurado en el servidor.' });
      }

      return res.status(502).json({ error: 'No se pudo enviar el correo. Inténtalo de nuevo.' });
    }
  });

  router.get('/', async (_req, res) => {
    try {
      const contacts = await db.all(
        'SELECT id, name, phone, email, subject, message, created_at FROM contacts ORDER BY id DESC LIMIT 50'
      );
      res.json({ contacts });
    } catch {
      res.status(500).json({ error: 'No se pudo obtener los contactos.' });
    }
  });

  return router;
}
