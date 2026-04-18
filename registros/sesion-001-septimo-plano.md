# Sesión 001 — Séptimo Plano Studio Website
**Fecha:** 2026-04-18  
**Proyecto:** Sitio web oficial Séptimo Plano Studio  
**Estado:** Online en GitHub Pages

---

## Repositorio GitHub
- **URL:** https://github.com/septimoplano/septimoplano_web
- **Usuario GitHub:** septimoplano
- **Email:** studioseptimoplano@gmail.com
- **Branch:** master
- **GitHub Pages:** https://septimoplano.github.io/septimoplano_web

## Estructura de archivos
```
e:/WEBSTACKING WORKSPACE/septimo-plano/
├── index.html          ← Página principal (una sola página)
├── css/
│   └── style.css       ← Todos los estilos + animaciones CSS
├── js/
│   └── main.js         ← GSAP animations, canvas particles, lógica
└── assets/
    └── logo.png        ← Logo "SIN FONDO 2" (PNG transparente, blanco)
```

## Stack técnico
- HTML/CSS/JS puro (sin frameworks, sin build process)
- **GSAP 3.12.5** (CDN) + ScrollTrigger para animaciones de scroll
- **Canvas API** para partículas interactivas en el hero
- **Google Fonts:** Archivo + Archivo Black
- Deploy: GitHub Pages (rama master, raíz)

## Identidad de marca extraída de imágenes
### Paleta de colores
| Variable | Hex | Uso |
|---|---|---|
| --p900 | #0d0520 | Fondo más oscuro |
| --p800 | #1a0b2e | Fondo secciones |
| --p700 | #2d1057 | Cards, elementos |
| --p500 | #6d28d9 | Primario |
| --p400 | #7c3aed | Acción, botones |
| --p300 | #8b5cf6 | Highlights |
| --p200 | #a78bfa | Textos secundarios |
| --bright | #9333ea | Gradientes |

### Tipografía
- Headlines: **Archivo Black** (peso máximo)
- Body: **Archivo** (400, 600, 700, 800, 900)

### Personalidad de marca
- Arquetipo: **Sabio + Mago + Creador**
- Tagline: "De artistas para artistas"
- Propuesta de valor: Crear · Enseñar · Difundir
- Ubicación: Concepción, Chile

## Secciones del sitio
1. **Navbar** — Logo + links + CTA WhatsApp, scroll effect
2. **Hero** — Canvas con partículas interactivas, parallax GSAP
3. **Marquee** — Strip animado con servicios
4. **Nosotros** — Grid 2 col, arquetipo, visual card con anillos giratorios
5. **Statement** — Frase de impacto animada con slide
6. **Servicios** — Grid 3 col, 5 cards con visuales CSS animados:
   - Producción Musical (ecualizador animado)
   - Diseño Gráfico (palette swatches + posts flotantes)
   - Branding (anillos orbitales + logo + pills flotantes) ★ Popular
   - Marketing Digital (bar chart animado + métricas)
   - Formación (timeline de carrera) — Próximamente
7. **Branding** — 3 cards de "por qué importa" + stat "3 segundos" + beneficios
8. **Portfolio/Trabajo** — Grid 5 cards con diseño detallado:
   - Redes Sociales (phone mockup + stat de alcance)
   - Branding & Identidad (logo + paleta + tipografía)
   - Diseño de Merch (hoodie + credential card + tote bag) — wide card
   - Sitios Web (browser mockup con dots de colores)
   - Producción Musical (DAW con 4 pistas animadas)
9. **CTA** — Hero verde WhatsApp, fondo pulsante
10. **Footer** — 4 columnas + logo + links + contacto
11. **WhatsApp Float** — Botón fijo esquina inferior derecha con ring pulsante

## Contacto / WhatsApp
- **Número:** +56 9 3410 3995
- **Formato URL:** https://wa.me/56934103995
- **Mensaje predeterminado:** "Hola! Quiero cotizar un proyecto con Séptimo Plano"

## Decisiones técnicas importantes
- **Sin cursor custom** — removido por solicitud, cursor del sistema
- **Opacidad GSAP**: los `gsap.from()` NO usan `opacity:0` para que el contenido sea visible aunque GSAP falle. Las tarjetas usan CSS `@keyframes sc-fadein` propio.
- **Logo**: `assets/logo.png` — usado en navbar, footer, pantalla de carga, branding card, portfolio branding card, tote bag
- **GitHub Pages**: se publica automáticamente desde master/root

## Bugs resueltos en esta sesión
1. **Secciones vacías** → causa: `opacity:0` en CSS `.reveal-up` sin fallback. Fix: elementos visibles por defecto, GSAP solo anima `y`.
2. **Cursor invisible** → causa: `cursor:none` en `.nav-hamburger` y `.trabajo-card`. Fix: `cursor:pointer` y `cursor:default`.
3. **Logo no cargaba** → causa: referenciaba SVG inline, ahora usa `<img src="assets/logo.png">`.
4. **Loader con texto "SP"** → reemplazado por `<img src="assets/logo.png">`.

## Commits realizados
```
a6458ea  Initial commit: Séptimo Plano Studio website
65c6d7e  fix: remove custom cursor, fix invisible sections, replace logo with img tag
0cbd755  feat: add logo SIN FONDO 2
3b296a2  fix: remove all cursor:none, use logo.png in loader and all views
8563c01  feat: rich animated visuals for service cards and portfolio, bigger logo, fix GSAP opacity
```

## Pendientes / Próximos pasos sugeridos
- [ ] Agregar favicon (logo en 32x32)
- [ ] Sección de testimonios / clientes
- [ ] Formulario de contacto o cotización
- [ ] SEO: meta tags Open Graph para compartir en redes
- [ ] Versión móvil: revisar cards de portfolio en pantallas pequeñas
- [ ] Agregar imágenes reales de trabajos realizados en portfolio
- [ ] Configurar dominio personalizado en GitHub Pages
