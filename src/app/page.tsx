import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { colorVars, fontWeightVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { Button } from "@astryxdesign/core/Button";
import { Section } from "@astryxdesign/core/Section";
import { Grid } from "@astryxdesign/core/Grid";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { HomeCampaignCards } from "@/components/product/HomeCampaignCards";
import { LandingNav } from "@/components/product/LandingNav";
import { HeroMockup } from "@/components/product/HeroMockup";
import { LandingFeatures } from "@/components/product/LandingFeatures";
import { LandingFaq } from "@/components/product/LandingFaq";

// StyleX compila `stylex.create()` de forma estática — no puede leer una
// constante importada de otro módulo acá adentro, así que el alto de
// LandingNav (LANDING_NAV_HEIGHT en LandingNav.tsx) se repite como
// literal. Si cambia uno, cambia el otro.
const NAV_HEIGHT = 64;

const styles = stylex.create({
  page: {
    marginInline: "auto",
    paddingBlockStart: NAV_HEIGHT,
  },
  heroSubtitle: {
    maxWidth: 520,
    marginInline: "auto",
  },
  // Label pequeño en mayúsculas, color de acento — el mismo tratamiento
  // arriba de cada sección secundaria.
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
  // Offset para que el ancla de "Ver casos de ejemplo" no quede tapada
  // por la nav fija al hacer scroll hasta acá.
  scrollAnchor: {
    scrollMarginTop: NAV_HEIGHT + 16,
  },
  narrowColumn: {
    maxWidth: 640,
    marginInline: "auto",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingVars["--spacing-2"],
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

export default function Home() {
  return (
    <>
      <LandingNav />
      <Stack direction="vertical" gap={0} maxWidth={880} xstyle={styles.page}>
        <Section variant="transparent" paddingInline={0} paddingBlock={10}>
          <Stack direction="vertical" gap={8}>
            <Stack direction="vertical" gap={4} hAlign="center">
              <Stack direction="vertical" gap={3} hAlign="center">
                <Heading level={1} type="display-1" justify="center" textWrap="balance">
                  El &quot;por qué&quot; de cada configuración, sin tener que preguntar.
                </Heading>
                <Text type="large" color="accent" justify="center">
                  Contexto insertado en herramientas heredadas.
                </Text>
                <Text type="body" color="secondary" justify="center" xstyle={styles.heroSubtitle}>
                  Capa de documentación contextual para RevOps — para que un equipo
                  pueda ver el &quot;por qué&quot; detrás de cada campaña sin tener
                  que preguntar.
                </Text>
              </Stack>
              <Stack direction="horizontal" gap={3}>
                <Button href="/flujo-completo" label="Ver demo →" variant="primary" size="lg" />
                <Button
                  href="#casos-de-ejemplo"
                  label="Ver casos de ejemplo"
                  variant="secondary"
                  size="lg"
                />
              </Stack>
            </Stack>
            <HeroMockup />
          </Stack>
        </Section>

        <Section variant="transparent" paddingInline={0} paddingBlock={10} dividers={["top"]}>
          <LandingFeatures />
        </Section>

        <Section variant="transparent" paddingInline={0} paddingBlock={10} dividers={["top"]}>
          <Stack direction="vertical" gap={3} xstyle={styles.narrowColumn}>
            <Text as="div" xstyle={styles.eyebrow}>
              Por qué lo construí
            </Text>
            <Text type="body" color="secondary">
              Empecé este proyecto después de ver cuánto tiempo se pierde en RevOps
              repreguntando lo mismo: &quot;¿por qué está configurado así?&quot;. La
              respuesta casi nunca está donde debería, vive en un Slack viejo, en la
              cabeza de alguien que ya no está, o en ningún lado. Inlay nace de esa
              frustración, una capa de contexto que vive directo en la herramienta
              que ya usas, para que el &quot;por qué&quot; no se pierda apenas
              alguien se va o se olvida.
            </Text>
          </Stack>
        </Section>

        <Section
          id="casos-de-ejemplo"
          variant="transparent"
          paddingInline={0}
          paddingBlock={10}
          dividers={["top"]}
          xstyle={styles.scrollAnchor}
        >
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

        <Section variant="transparent" paddingInline={0} paddingBlock={10} dividers={["top"]}>
          <Stack direction="vertical" gap={3} xstyle={styles.narrowColumn}>
            <Text as="div" xstyle={styles.eyebrow}>
              Sobre este proyecto
            </Text>
            <Text type="body" color="secondary">
              Este es un caso de estudio de producto, no una herramienta con
              usuarios reales. Los datos, las campañas y los criterios
              documentados son de ejemplo — pensados para mostrar cómo se
              resuelve un problema real de RevOps de punta a punta, del research
              a la decisión de diseño y su implementación en código.
            </Text>
          </Stack>
        </Section>

        <Section variant="transparent" paddingInline={0} paddingBlock={10} dividers={["top"]}>
          <Stack xstyle={styles.narrowColumn}>
            <LandingFaq />
          </Stack>
        </Section>

        <Section variant="transparent" paddingInline={0} paddingBlockStart={10} paddingBlockEnd={10} dividers={["top"]}>
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

        <Section
          variant="transparent"
          paddingInline={0}
          paddingBlockStart={6}
          paddingBlockEnd={10}
          dividers={["top"]}
        >
          <Stack direction="horizontal" xstyle={styles.footer}>
            <Text type="supporting" color="secondary">
              Diseñado y construido por Gabriela Velásquez
            </Text>
            <Text type="supporting" color="secondary">
              ·
            </Text>
            <AstryxLink href="#" isStandalone>
              LinkedIn
            </AstryxLink>
          </Stack>
        </Section>
      </Stack>
    </>
  );
}
