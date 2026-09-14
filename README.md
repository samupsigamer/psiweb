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
├── sobre-mi.html          # Página propia: Sobre mí (antes era una sección de index.html)
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

### La sección "Portfolio" (nueva)

En `index.html`, entre el "Sobre mí" y "Qué hago" hay una nueva sección
`id="portfolio"` pensada para mostrar tu trabajo de divulgación como
piezas de un portfolio: cada tarjeta tiene una etiqueta de formato
(Artículo, Vídeo, Guía descargable...), un título y una descripción
corta, y enlaza a una pieza concreta dentro de la página de detalle que
corresponda (por ejemplo `divulgacion.html#por-que-enganchan`).

Arriba de la rejilla hay botones de filtro (Todo / Divulgación /
Familias / Recursos / Hábitos digitales) que muestran u ocultan tarjetas
según la categoría — funciona con JavaScript puro, sin recargar la
página (mira `script.js`, bloque "Filtro del portfolio").

Para **añadir, quitar o editar una pieza**:

1. Abre `index.html`, busca `<div class="portfolio-grid">` y edita/añade
   una tarjeta `<a class="feature-card portfolio-card is-link" ...>`.
   El atributo `data-category` debe ser uno de: `divulgacion`,
   `familias`, `recursos`, `habitos` (así el filtro la reconoce).
2. Si quieres que la pieza tenga su propio detalle dentro de la página
   correspondiente, añade también un bloque `<article class="piece-card"
   id="...">` dentro de la sección "Piezas destacadas" de esa página
   (por ejemplo, en `familias.html`). El `id` debe coincidir con el que
   usas en el `href="familias.html#ese-id"` de la tarjeta del home.

Las páginas de detalle (`divulgacion.html`, `familias.html`,
`recursos.html`, `habitos-digitales.html`) mantienen todo lo que ya
tenían (introducción, cita, "Explora también" y llamada a la acción) y
ahora incluyen además esa sección "Piezas destacadas" arriba del todo.

### La página "Sobre mí"

El enlace "Sobre mí" del menú (arriba en todas las páginas) ya no hace
scroll dentro de `index.html`: lleva a su propia página, `sobre-mi.html`,
con el mismo contenido de presentación más una sección de "Formación,
enfoque y experiencia" y enlaces a las 4 páginas de "Qué hago".

### Las 4 páginas de "Qué hago"

Las cuatro tarjetas de la sección "Cuatro maneras de acompañarte" (en
`index.html`) son enlaces a su propia página de detalle, con el
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

### Los 4 iconos del pie de página

Los 4 iconos redondeados del footer (Psicología, Gaming, Familias,
Prevención) ahora son enlaces reales, cada uno a la página de detalle más
relacionada:

| Icono       | Lleva a                  |
|-------------|---------------------------|
| Psicología  | `divulgacion.html`        |
| Gaming      | `habitos-digitales.html`  |
| Familias    | `familias.html`           |
| Prevención  | `recursos.html`           |

Para cambiar a dónde apunta alguno, busca en cualquier página el bloque
`<ul class="footer-icons">` y edita el `href` del enlace correspondiente.

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
- Email real (`hola@samupsigamer.com`) y **número de WhatsApp real** en
  lugar de `https://wa.me/000000000`. Este número aparece en **dos
  sitios de cada página**: la tarjeta de contacto en "¿Hablamos?" y el
  botón flotante de WhatsApp (abajo a la derecha, visible en las 6
  páginas). Busca `wa.me/000000000` en los archivos `.html` y
  sustitúyelo por tu número con prefijo de país sin espacios ni símbolos
  (ejemplo: `34612345678`).
- Enlaces reales de Instagram y TikTok si aún no lo son.

## Cambios recientes

- El orden de la home ahora es: Sobre mí → Qué hago → Portfolio →
  Intereses → Testimonios → Hablamos. El menú y el pie de página
  siguen ese mismo orden.
- Las tarjetas de "Cuatro maneras de acompañarte" (home y "Sobre mí")
  ya no son clicables: son solo informativas, para no duplicar la
  función del Portfolio. Debajo de ellas hay un enlace de texto al
  Portfolio.
- El Portfolio ahora es un carrusel horizontal (con flechas y los
  filtros de siempre) en vez de una rejilla que crece hacia abajo:
  así puedes añadir más piezas sin que ocupen más alto de pantalla.
- Nueva sección de **Testimonios** (también en carrusel) entre
  "Intereses" y "Hablamos". Los testimonios son de ejemplo — sustitúyelos
  por los tuyos reales antes de publicar (busca `id="testimonialTrack"`
  en `index.html`).
- Las estadísticas de "Intereses" ahora suben animadas hasta su cifra
  al hacer scroll, y tienen iconos con más color (busca `data-target`
  en `index.html` para cambiar las cifras).
- El botón "Escríbeme" del menú ahora abre WhatsApp directamente
  (antes llevaba al mismo sitio que "Hablamos", lo cual era confuso).
- Las rejillas de 3 tarjetas (por ejemplo "Explora también" en las
  páginas de detalle, o "Formación, enfoque y experiencia" en "Sobre
  mí") ya no quedan descentradas: usan la clase `cards-grid-3`.
- Las citas destacadas (`.quote-card`) ya cierran las comillas.
- El botón flotante de WhatsApp (abajo a la derecha) ahora abre
  directamente una conversación de WhatsApp con un mensaje ya escrito,
  en vez de bajar hasta la sección de contacto.
- La imagen de la página "Sobre mí" es ahora la composición "Player 1"
  (foto real a la izquierda, versión chibi a la derecha, separadas por
  un rayo con la placa "PLAYER 1"): `assets/personajes/samu-player1.jpg`.
  La imagen se usa tal cual se generó, sin ningún retoque de color ni
  recorte, para no alterar la foto real. El marco redondeado con borde
  morado lo pone la propia web (la misma clase `.hero-image-frame` que
  usan el resto de imágenes), así que si en el futuro cambias esta
  imagen por otra, no hace falta añadirle marco ni bordes: solo
  sustituye el archivo.
  ⚠️ En el monitor del fondo de la foto se ve, de forma tenue, una
  videollamada con la cara de otra persona. Se dejó tal cual porque no
  se pidió tocarla, pero si prefieres que la difumine por privacidad,
  dímelo y lo hago sin tocar el resto de la imagen.
- Las comillas de cierre de las citas destacadas ya usan el mismo morado
  que las de apertura (antes se quedaban en blanco).
- Los iconos del pie de página ahora representan mejor cada categoría
  (bombilla = Divulgación, personas = Familias, documento = Recursos,
  gráfico = Hábitos digitales) y el texto de cada enlace coincide con su
  destino real.
- **Cada pieza del portfolio tiene ahora su propia página HTML
  independiente** (por ejemplo `por-que-enganchan.html`,
  `loot-boxes.html`...), aunque compartan categoría. Tanto las tarjetas
  del carrusel de portfolio en `index.html` como las tarjetas de "Piezas
  destacadas" dentro de cada página de categoría enlazan directamente a
  su página propia. Cada página de pieza incluye su contenido, una cita
  y enlaces a las otras piezas de la misma categoría ("Sigue
  explorando"). Para añadir una pieza nueva: crea el archivo `.html`
  siguiendo el mismo patrón que las existentes, añade su tarjeta en el
  carrusel de `index.html` con `href="tu-pieza.html"`, y opcionalmente
  una tarjeta enlazada en la sección "Piezas destacadas" de su página de
  categoría.
- Las 4 tarjetas de "Cuatro maneras de acompañarte" (en `index.html` y
  `sobre-mi.html`) ahora usan ilustraciones de personaje en vez de
  iconos, una por categoría: `assets/categorias/divulgacion.png`,
  `familias.png`, `recursos.png` y `habitos.png`. Para cambiar alguna,
  sustituye el archivo correspondiente por otra imagen con fondo
  transparente (PNG) del mismo estilo.
