import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { radiusVars, shadowVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Button } from "@astryxdesign/core/Button";
import { Stack } from "@astryxdesign/core/Stack";

// Relación de aspecto real de public/mockup.jpg (3920×2223) a mitad de
// escala — next/image la necesita para reservar el espacio sin layout
// shift; el ancho real en pantalla lo decide el CSS (width: 100%).
const MOCKUP_WIDTH = 1960;
const MOCKUP_HEIGHT = 1112;

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
  buttonOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

/**
 * Screenshot real del producto, con un único CTA flotando en el centro
 * (mismo patrón que el "Watch a quick demo" de la referencia de Barrie).
 * Reemplaza al mockup armado con componentes en vivo: Gabi prefirió
 * congelarlo como imagen — mismo look, sin la sobrecarga de renderizar
 * FieldRow/FieldDetailCard reales solo para la landing.
 */
export function HeroImage() {
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
      <Stack xstyle={styles.buttonOverlay}>
        <Button href="/flujo-completo" label="Ver Demo" variant="primary" size="lg" elevation="high" />
      </Stack>
    </Stack>
  );
}
