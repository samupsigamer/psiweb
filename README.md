# Samu · Psicólogo Gamer

Web de marca personal para Samu, psicólogo especializado en la intersección
entre salud mental, videojuegos y tecnología. HTML, CSS y JavaScript puros
(sin frameworks, sin instalar nada), lista para publicarse en
**Cloudflare Pages** — todo desde la web, sin usar la terminal.

## Qué incluye este paquete

- **Identidad de marca**: favicon, iconos para móvil (`site.webmanifest`) e
  imagen de vista previa para redes sociales (Open Graph / Twitter Card),
  en el mismo estilo que el icono del header (cuadrado degradado morado +
  monograma "S").
- **SEO**: meta description, Open Graph, Twitter Card, `theme-color`,
  `canonical`, datos estructurados (JSON-LD), `robots.txt` y `sitemap.xml`.
- **Cloudflare Pages**: `_headers` (cabeceras de seguridad y caché) y
  `_redirects` (vacío, preparado para el futuro).
- **404.html** con la misma identidad visual del sitio.

## Estructura del proyecto

```
.
├── index.html
├── divulgacion.html       # Página de detalle: Divulgación psicológica
├── familias.html          # Página de detalle: Acompañamiento a familias
├── recursos.html          # Página de detalle: Recursos y herramientas
├── habitos-digitales.html # Página de detalle: Diseño de hábitos digitales
├── 404.html
├── styles.css
├── script.js
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── _headers            # Cloudflare Pages: cabeceras HTTP
├── _redirects           # Cloudflare Pages: redirecciones
├── favicon.ico
└── assets/
    ├── hero-samu.png
    ├── personajes/                 # Mascota en distintas poses
    └── brand/                      # Identidad de marca
        ├── icon-16.png, icon-32.png, icon-180.png, icon-192.png, icon-512.png
        ├── apple-touch-icon.png
        └── og-image.png            # Imagen para compartir en redes
```

### Las 4 páginas de "Qué hago"

Las cuatro tarjetas de la sección "Cuatro maneras de acompañarte" (en
`index.html`) ahora son enlaces a su propia página de detalle, con el
mismo diseño y estilo del resto del sitio (cabecera, pie, tarjetas, cita
destacada). Cada página incluye:

- Un enlace "← Volver a Qué hago" arriba.
- Una introducción al tema con 3 puntos clave.
- Una cita destacada.
- Enlaces a las otras 3 páginas ("Explora también").
- Una llamada a la acción hacia el formulario de contacto.

Para editar el contenido de cualquiera de ellas, abre el archivo `.html`
correspondiente directamente: el texto está en español plano, sin
necesidad de tocar el CSS.

## Publicar en Cloudflare Pages (sin terminal, todo con el ratón)

### 1. Sube estos archivos a GitHub

- Entra en [github.com](https://github.com) y abre tu repositorio (o crea
  uno nuevo con el botón verde **"New"**).
- Dentro del repositorio, usa la opción **"Add file → Upload files"**.
- Arrastra **todo el contenido de esta carpeta** (todos los archivos y la
  carpeta `assets` completa, manteniendo su estructura).
- Baja hasta el final de la página y pulsa **"Commit changes"**.

> Importante: si ya tenías un archivo llamado `wrangler.toml` en el
> repositorio de una versión anterior, **bórralo**. Haz clic en el
> archivo dentro de GitHub → icono de papelera → "Commit changes". Ese
> archivo es lo que hacía fallar el despliegue en Cloudflare.

### 2. Conecta el repositorio con Cloudflare Pages

- Entra en [dash.cloudflare.com](https://dash.cloudflare.com).
- Menú lateral → **Workers & Pages → Create → Pages → Connect to Git**.
- Elige tu repositorio.
- En la configuración de build, deja:
  - **Framework preset**: `None`
  - **Build command**: vacío (no escribas nada)
  - **Build output directory**: `/`
- Pulsa **"Save and Deploy"**.

Si tu proyecto ya existía y quedó mal configurado (por ejemplo, con
`Deploy command: npx wrangler deploy`), es más fácil borrarlo y crearlo de
nuevo que intentar corregirlo:
**Workers & Pages → tu proyecto → Settings → baja del todo → "Delete project"**,
y repite el paso 2 desde cero una vez hayas borrado `wrangler.toml` del
repositorio.

### 3. Listo

En un par de minutos tendrás una URL tipo `https://tu-proyecto.pages.dev`
funcionando. Cada vez que subas cambios nuevos a GitHub (arrastrando
archivos, sin terminal), Cloudflare volverá a publicar la web sola.

### 4. Tu dominio propio (cuando lo tengas)

Dentro del proyecto en Cloudflare: pestaña **Custom domains → Add a
domain**, y sigue las instrucciones en pantalla.

## Cómo verlo en tu ordenador antes de publicar

Si tienes Python instalado, puedes previsualizarlo así (opcional, no es
necesario para publicar):

```
python3 -m http.server 8000
```

y abre `http://localhost:8000` en el navegador. Si no quieres usar la
terminal para nada, simplemente abre `index.html` haciendo doble clic.

## Pendiente de personalizar

- Dominio real en lugar de `samupsigamer.com` (marcador de posición) en
  `index.html`, `robots.txt` y `sitemap.xml`.
- Email real (`hola@samupsigamer.com`) y WhatsApp
  (`https://wa.me/000000000`) en la sección "¿Hablamos?".
- Enlaces reales de Instagram y TikTok si aún no lo son.
