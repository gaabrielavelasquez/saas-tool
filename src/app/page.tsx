import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { Button } from "@astryxdesign/core/Button";
import { Section } from "@astryxdesign/core/Section";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Grid } from "@astryxdesign/core/Grid";
import { Collapsible } from "@astryxdesign/core/Collapsible";

const styles = stylex.create({
  page: {
    marginInline: "auto",
  },
  heroSubtitle: {
    maxWidth: 520,
  },
});

const campaignCards = [
  {
    href: "/reactivacion-90-dias",
    name: "Reactivación 90 días",
    description: "Campos sensibles y sin documentar mezclados con los ya documentados.",
  },
  {
    href: "/black-friday-2026",
    name: "Black Friday 2026",
    description: "Otra campaña, otro nivel de cobertura — mismo Índice global.",
  },
  {
    href: "/lanzamiento-q1-2027",
    name: "Lanzamiento Q1 2027",
    description: "Campaña recién creada, sin ningún campo documentado — así se ve la Cobertura vacía.",
  },
];

const referenceScreens = [
  { href: "/onboarding", label: "Onboarding — Paso 1 (spotlight)" },
  { href: "/primer-uso", label: "Primer uso — Tooltip al pasar el mouse" },
  { href: "/detalle", label: "Vista de detalle — por qué documentado" },
  { href: "/agregar", label: "Agregar un \"por qué\" (menos de 3 pasos)" },
  { href: "/cobertura", label: "Cobertura" },
  { href: "/indice", label: "Índice de justificaciones (panel global)" },
  { href: "/cobertura-vacio", label: "Estado vacío — Cobertura" },
  {
    href: "/indice-sin-resultados-busqueda",
    label: "Estado vacío — Índice, sin resultados (búsqueda)",
  },
  {
    href: "/indice-sin-resultados-filtro",
    label: "Estado vacío — Índice, sin resultados (filtro)",
  },
  { href: "/indice-cargando", label: "Estado de carga — Índice (skeleton)" },
];

export default function Home() {
  return (
    <Stack direction="vertical" gap={0} maxWidth={880} xstyle={styles.page}>
      <Section variant="transparent" paddingInline={0} paddingBlock={8} dividers={["bottom"]}>
        <Stack direction="vertical" gap={4}>
          <Heading level={1}>SaaS Tool</Heading>
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
            <Heading level={2}>Casos de ejemplo</Heading>
            <Text type="body" color="secondary">
              Las mismas campañas mock, cada una con su propio nivel de cobertura documentada.
            </Text>
          </Stack>
          <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
            {campaignCards.map((c) => (
              <ClickableCard
                key={c.href}
                href={c.href}
                label={`Ver campaña ${c.name}`}
                elevation="low"
              >
                <Stack direction="vertical" gap={2}>
                  <Heading level={3}>{c.name}</Heading>
                  <Text type="body" color="secondary">
                    {c.description}
                  </Text>
                </Stack>
              </ClickableCard>
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section variant="transparent" paddingInline={0} paddingBlockStart={8} paddingBlockEnd={10}>
        <Collapsible defaultIsOpen={false} trigger={<Heading level={3}>Referencia técnica</Heading>}>
          <Stack direction="vertical" gap={2} paddingBlockStart={4}>
            {referenceScreens.map((s) => (
              <Link key={s.href} href={s.href}>
                <Text type="body" color="accent">
                  {s.label}
                </Text>
              </Link>
            ))}
          </Stack>
        </Collapsible>
      </Section>
    </Stack>
  );
}
