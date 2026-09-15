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
├── sobre-mi.html               # Página propia: Sobre mí
├── por-que-enganchan.html      # Piezas del portfolio: una página HTML
├── loot-boxes.html             #   independiente por cada pieza, aunque
├── mitos-salud-mental.html     #   compartan categoría (Divulgación,
├── hablar-tiempo-pantalla.html #   Familias, Recursos o Hábitos digitales)
├── senales-alarma.html
├── acuerdos-familiares.html
├── checklist-uso-problematico.html
├── glosario-gamer.html
├── kit-educadores.html
├── diseno-recompensas.html
├── limites-que-se-mantienen.html
├── rutina-digital-5-pasos.html
├── guia-loot-boxes.html        # Guía larga (infografía + 10 apartados)
├── 404.html
├── styles.css
├── script.js
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── _headers             # Cloudflare Pages: cabeceras HTTP
├── _redirects           # Cloudflare Pages: redirecciones
├── favicon.ico
├── functions/
│   └── api/
│       └── views.js     # Cloudflare Pages Function: contador de vistas
└── assets/
    ├── hero-samu.png
    ├── personajes/                 # Mascota en distintas poses
    ├── categorias/                 # Ilustraciones de "Cuatro maneras de acompañarte"
    ├── lootboxes/                  # Imágenes de la guía de loot boxes
    ├── descargables/               # PDF descargables del portfolio (ver más abajo)
    └── brand/                      # Identidad de marca
        ├── icon-16.png, icon-32.png, icon-180.png, icon-192.png, icon-512.png
        ├── apple-touch-icon.png
        └── og-image.png            # Imagen para compartir en redes
```

### La sección "Portfolio"

En `index.html`, entre "Qué hago" y "Servicios" hay una sección
`id="portfolio"` con un carrusel horizontal de piezas: cada tarjeta
tiene una etiqueta de formato (Artículo, Vídeo, Guía descargable...),
un título, una descripción corta y, en su pie:

- Un botón **"Leer artículo"** que lleva directo a la página propia de
  esa pieza (por ejemplo `por-que-enganchan.html`) — no hay páginas de
  categoría intermedias.
- Un botón **"Descargar PDF"**, solo en las piezas que tengan un PDF
  asociado (ver la sección "PDF descargables" más abajo).
- Un contador de vistas (icono de ojo) — ver "Contador de vistas".

Arriba de la rejilla hay botones de filtro (Todo / Divulgación /
Familias / Recursos / Hábitos digitales / Contenido descargable) que
muestran u ocultan tarjetas según la categoría o si tienen PDF —
funciona con JavaScript puro, sin recargar la página (`script.js`,
bloque "Filtro del portfolio").

Para **añadir, quitar o editar una pieza**:

1. Abre `index.html`, busca `<div class="portfolio-track" id="portfolioTrack">`
   y edita/añade una tarjeta `<article class="feature-card portfolio-card" ...>`.
   El atributo `data-category` debe ser uno de: `divulgacion`,
   `familias`, `recursos`, `habitos` (así el filtro la reconoce), y el
   botón "Leer artículo" debe apuntar al archivo `.html` de esa pieza.
2. Crea esa página `.html` siguiendo el mismo patrón que las existentes
   (copia una parecida y cambia el contenido).

### PDF descargables

La carpeta `assets/descargables/` es donde guardar los PDF de las
piezas que quieras ofrecer para descargar (dentro tienes un `LEEME.txt`
con los pasos exactos). Resumen:

1. Guarda el PDF ahí con el mismo nombre que la pieza, por ejemplo
   `kit-educadores.pdf`.
2. En `index.html`, en la tarjeta de esa pieza, cambia
   `data-downloadable="false"` por `"true"` y añade el botón
   `<a href="assets/descargables/kit-educadores.pdf" class="card-btn card-btn-ghost" download>Descargar PDF</a>`
   dentro de `.portfolio-card-actions`.

De momento solo **Loot boxes** tiene PDF
(`assets/descargables/loot-boxes.pdf`, generado a partir de
`guia-loot-boxes.html`).

### Contador de vistas

Cada tarjeta del portfolio tiene un contador (icono de ojo + número)
que cuenta vistas únicas por dispositivo. Necesita una KV namespace de
Cloudflare enlazada como `VIEWS` (Settings → Functions → KV namespace
bindings en tu proyecto de Pages) — el código ya está en
`functions/api/views.js`. Sin esa KV, el sitio funciona igual y los
contadores simplemente se quedan en 0.

### La página "Sobre mí"

El enlace "Sobre mí" del menú lleva a su propia página, `sobre-mi.html`,
con el contenido de presentación, una sección de "Formación, enfoque y
experiencia" y las 4 tarjetas informativas de "Cuatro maneras de
acompañarte" (no son enlaces: para ver el trabajo real remiten al
Portfolio de la portada).

### Los 4 iconos del pie de página

Los 4 iconos redondeados del footer (Divulgación, Familias, Recursos,
Hábitos digitales) llevan a la sección Portfolio de la portada con ese
filtro ya aplicado, por ejemplo `index.html?cat=familias#portfolio`
(o `?cat=familias#portfolio` si ya estás en la portada). El filtro se
aplica solo con JavaScript al cargar la página (`script.js`, al final
del bloque "Filtro del portfolio").

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
- El botón "Escríbeme" al final de `sobre-mi.html` y de las 4 páginas de
  categoría (`divulgacion.html`, `familias.html`, `recursos.html`,
  `habitos-digitales.html`) ahora abre WhatsApp directamente, igual que
  el resto de botones "Escríbeme" del sitio (antes bajaba a la sección
  de contacto de la portada).
- **Nueva página `guia-loot-boxes.html`**: la guía larga sobre loot
  boxes (infografía + 10 apartados: qué son, incertidumbre, refuerzo
  variable, pity, señales de alerta, legislación por país, consejos y
  preguntas frecuentes). Tiene su propio diseño claro, distinto del
  resto del sitio oscuro, pensado como página de "guía descargable".
  Desde `loot-boxes.html` hay un aviso destacado ("¿Quieres entrar en
  detalle?") que enlaza a esta guía. Sus imágenes viven en
  `assets/lootboxes/` (`lootboxes-infografia.png` y `lootbox-1.png` a
  `lootbox-6.png`).
- **Nueva sección "Servicios"** en la portada (`index.html`, entre
  Portfolio e Intereses, `id="servicios"`), con 3 tarjetas de precio
  orientativas (Sesión individual, Orientación a familias — destacada — 
  y Pack de seguimiento) más una línea final para charlas o talleres a
  medida. Los precios son de ejemplo: para cambiarlos, abre `index.html`
  y busca `id="servicios"` — cada tarjeta es un bloque
  `<article class="pricing-card">` con su importe en
  `<span class="value">`. Se añadió también al menú y al pie de página
  de todas las páginas.
- **Portfolio: descarga en PDF, lectura directa y contador de vistas.**
  Cada tarjeta del carrusel de `index.html` (`id="portfolioTrack"`)
  ahora tiene dos botones — "Leer artículo" (va directo a la pieza) y,
  solo si esa pieza tiene material descargable, "Descargar PDF" — más
  un contador de vistas (icono de ojo) abajo a la derecha. También hay
  un filtro nuevo, "Contenido descargable", que muestra solo las
  piezas con PDF.
  - Para marcar una pieza como descargable: en su tarjeta, cambia
    `data-downloadable="false"` por `"true"` y añade dentro de
    `.portfolio-card-actions` un enlace
    `<a href="assets/descargables/tu-pieza.pdf" class="card-btn card-btn-ghost" download>Descargar PDF</a>`.
  - De momento solo **Loot boxes** tiene PDF
    (`assets/descargables/loot-boxes.pdf`, generado a partir de
    `guia-loot-boxes.html`). Dime qué otras piezas quieres con PDF y
    los genero igual.
  - **El contador de vistas necesita configurar algo en Cloudflare**
    (la web sigue funcionando igual sin hacerlo, pero los contadores se
    quedan en 0): en el panel de tu proyecto de Cloudflare Pages ve a
    **Settings → Functions → KV namespace bindings** y añade una KV
    namespace nueva (o una que ya tengas) con el nombre de variable
    `VIEWS`. El código ya está listo en `functions/api/views.js` — en
    cuanto la KV esté enlazada y despliegues de nuevo, los contadores
    funcionan solos (cuentan como mucho una vez por dispositivo y
    pieza, usando la IP de quien visita, sin guardar la IP en claro).
- **Se eliminaron las 4 páginas de categoría** (`divulgacion.html`,
  `familias.html`, `recursos.html`, `habitos-digitales.html`). Ahora se
  salta directo de la portada a cada pieza del portfolio con "Leer
  artículo", y la categoría solo se usa para el filtrado (botones de
  filtro en la sección Portfolio). Los iconos del pie de página, que
  antes llevaban a esas páginas, ahora llevan a la portada con el
  filtro de esa categoría ya aplicado (`?cat=familias#portfolio`, por
  ejemplo). Se añadieron redirecciones 301 en `_redirects` desde las
  URLs antiguas por si algún enlace externo o de Google todavía
  apunta a ellas.
- Nueva carpeta `assets/descargables/` (con su `LEEME.txt`) para ir
  guardando ahí los PDF del contenido descargable del portfolio.
