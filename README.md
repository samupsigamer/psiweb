# Samu · Psicólogo Gamer

Web de marca personal para Samu, psicólogo especializado en la intersección
entre salud mental, videojuegos y tecnología. HTML, CSS y JavaScript puros
(sin frameworks ni build), lista para publicarse en **Cloudflare Pages**.

## Qué se ha preparado en este paquete

- **Identidad de marca completa**: favicon, iconos para móvil/PWA
  (`site.webmanifest`) e imagen de vista previa para redes sociales
  (Open Graph / Twitter Card), todo generado en el mismo estilo que el
  icono de marca del header (cuadrado degradado morado + monograma "S").
- **SEO**: meta description, Open Graph, Twitter Card, `theme-color`,
  `canonical`, datos estructurados (JSON-LD tipo `Person`), `robots.txt`
  y `sitemap.xml`.
- **Cloudflare Pages**:
  - `_headers` — cabeceras de seguridad + caché (larga para `/assets/*`,
    corta y revalidable para HTML/CSS/JS).
  - `_redirects` — vacío pero preparado, con ejemplos comentados para
    cuando el sitio crezca.
  - `wrangler.toml` — para desplegar por CLI y para cuando en el futuro
    quieras añadir Pages Functions (por ejemplo, un formulario de
    contacto sin backend propio).
  - `404.html` — página de error con la misma identidad visual.

## Estructura del proyecto

```
.
├── index.html
├── 404.html
├── styles.css
├── script.js
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── _headers            # Cloudflare Pages: cabeceras HTTP
├── _redirects           # Cloudflare Pages: redirecciones
├── wrangler.toml          # Cloudflare Pages: config para CLI/Functions
├── favicon.ico
└── assets/
    ├── hero-samu.png              # Ilustración principal del hero
    ├── personajes/                # Mascota en distintas poses (PNG, fondo transparente)
    │   ├── personaje-1.png … personaje-5.png
    └── brand/                     # Identidad de marca (nueva en este paquete)
        ├── icon-16.png, icon-32.png, icon-180.png, icon-192.png, icon-512.png
        ├── apple-touch-icon.png
        └── og-image.png           # 1200×630, para compartir en redes
```

## Publicar en Cloudflare Pages

### Opción A — Conectar tu repositorio de GitHub (recomendada)

1. Sube el contenido de esta carpeta a un repositorio de GitHub (o
   sustituye los archivos en el repositorio que ya tenías).

   ```bash
   git init
   git add .
   git commit -m "Web de Samu Psicólogo lista para Cloudflare Pages"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/samu-psicologo-gamer.git
   git push -u origin main
   ```

2. En el [dashboard de Cloudflare](https://dash.cloudflare.com/) →
   **Workers & Pages → Create → Pages → Connect to Git**.
3. Selecciona el repositorio.
4. En la configuración de build:
   - **Framework preset**: `None`
   - **Build command**: (déjalo vacío)
   - **Build output directory**: `/`
5. Guarda y despliega. Cloudflare te dará una URL tipo
   `https://samu-psicologo-gamer.pages.dev`, y cada `git push` a `main`
   volverá a desplegar automáticamente.

### Opción B — Desplegar por línea de comandos (Wrangler)

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy .
```

### Conectar tu dominio propio

En el proyecto de Pages → **Custom domains** → añade tu dominio (por
ejemplo `samupsigamer.com`). Cloudflare gestiona el certificado SSL
automáticamente. Una vez conectado el dominio real, actualiza las URLs
`https://samupsigamer.com` que aparecen en `index.html` (canonical, Open
Graph, JSON-LD), `robots.txt` y `sitemap.xml` por tu dominio definitivo.

## Cómo verlo en local antes de publicar

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Cómo expandir la marca a partir de aquí

Este sitio está pensado como punto de partida sólido, no como un techo:

- **Más páginas**: puedes añadir páginas nuevas como archivos `.html`
  sueltos en la raíz (o en subcarpetas) — Cloudflare Pages las sirve tal
  cual, sin configuración adicional. Enlaza a ellas desde `main-nav` en
  `index.html` y añádelas a `sitemap.xml`.
- **Formulario de contacto real**: cuando quieras que "Escríbeme" envíe
  un email de verdad sin depender de un servicio externo, puedes crear
  una carpeta `/functions` con una Cloudflare Pages Function — se
  despliega automáticamente sin tocar `wrangler.toml`.
- **Analítica**: Cloudflare Pages incluye Web Analytics gratuito y sin
  cookies, activable desde el propio dashboard del proyecto, sin tocar
  el código.
- **Recursos descargables / blog**: si retomas la idea de una biblioteca
  de recursos o divulgación (como en las iteraciones multi-página que
  hemos ido construyendo), puedes reintroducirla como sección o como
  páginas adicionales enlazadas desde el menú.

## Pendiente de personalizar

- Dominio real en lugar de `samupsigamer.com` (marcador de posición) en
  `index.html`, `robots.txt` y `sitemap.xml`.
- Email real (`hola@samupsigamer.com`) y WhatsApp
  (`https://wa.me/000000000`) en la sección "¿Hablamos?".
- Enlaces reales de Instagram y TikTok si aún no lo son.
