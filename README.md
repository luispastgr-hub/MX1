# Webica — Home

Sitio estático (HTML + CSS + JS vanilla, sin build, sin npm en el entregable)
construido siguiendo el skill `adrian-saenz-hostinger-premium-website`
instalado en `.claude/skills/` — listo para subir por FTP/drag-and-drop a
Hostinger o cualquier hosting estático. También sirve como base para portar
a Elementor: cada `<section>` puede pegarse como widget de "HTML
personalizado", o reconstruirse con widgets nativos usando las mismas
variables de `styles.css` (`:root { --blue-600, --blue-700, ... }`).

## Estructura (layout canónico del skill)
```
index.html
styles.css           ← una sola hoja, seccionada
main.js              ← entry point, patrón IIFE + safe() + boot()
lib/
  gsap.min.js         ← traído vía npm (unpkg está bloqueado en este entorno)
  ScrollTrigger.min.js
  manifest.js         ← window.__BRAND__ (contacto, reseñas, clientes)
assets/
  img/                ← WebP cuando haya fotos reales
  photos/source/       ← originales del usuario (no se suben al hosting)
  credits.json        ← atribución si se usan imágenes de Openverse
.htaccess             ← caché + redirección www→no-www + pretty URLs
```

## Arquetipo visual elegido
El skill mapea "estudio de diseño" a los arquetipos 07 (Brutalista), 03 (3D
Cinemático) o 05 (Gradiente reactivo al mouse) — los tres pensados para
estudios de branding que buscan verse "edgy", lo cual choca con el mandato
del cliente de un tono "profesional-confiable, no lujo ni juguetón" y con la
paleta azul/blanco obligatoria. Se adaptó el **Arquetipo 04 — Glassmorphism
Modern** (el más cercano: SaaS/negocio confiable, tarjetas de cristal, mockup
de producto flotante) reemplazando su paleta pastel por el azul de marca.
Efectos aplicados de este arquetipo: header con blur real, tarjetas de vidrio
(`backdrop-filter`) en "Trabajamos a distancia", mockup flotante en el hero,
botones magnéticos sutiles en los CTAs de WhatsApp principales, subrayado
animado en el nav.

## Decisiones de diseño
- **Paleta:** `#027FFF` es el azul de marca y se usa tal cual en íconos, bordes,
  focus rings y superficies grandes. Para texto/botones se usa un degradado
  entre `#0163CC` y `#0170E0` (mismo hue, un escalón más oscuro) porque
  `#027FFF` sólido mide 3.83:1 sobre blanco — no alcanza el 4.5:1 AA que pide
  el propio brief. Todo el resto de la paleta se deriva del mismo hue.
- **Tipografía:** Plus Jakarta Sans (display/body) + JetBrains Mono (eyebrows,
  números de paso, address bar del mockup) — elegidas por el generador de
  sistema de diseño de `ui-ux-pro-max` para el patrón B2B/Trust & Authority.
- **Elemento de firma:** el "browser chrome" (barra de pestaña + puntos +
  address bar) que enmarca el mockup del hero se repite como motivo visual,
  reforzando "construimos sitios reales" sin caer en clichés de IA/robot.
- **Íconos:** Heroicons (outline, MIT) instalados vía npm y embebidos como SVG
  en línea con trazo 1.5 consistente — sin emojis, sin dependencia externa en
  producción (el paquete solo se usó como fuente de los paths al generar el HTML).
- **Degradados y movimiento:** botones y acentos usan un degradado de dos tonos
  del azul de marca (ambos extremos pasan 4.5:1); el hero tiene dos "orbes" de
  degradado con flotación lenta; el mockup del hero flota sutilmente; el
  contenido del hero entra con una animación escalonada al cargar; las
  secciones revelan al hacer scroll (más notorio que la v1); las tarjetas de
  servicio tienen una barra de degradado y el ícono rota/escala en hover.
  Todo respeta `prefers-reduced-motion`.
- **Navegación:** el menú sigue el mapa de sitio del cliente al pie de la letra
  — `Inicio · Servicios▾ · Planes · Casos · Nosotros · Blog · Contacto` + botón
  WhatsApp único en el header (sin botón secundario). "Servicios" es un
  desplegable real (hover en desktop, clic/teclado accesible, acordeón en
  móvil) con los 9 servicios en el orden de importancia del mapa de sitio
  (diseño web primero, chatbots en la posición 4), igual en el home y en el
  footer.
- **Hero con foto, no solo mockup:** el brief original pedía evitar stock de
  "gente en oficina" y usar un mockup de producto; el cliente comparó contra
  su sitio en producción (que sí usa una foto de personas) y decidió que la
  foto da más confianza. El hero ahora reserva un contenedor 4:5 para una foto
  real (equipo o cliente trabajando, no stock genérico) con un placeholder
  claro, y el mockup de navegador quedó como una insignia flotante secundaria
  en la esquina — conserva el gesto de "construimos sitios reales" sin competir
  con la foto.
- **Tarjetas de servicio de largo parejo:** las 9 descripciones se acortaron a
  un rango de 22–29 palabras (antes iban de 20 a 46) para que el grid se vea
  balanceado y ninguna tarjeta domine por tener más texto. Esto ajusta
  ligeramente el copy "palabra por palabra" original — avisar si prefieres el
  texto literal del brief y resolver el balance solo con CSS en su lugar.

## Estructura narrativa completa (v2 del contenido)
Se reconstruyó el home siguiendo el documento "versión final" que recupera la
jerarquía del sitio original: **Hero → Barra de confianza → Enganche ("Crea tu
sitio web o tienda en línea") → Servicios (9) → Todo incluido (checklist 4×2)
→ Expertos en ecommerce → Trabajamos a distancia → Cómo trabajamos → Quiénes
somos (extracto) → Recuperación de sitios (extracto) → Reseñas → Clientes
(logos) → Planes → Preguntas frecuentes → Cierre**. Se agregó schema
`FAQPage` y se actualizaron el `<title>`/meta description al nuevo enfoque
("página web o tienda en línea, todo incluido").

La sección "Para quién" (industrias) de la versión anterior **se quitó**: no
aparece en el orden de secciones de este documento. Si prefieres conservarla
en algún punto, dime dónde y la regreso.

La sección "Expertos en ecommerce" se diseñó en blanco (no en el degradado
azul oscuro) a propósito: puesta junto a "Trabajamos a distancia" (que sí es
azul oscuro), dos secciones oscuras consecutivas se fundían en un solo bloque
sin costura visible — lo detecté al revisar la captura completa y lo corregí
antes de entregar.

## Cumplimiento de las reglas técnicas del skill
- **Sin ES modules**: todo `<script defer>` clásico, `main.js` es un IIFE.
  Funciona abriendo `index.html` con doble clic (`file://`) — probado.
- **`prefers-reduced-motion` corregido**: la v2 apagaba TODAS las
  transiciones con `*, *::before, *::after { transition-duration: 0.01ms
  !important }`, que es justo el error que el skill marca como gotcha A.2 —
  deja el sitio "muerto" para el porcentaje de usuarios de Windows que traen
  ese flag activado por defecto sin haberlo pedido. Ahora solo se apagan los
  loops infinitos genuinamente intrusivos (orbes del hero, flotación del
  mockup, ping de WhatsApp); hovers, fades y scroll-reveal siempre corren.
  Verificado con Playwright emulando `reduced-motion: reduce`.
- **IntersectionObserver corregido** (gotcha A.8): threshold bajó de `0.15`
  a `0.01` + `rootMargin -2%`, y se agregó una red de seguridad a los 6s que
  revela cualquier elemento que el observer no haya disparado.
- **Caché de Hostinger** (gotcha A.13): `.htaccess` en la raíz + `?v=20260714`
  en `styles.css` y `main.js` — bumpear esa fecha en cada deploy que toque
  CSS/JS.
- **GSAP + ScrollTrigger** vendorizados en `lib/` vía npm (el stack del skill
  los declara "always"); `Lenis` se omitió a propósito — el scroll nativo es
  la recomendación explícita del propio skill (gotcha B.1.4), y el Arquetipo
  04 no requiere inercia tipo Mac.
- **Verificado con `scripts/verify_project.py`** del skill: 0 errores, 1
  advertencia esperada (Lenis ausente, intencional).
- **Openverse bloqueado en este entorno** (igual que Pexels/unpkg vía CDN):
  las fotos generales del hero y demás secciones quedan como placeholder
  claramente marcado en vez de imágenes de stock — usa `scripts/openverse_fetch.py`
  del skill localmente si quieres traerlas tú, o súbelas a
  `assets/photos/source/` y aviso.

## Pendientes antes de publicar (marcados con `TODO` en el código)
- [ ] Número real de WhatsApp (hoy `52XXXXXXXXXX` en 5 lugares: header, hero,
      mobile-nav, sección "a distancia", cierre, footer, botón flotante)
- [ ] Capturas reales de proyectos (AltiSuma, Pearl Club, Galería REALIA) para
      el mockup del hero, "Crea tu sitio o tienda", "Expertos en ecommerce" y
      la franja de clientes
- [ ] Texto real de las 6 reseñas de Google (hoy placeholder claramente marcado)
- [ ] `+[N] proyectos entregados` — número real
- [ ] Imagen Open Graph 1200×630 (`assets/img/og-image.webp`)
- [ ] Logo real (`assets/img/logo.webp`) para el schema `Organization`
- [ ] Teléfono real y URLs de redes sociales para el schema JSON-LD
- [ ] `aggregateRating.reviewCount` en el schema — hoy en 6, debe reflejar el
      total real de reseñas de Google
- [x] Slug de "Chatbots y asistentes con IA" confirmado como `/soluciones-ia`
      por el mapa de sitio oficial.
- [ ] Redirección 301 de `www.webica.mx` → `https://webica.mx/` (se configura
      a nivel de hosting/Elementor, no en este HTML)
- [ ] Página `/aviso-de-privacidad` (enlazada en el footer, aún no existe)

## Cómo previsualizar
```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```
O simplemente doble clic en `index.html` — no necesita servidor.

## Cómo desplegar
Arrastra toda la carpeta (incluido `.htaccess`, que empieza con punto y
puede quedar oculto en tu explorador de archivos) al File Manager de
Hostinger, o súbela por FTP. `lib/`, `assets/` y `.htaccess` deben ir todos
al mismo nivel que `index.html`.
