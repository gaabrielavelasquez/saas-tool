"use client";

import * as stylex from "@stylexjs/stylex";
import { colorVars, radiusVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Grid } from "@astryxdesign/core/Grid";
import { useCampaigns } from "@/lib/campaignsStore";

const CARD_COPY: Record<string, string> = {
  "reactivacion-90-dias":
    "Campos sensibles y sin documentar mezclados con los ya documentados.",
  "black-friday-2026": "Otra campaña, otro nivel de cobertura — mismo Índice global.",
  "lanzamiento-q1-2027": "Campaña recién creada, sin ningún campo documentado todavía.",
};

// Reusa exactamente los 3 tokens de estado que ya existen en el producto
// (StatusBadge: documentado/sensible/sin-documentar) — a nivel de campaña
// en vez de a nivel de campo, mismo vocabulario de color en todos lados.
const styles = stylex.create({
  cardCompleto: { borderInlineStartWidth: 3, borderInlineStartStyle: "solid", borderInlineStartColor: colorVars["--color-icon-green"] },
  cardParcial: { borderInlineStartWidth: 3, borderInlineStartStyle: "solid", borderInlineStartColor: colorVars["--color-icon-orange"] },
  cardVacio: { borderInlineStartWidth: 3, borderInlineStartStyle: "solid", borderInlineStartColor: colorVars["--color-icon-disabled"] },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radiusVars["--radius-full"],
    flexShrink: 0,
  },
  dotCompleto: { backgroundColor: colorVars["--color-icon-green"] },
  dotParcial: { backgroundColor: colorVars["--color-icon-orange"] },
  dotVacio: { backgroundColor: colorVars["--color-icon-disabled"] },
});

function coverageLevel(withContext: number, total: number) {
  if (total === 0) return "vacio" as const;
  if (withContext === total) return "completo" as const;
  return "parcial" as const;
}

const LEVEL_STYLES = {
  completo: { card: styles.cardCompleto, dot: styles.dotCompleto, label: "Cobertura completa" },
  parcial: { card: styles.cardParcial, dot: styles.dotParcial, label: "Cobertura parcial" },
  vacio: { card: styles.cardVacio, dot: styles.dotVacio, label: "Sin documentar" },
};

/**
 * Las 3 campañas mock como "casos de ejemplo", con color-coding real: el
 * acento de cada card (borde izquierdo + dot) sale del nivel de cobertura
 * real de esa campaña en `campaignsStore` — no de un texto fijo. Por eso
 * es un Client Component aparte: necesita `useCampaigns()`, que el resto
 * de la home (server component) no puede leer directamente.
 */
export function HomeCampaignCards() {
  const { campaigns } = useCampaigns();
  const cards = campaigns.filter((c) => c.id !== "envio-de-bienvenida");

  return (
    <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
      {cards.map((campaign) => {
        const total = campaign.fields.length;
        const withContext = campaign.fields.filter(
          (f) => f.status === "documentado" || f.status === "sensible",
        ).length;
        const percent = total > 0 ? Math.round((withContext / total) * 100) : 0;
        const level = coverageLevel(withContext, total);
        const { card, dot, label } = LEVEL_STYLES[level];

        return (
          <ClickableCard
            key={campaign.id}
            href={campaign.path}
            label={`Ver campaña ${campaign.name}`}
            elevation="low"
            xstyle={card}
          >
            <Stack direction="vertical" gap={2}>
              <Stack direction="horizontal" gap={1.5} vAlign="center">
                <span {...stylex.props(styles.dot, dot)} />
                <Text type="supporting" color="secondary">
                  {level === "vacio" ? label : `${label} · ${percent}%`}
                </Text>
              </Stack>
              <Heading level={3}>{campaign.name}</Heading>
              <Text type="body" color="secondary">
                {CARD_COPY[campaign.id]}
              </Text>
            </Stack>
          </ClickableCard>
        );
      })}
    </Grid>
  );
}
