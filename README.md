# Webica — Home

HTML + CSS + JS puro (sin build step), pensado para portar a Elementor: cada
`<section>` de `index.html` puede pegarse como un widget de "HTML personalizado"
tal cual, o reconstruirse con widgets nativos de Elementor usando las mismas
variables de `css/styles.css` (`:root { --blue-600, --blue-700, ... }`).

## Estructura
- `index.html` — home completo, una sola página
- `css/styles.css` — tokens de diseño + estilos (mobile-first)
- `js/main.js` — menú móvil, header sticky, scroll-reveal (respeta `prefers-reduced-motion`)

## Decisiones de diseño
- **Paleta:** `#027FFF` es el azul de marca y se usa tal cual en íconos, bordes,
  focus rings y superficies grandes. Para texto/botones se usa `--blue-700`
  (`#0163CC`, el mismo tono un escalón más oscuro) porque `#027FFF` mide
  3.83:1 sobre blanco — no alcanza el 4.5:1 AA que pide el propio brief.
  Todo el resto de la paleta se deriva del mismo hue.
- **Tipografía:** Plus Jakarta Sans (display/body) + JetBrains Mono (eyebrows,
  números de paso, address bar del mockup) — elegidas por el generador de
  sistema de diseño de `ui-ux-pro-max` para el patrón B2B/Trust & Authority.
- **Elemento de firma:** el "browser chrome" (barra de pestaña + puntos +
  address bar) que enmarca el mockup del hero se repite como motivo visual,
  reforzando "construimos sitios reales" sin caer en clichés de IA/robot.
- **Íconos:** SVG en línea, sin emojis ni librerías externas (evita dependencias
  para el traspaso a Elementor).

## Pendientes antes de publicar (marcados con `TODO` en el código)
- [ ] Número real de WhatsApp (hoy `52XXXXXXXXXX` en 5 lugares: header, hero,
      mobile-nav, sección "a distancia", cierre, footer, botón flotante)
- [ ] Capturas reales de proyectos (AltiSuma, Pearl Club) para el mockup del hero
- [ ] Texto real de las 6 reseñas de Google (hoy placeholder claramente marcado)
- [ ] `+[N] proyectos entregados` — número real
- [ ] Imagen Open Graph 1200×630 (`assets/img/og-image.jpg`)
- [ ] Logo real (`assets/img/logo.png`) para el schema `Organization`
- [ ] Teléfono real y URLs de redes sociales para el schema JSON-LD
- [ ] `aggregateRating.reviewCount` en el schema — hoy en 6, debe reflejar el
      total real de reseñas de Google
- [ ] Confirmar el slug de la tarjeta "Chatbots y asistentes con IA"
      (usé `/soluciones-ia`; no aparece en la lista oficial de 11-12 páginas
      internas del brief)
- [ ] Redirección 301 de `www.webica.mx` → `https://webica.mx/` (se configura
      a nivel de hosting/Elementor, no en este HTML)
- [ ] Página `/aviso-de-privacidad` (enlazada en el footer, aún no existe)

## Cómo previsualizar
```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```
