import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text, Heading } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Search, Link2, Library, BarChart3, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "Detecta campos sin justificar",
    description:
      "Marca automáticamente los campos sin contexto documentado, sin necesidad de revisarlos uno por uno.",
  },
  {
    icon: Link2,
    title: "Un criterio por campo, no un doc aparte",
    description:
      "El contexto vive junto al campo mismo, no en un documento separado que nadie vuelve a abrir.",
  },
  {
    icon: Library,
    title: "Índice global de justificaciones",
    description: "Busca cualquier criterio documentado, de cualquier campaña, desde un solo lugar.",
  },
  {
    icon: BarChart3,
    title: "Cobertura medible por campaña",
    description: "Cada campaña muestra qué porcentaje de sus campos tiene contexto documentado.",
  },
  {
    icon: Wand2,
    title: "Se adapta a lo que hay",
    description:
      "El onboarding ajusta sus pasos según los campos reales de cada campaña, sin mostrar pasos que no aplican.",
  },
];

const styles = stylex.create({
  icon: {
    display: "inline-flex",
    color: colorVars["--color-accent"],
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-3"],
  },
});

/**
 * "Todo al alcance" — CLAUDE.md no define esta sección (no viene de
 * Figma), pedida explícitamente para la landing. Grid responsivo en vez
 * de una cantidad fija de columnas: con 5 items no hay una grilla pareja,
 * así que se reacomoda solo según el ancho disponible.
 */
export function LandingFeatures() {
  return (
    <Stack gap={6}>
      <Heading level={2}>Todo al alcance</Heading>
      <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
        {FEATURES.map(({ icon: FeatureIcon, title, description }) => (
          <Card key={title} elevation="low" xstyle={styles.card}>
            <span {...stylex.props(styles.icon)}>
              <FeatureIcon size={22} />
            </span>
            <Text type="body" weight="semibold">
              {title}
            </Text>
            <Text type="body" color="secondary">
              {description}
            </Text>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
