import { Fragment } from "react";
import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";
import { Card } from "@astryxdesign/core/Card";
import { Stack } from "@astryxdesign/core/Stack";
import { Divider } from "@astryxdesign/core/Divider";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge, type FieldStatus } from "./StatusBadge";

const ROWS: { label: string; value: string; status: FieldStatus }[] = [
  { label: "Límite de descuento por campaña", value: "15%", status: "sin-documentar" },
  { label: "Frecuencia de envío de emails", value: "3 por semana", status: "documentado" },
  { label: "Segmento por defecto", value: "Clientes activos", status: "documentado" },
  { label: "Campo de puntuación de lead", value: "Score mayor a 80", status: "sensible" },
];

const styles = stylex.create({
  backdrop: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: spacingVars["--spacing-10"],
    // Gradiente sutil con el propio token de acento — nada de fotos de
    // stock; el mismo indigo de marca, diluido, detrás de la card.
    backgroundImage: `radial-gradient(ellipse 60% 100% at 50% 0%, color-mix(in srgb, ${colorVars["--color-accent"]}, transparent 88%) 0%, transparent 75%)`,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-0-5"],
    paddingInline: spacingVars["--spacing-6"],
    paddingBlock: spacingVars["--spacing-5"],
  },
});

/**
 * Mockup del producto real, enmarcado — en vez de una captura de pantalla
 * (no hay forma de generar una en este entorno), recrea la pantalla de
 * /flujo-completo con los componentes reales (FieldRow + StatusBadge) y
 * los datos reales de la campaña "Envío de bienvenida". Se mantiene en
 * sync solo porque son los mismos componentes, no una imagen que se
 * desactualiza.
 */
export function HeroMockup() {
  return (
    <Stack xstyle={styles.backdrop}>
      <Card padding={0} elevation="high" maxWidth={640} width="100%">
        <Stack xstyle={styles.header}>
          <Text type="body" weight="semibold">
            Envío de bienvenida
          </Text>
          <Text type="supporting" color="secondary">
            Campaña de email · Activa
          </Text>
        </Stack>
        <Divider />
        {ROWS.map((row, index) => (
          <Fragment key={row.label}>
            <FieldRow
              label={row.label}
              value={row.value}
              badge={<StatusBadge status={row.status} />}
            />
            {index < ROWS.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Card>
    </Stack>
  );
}
