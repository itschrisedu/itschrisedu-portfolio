# Portafolio moderno en React + API de Contacto

Este proyecto migra tu portafolio HTML/CSS/JS a una solución más profesional con:

- Frontend en `React` + `Vite`
- Backend en `Node.js` + `Express`
- Persistencia de mensajes de contacto en `SQLite`

## Estructura

- `client/`: interfaz del portafolio
- `server/`: API y base de datos de contactos

## Requisitos

- Node.js 18+
- npm 9+

## Configuración

1. Instalar dependencias en raíz, cliente y servidor.
2. Copiar variables de entorno.

```bash
npm install
npm install --prefix client
npm install --prefix server
Copy-Item .\client\.env.example .\client\.env
Copy-Item .\server\.env.example .\server\.env
```

## Ejecutar en desarrollo

Desde la carpeta raíz del proyecto:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Endpoints útiles

- `GET /api/health`: estado de la API
- `POST /api/contact`: guardar mensaje de contacto
- `GET /api/contact`: listar últimos contactos (máx. 50)

## Contacto con envío real a correo

Ahora el formulario de contacto:

- Envía el mensaje a tu correo vía SMTP
- Guarda el contacto en SQLite
- Valida nombre, email, país y teléfono

### Variables SMTP (server/.env)

Configura en `server/.env`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM` (opcional, si no existe usa `SMTP_USER`)
- `MAIL_TO` (correo destino que recibe los contactos)

Ejemplo base disponible en:

- `server/.env.example`

### Validaciones implementadas

- **Nombre:** solo letras (incluye acentos), espacios y guiones
- **Correo:** formato válido
- **País + teléfono:** selector de país y validación real con formato internacional
- **Asunto:** entre 3 y 120 caracteres
- **Mensaje:** entre 10 y 2000 caracteres

## Personalización recomendada

Edita estos archivos para poner tu información real:

- `client/src/data/portfolioData.js`
- `client/src/components/Contact.jsx`
- `client/src/styles.css`

## Nota sobre base de datos

La base se crea automáticamente en:

- `server/data/contacts.db`

Si luego deseas, puedo migrarla a PostgreSQL + panel admin para producción.

## Despliegue en producción

### Frontend (Vercel)

Este repositorio ya incluye `client/vercel.json` con:

- Reescritura SPA para que cualquier ruta abra `index.html`
- Cache de largo plazo para assets compilados

Configura el proyecto en Vercel apuntando a:

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Variable de entorno en Vercel:

- `VITE_API_URL=https://TU-API-RENDER.onrender.com`

### Backend (Render)

Este repositorio ya incluye `render.yaml` para desplegar la API desde `server`.

Configura estas variables en Render:

- `PORT=4000`
- `CLIENT_ORIGIN=https://TU-FRONTEND.vercel.app`

Puedes poner más de un origen separados por coma:

- `CLIENT_ORIGIN=https://TU-FRONTEND.vercel.app,https://www.tudominio.com`

## SEO profesional incluido

Se implementó SEO técnico base en `client/index.html`:

- Meta title y description optimizados
- Open Graph (`og:*`) para compartir en redes
- Twitter Cards
- Canonical
- JSON-LD (Schema.org tipo `Person`)

Archivos SEO adicionales en `client/public`:

- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `images/og-cover.svg`

## Favicon e iconos del navegador

Ya está configurado para mostrar icono al abrir en navegador:

- `favicon.svg`
- `apple-touch-icon.svg`

Si quieres cambiar el icono, reemplaza esos archivos conservando los mismos nombres.

## Ajustes recomendados antes de publicar

1. Cambiar dominio en:
	- `client/index.html` (canonical, og:url, og:image)
	- `client/public/robots.txt`
	- `client/public/sitemap.xml`
2. Reemplazar placeholders de imágenes en `client/public/images`.
3. Verificar que `VITE_API_URL` y `CLIENT_ORIGIN` coincidan con tus dominios finales.
