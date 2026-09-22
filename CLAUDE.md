# Proyecto: Herramienta B2B — capa de documentación contextual para RevOps

Contexto para Claude Code en este repo. Escrito a partir del PRD final (`06-prd-borrador.md`) y el plan de proceso (`00-plan-y-pasos.md`) del proyecto de portfolio de Gabi, ambos en el Project "IA on Product Design" de claude.ai (Claude Code no puede leer ese Project directamente — por eso este archivo).

## Qué es el producto

Capa superpuesta (overlay/extensión) inyectada sobre herramientas B2B anfitrionas ajenas (Salesforce, HubSpot, Xtreme Push, etc.) que documenta el *criterio/contexto* (el "por qué") detrás de una métrica, límite o decisión de configuración heredada — no el *qué* (eso ya lo muestra la herramienta anfitriona). Público objetivo: alguien en RevOps/CS Ops/Marketing Ops que hereda un panel que no armó.

**No es:** una plataforma de BI, un DAP tipo Pendo/Whatfix, ni un producto que se conecta a herramientas anfitrionas reales en v1 (se simula sobre un mock genérico).

## Arquitectura del producto (decisión final, no reabrir sin razón fuerte)

- **Patrón:** capa overlay inyectada, no standalone.
- **Punto de entrada:** launcher flotante circular, esquina inferior derecha, independiente de la sidebar del host.
- **Superficie principal:** panel lateral anclado a la derecha, **400px de ancho**, sin oscurecer el fondo del host (nunca dimmer/modal).
- **Aislamiento visual sin dimmer:** elevación alta (mapear a tokens de elevación de Astryx), borde de acento de 3px en color de marca, e indicación dinámica de alcance en el propio contenido ("Buscando en todas las campañas" vs. "Resultados en [campaña]").
- **Card de detalle de un campo individual** (distinta del panel): 380px de ancho, anclada, no modal.

## Granularidad y flujo de datos

- Documentación **por campo individual**, no por sección ni por pantalla.
- Formulario de creación: **1 solo campo de texto libre** (textarea), placeholder instructivo con ejemplo real. Flujo en **menos de 3 pasos**, sin aprobación.
- Metadata "quién" + "cuándo" se genera **100% automática** por el sistema — nunca la completa el usuario a mano. Formato de fecha: **relativo** ("hace 12 días"), no absoluto — mantener consistencia en toda la UI.
- **No usar un LLM para parsear el texto libre en sub-categorías en tiempo real.** Se evaluó y se descartó a propósito para v1: introduce latencia justo cuando el usuario está bajo presión de tiempo, y viola el requisito de flujo <3 pasos. Queda reservado para v2+ (ver PRD, Future Considerations P2).

## Vocabulario — usar exactamente así

- **Label de dato (uppercase, donde se muestra un valor puntual):** `CRITERIO / CONTEXTO`. Nunca "POR QUÉ" como label de campo.
- **Término narrativo (onboarding, copy conceptual, nunca como label):** "documentar el por qué".
- Metadata section label: `REGISTRADO POR`.
- Estados de un campo: `documentado` / `sin documentar` / `sensible` (badge + color semántico, no solo texto).

## Requisitos P0 — ya validados en Figma + design critique, no requieren re-diseño

1. Indicador visual por campo (badge de estado).
2. Vista de detalle: sección única "CRITERIO / CONTEXTO" + "REGISTRADO POR", card anclada.
3. Flujo de agregar en <3 pasos, 1 campo libre (ver arriba).
4. Vista de cobertura: % documentado, desglose por estado, barra segmentada, lista de campos.

P1 ya diseñado: búsqueda/índice global de todos los "por qués" (panel de 400px descrito arriba), historial simple de cambios (no diseñado en detalle), marcar campo como "sensible".

## Fuente de verdad visual: Figma

- Archivo: `Herramienta-dashboard-B2B`, fileKey `Y8iUlG94EG5OlGlYKsS0dI`, página "Fase 4 — Pantallas".
- 6 pantallas: Onboarding, Primer uso + tooltips, Detalle, Agregar, Cobertura, Índice de justificaciones — más 4 estados vacío/carga (Cobertura vacío, Índice sin-resultados-búsqueda, Índice sin-resultados-filtro, Índice cargando).
- Design tokens en la página "Fase 4 — Tokens": paleta indigo de marca (`interactive/default` ≈ rgb 0.31/0.36/0.82), semantic tokens para bg/text/border/status. `text/secondary` fue endurecido a nivel de token para pasar WCAG AAA (~7.4:1) — no lo aflojes al portar.
- El launcher es un component set con 3 variantes (`State=Default/Hover/Active`) — en Active, el ícono cambia de 3 barras a una X, no solo el color.
- **Las pantallas de Figma son referencia de layout/intención, no componentes 1:1 con el código final** — hay una nota de compatibilidad conocida entre los tokens de Figma y Astryx, revisarla al implementar.
- Comportamientos documentados como spec pero NO construidos como frames estáticos en Figma (implementar directamente en código): botón "Guardar" deshabilitado cuando el textarea está vacío; sidebar colapsable del host (solo el ícono/affordance del toggle está en Figma, no el estado colapsado).

## Stack confirmado

- **Astryx** (design system open source de Meta, React 19+, sobre **StyleX** — no Tailwind). Librería de Figma oficial en sync automático con el código.
- Riesgo aceptado: Astryx es muy nueva, poca comunidad — si genera demasiada fricción/atraso, fallback documentado a shadcn/ui + Tailwind sin culpa (los tokens están pensados para portar a cualquier stack).
- Evaluar Supabase (casi siempre necesario), Stripe o ElevenLabs según lo que se necesite.
- Deploy final en Vercel.

## Forma de trabajar con Gabi

- Prefiere que se le avise cuando hay una duda real, en vez de asumir — preguntar antes de decidir.
- Prefiere respuestas y explicaciones cortas y directas, sin rodeos.
- Es Product Designer (no developer senior), se considera principiante en el código — no asumir que entiende fundamentos técnicos sin que se le expliquen.

<!-- ASTRYX:START -->
Astryx v0.6.2 · 164 components
CLI: run every command as `npx astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing, page frame included.
- Frame first: read `astryx docs layout` before writing any page or screen — page frame, region widths, breakpoint behavior.
- Dense data = rows (Table, List/Item), never Card-wrapped list items; Card is for standalone widgets. Status = StatusDot/Token; Badge = counts only.
- Custom styling: component props first; else the xstyle prop / StyleX tokens (@astryxdesign/core/theme/tokens.stylex). No raw hex/px.
- Tokens for every value (`astryx docs tokens`). Brand/accent belongs in the theme (`astryx theme list` / `theme add <slug>`, or `astryx theme template` for a custom one) — never override --color-* in :root.
- SELF-CHECK before you finish: re-read the file and replace any className=, style={{…}}, raw <div>/<span> layout, imported .css/@apply, or hardcoded #hex/px with the component or the xstyle prop + a token. If unsure a component/prop exists, run `astryx component <Name>` / `astryx search "<thing>"`; don't hand-roll CSS.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   164 components by category
  template --list    page + block recipes
  docs <topic>       browser-support, cli-integrations, color, elevation, getting-started, icons, illustrations, internationalization, layout, migration, motion, principles, shape, spacing, styling-libraries, styling, theme, tokens, typography, working-with-ai
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any Astryx or integration dependency bump
<!-- ASTRYX:END -->
