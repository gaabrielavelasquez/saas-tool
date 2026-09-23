"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { colorVars, radiusVars, shadowVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Stack } from "@astryxdesign/core/Stack";
import { ArrowRight } from "lucide-react";

// Relación de aspecto real de public/mockup.jpg (3920×2223) a mitad de
// escala — next/image la necesita para reservar el espacio sin layout
// shift; el ancho real en pantalla lo decide el CSS (width: 100%).
const MOCKUP_WIDTH = 1960;
const MOCKUP_HEIGHT = 1112;

// Tamaño pedido puntualmente (158×50, radius 20) — no mapea a la escala
// sm/md/lg del Button de Astryx (que tampoco expone width/height/radius
// exactos ni xstyle), así que este CTA es un link propio con stylex, no
// el componente Button. Mismo patrón ya usado en Launcher.tsx/
// RestartTourButton para formas que el sistema no cubre.
const styles = stylex.create({
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: radiusVars["--radius-container"],
    boxShadow: shadowVars["--shadow-high"],
  },
  // Cubre exactamente el área de la imagen (no solo alrededor del
  // botón) — el blur en hover tiene que verse en todo el fondo, según
  // feedback. `pointer-events: none` para que no le robe el hover/click
  // ni a la imagen ni al botón que queda arriba.
  blurOverlay: {
    position: "absolute",
    inset: 0,
    borderRadius: radiusVars["--radius-container"],
    pointerEvents: "none",
    // StyleX optimiza cualquier "0"/"0px" adentro de blur() a un
    // `blur()` vacío (CSS inválido) — 0.01px es imperceptible pero un
    // valor real, así el navegador tiene desde dónde animar la transición.
    backdropFilter: {
      default: "blur(0.01px)",
      ":is([data-hovered=true])": "blur(8px)",
    },
    WebkitBackdropFilter: {
      default: "blur(0.01px)",
      ":is([data-hovered=true])": "blur(8px)",
    },
    transitionProperty: "backdrop-filter, -webkit-backdrop-filter",
    transitionDuration: {
      default: "300ms",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    transitionTimingFunction: "ease-out",
  },
  buttonOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: 158,
    height: 50,
    borderRadius: 20,
    backgroundColor: colorVars["--color-accent"],
    color: colorVars["--color-on-accent"],
    boxShadow: shadowVars["--shadow-high"],
    fontSize: 17,
    fontWeight: 600,
    fontFamily: "inherit",
    textDecoration: "none",
  },
});

/**
 * Screenshot real del producto, con un único CTA flotando en el centro
 * (mismo patrón que el "Watch a quick demo" de la referencia de Barrie).
 * Al pasar el mouse por el botón, toda la imagen detrás se desenfoca
 * sutilmente — no solo el área alrededor del botón. Como StyleX no
 * soporta selectores de hermano/combinador (`.button:hover ~ .overlay`),
 * el hover se seguí a mano con estado de React y se expone al overlay
 * vía `data-hovered`, mismo patrón que `data-active`/`data-open` ya
 * usado en Launcher/IndexPanel.
 */
export function HeroImage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Stack xstyle={styles.wrapper}>
      <Image
        src="/mockup.jpg"
        alt="Vista previa de Inlay: el detalle de un campo documentado, con su criterio y quién lo registró"
        width={MOCKUP_WIDTH}
        height={MOCKUP_HEIGHT}
        priority
        {...stylex.props(styles.image)}
      />
      <div data-hovered={isHovered} {...stylex.props(styles.blurOverlay)} />
      <Stack xstyle={styles.buttonOverlay}>
        <Link
          href="/flujo-completo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          {...stylex.props(styles.button)}
        >
          <ArrowRight size={20} aria-hidden />
          Ver Demo
        </Link>
      </Stack>
    </Stack>
  );
}
