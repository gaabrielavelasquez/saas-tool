import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { colorVars, fontWeightVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { Button } from "@astryxdesign/core/Button";
import { Section } from "@astryxdesign/core/Section";
import { Grid } from "@astryxdesign/core/Grid";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import { HomeCampaignCards } from "@/components/product/HomeCampaignCards";

const styles = stylex.create({
  page: {
    marginInline: "auto",
  },
  heroSubtitle: {
    maxWidth: 520,
  },
  mark: {
    display: "inline-flex",
    color: colorVars["--color-accent"],
  },
  // Label pequeño en mayúsculas, color de acento — el mismo tratamiento
  // arriba de cada sección secundaria, para que "Inlay" en el hero quede
  // como la única cosa realmente grande de la página.
  eyebrow: {
    display: "block",
    color: colorVars["--color-accent"],
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: 12,
    fontWeight: fontWeightVars["--font-weight-semibold"],
  },
  referenceLabel: {
    color: colorVars["--color-accent"],
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: 13,
    fontWeight: fontWeightVars["--font-weight-semibold"],
  },
  referenceList: {
    columnGap: spacingVars["--spacing-6"],
  },
});

const referenceScreens = [
  { href: "/onboarding", label: "onboarding" },
  { href: "/primer-uso", label: "primer-uso" },
  { href: "/detalle", label: "detalle" },
  { href: "/agregar", label: "agregar" },
  { href: "/cobertura", label: "cobertura" },
  { href: "/indice", label: "indice" },
  { href: "/cobertura-vacio", label: "cobertura--vacio" },
  { href: "/indice-sin-resultados-busqueda", label: "indice--sin-resultados-busqueda" },
  { href: "/indice-sin-resultados-filtro", label: "indice--sin-resultados-filtro" },
  { href: "/indice-cargando", label: "indice--cargando" },
];

/** Rombo insertado en un cuadrado — juega con "inlay" (algo incrustado en
 * una superficie). Un solo color (currentColor), hereda el acento del
 * wrapper. */
function InlayMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <rect
        x="8.4"
        y="8.4"
        width="7.2"
        height="7.2"
        rx="1.2"
        fill="currentColor"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <Stack direction="vertical" gap={0} maxWidth={880} xstyle={styles.page}>
      <Section variant="transparent" paddingInline={0} paddingBlock={8} dividers={["bottom"]}>
        <Stack direction="vertical" gap={4}>
          <Stack direction="horizontal" gap={2} vAlign="center">
            <span {...stylex.props(styles.mark)}>
              <InlayMark />
            </span>
            <Heading level={1} type="display-1">
              Inlay
            </Heading>
          </Stack>
          <Text type="large" color="accent">
            Injected context for inherited tools.
          </Text>
          <Text type="body" color="secondary" xstyle={styles.heroSubtitle}>
            Capa de documentación contextual para RevOps — para que un equipo
            pueda ver el &quot;por qué&quot; detrás de cada campaña sin tener
            que preguntar.
          </Text>
          <Button href="/flujo-completo" label="Ver demo →" variant="primary" size="lg" />
        </Stack>
      </Section>

      <Section variant="transparent" paddingInline={0} paddingBlock={8} dividers={["bottom"]}>
        <Stack direction="vertical" gap={4}>
          <Stack direction="vertical" gap={1}>
            <Text as="div" xstyle={styles.eyebrow}>
              Ejemplos
            </Text>
            <Heading level={2}>Casos de ejemplo</Heading>
            <Text type="body" color="secondary">
              Las mismas campañas mock, cada una con su propio nivel de cobertura documentada.
            </Text>
          </Stack>
          <HomeCampaignCards />
        </Stack>
      </Section>

      <Section variant="transparent" paddingInline={0} paddingBlockStart={8} paddingBlockEnd={10}>
        <Collapsible
          defaultIsOpen={false}
          trigger={<Text xstyle={styles.referenceLabel}>Referencia técnica</Text>}
        >
          <Stack direction="vertical" paddingBlockStart={4}>
            <Grid columns={2} gap={1.5} xstyle={styles.referenceList}>
              {referenceScreens.map((s) => (
                <Link key={s.href} href={s.href}>
                  <Text type="code" color="accent">
                    {s.label}
                  </Text>
                </Link>
              ))}
            </Grid>
          </Stack>
        </Collapsible>
      </Section>
    </Stack>
  );
}
