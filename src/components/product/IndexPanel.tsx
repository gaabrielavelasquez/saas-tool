"use client";

import { useMemo, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  colorVars,
  spacingVars,
  shadowVars,
  radiusVars,
} from "@astryxdesign/core/theme/tokens.stylex";
import { Text, Heading } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Divider } from "@astryxdesign/core/Divider";
import { Button } from "@astryxdesign/core/Button";
import { Skeleton } from "@astryxdesign/core/Skeleton";
import { StatusBadge, type FieldStatus } from "./StatusBadge";

export type IndexEntry = {
  fieldId: string;
  fieldLabel: string;
  campaignId: string;
  campaignLabel: string;
  status: FieldStatus;
};

const STATUS_ORDER: FieldStatus[] = ["documentado", "sensible", "sin-documentar"];
const CHIP_LABEL: Record<FieldStatus, string> = {
  documentado: "Documentado",
  sensible: "Sensible",
  "sin-documentar": "Sin doc.",
};
const FILTER_EMPTY_COPY: Record<FieldStatus, { title: string; description: string }> = {
  documentado: {
    title: "Ningún campo documentado por ahora",
    description: "Cuando se agregue el primer criterio, va a aparecer acá.",
  },
  sensible: {
    title: "Ningún campo sensible por ahora",
    description: "Cuando alguien marque un campo como sensible, va a aparecer acá.",
  },
  "sin-documentar": {
    title: "No hay campos sin documentar",
    description: "Todos los campos visibles ya tienen su criterio documentado.",
  },
};

const styles = stylex.create({
  panel: {
    position: "fixed",
    top: 56, // debajo del top bar del host
    right: 0,
    bottom: 0,
    width: 400,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorVars["--color-background-surface"],
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: colorVars["--color-border"],
    // Aislamiento visual sin dimmer (CLAUDE.md): elevación alta + acento
    // de marca de 3px, en vez de oscurecer el fondo del host.
    boxShadow: shadowVars["--shadow-high"],
    zIndex: 50,
    // Microinteracción de apertura/cierre: desliza + funde en vez de
    // aparecer/desaparecer de golpe. El padre (LauncherAndIndexPanel)
    // mantiene el panel montado unos ms extra al cerrar para que esta
    // transición de salida llegue a verse, no solo la de entrada.
    transitionProperty: "transform, opacity",
    transitionDuration: {
      default: "180ms",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    transitionTimingFunction: "ease-in-out",
    transform: {
      default: "translateX(0)",
      ":is([data-open=false])": "translateX(24px)",
    },
    opacity: {
      default: 1,
      ":is([data-open=false])": 0,
    },
  },
  accentEdge: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colorVars["--color-accent"],
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: spacingVars["--spacing-6"],
    paddingBlockStart: spacingVars["--spacing-6"],
    paddingBlockEnd: spacingVars["--spacing-4"],
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-3"],
    paddingInline: spacingVars["--spacing-6"],
  },
  // "Buscando en todas las campañas" — indicación de alcance real
  // (CLAUDE.md), no contenido deshabilitado; mismo criterio que el
  // breadcrumb de HostSettingsPage.
  scope: {
    color: colorVars["--color-text-secondary"],
  },
  chips: {
    display: "flex",
    gap: spacingVars["--spacing-1-5"],
  },
  chip: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    paddingBlock: 3.5,
    paddingInline: spacingVars["--spacing-2"],
    borderRadius: radiusVars["--radius-full"],
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "transparent",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 500,
    fontFamily: "inherit",
    opacity: { default: 0.45, ":is([data-active=true])": 1 },
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: radiusVars["--radius-full"],
  },
  documentadoBg: { backgroundColor: colorVars["--color-background-green"] },
  documentadoDot: { backgroundColor: colorVars["--color-icon-green"] },
  documentadoText: { color: colorVars["--color-text-green"] },
  documentadoBorder: { borderColor: colorVars["--color-icon-green"] },
  sensibleBg: { backgroundColor: colorVars["--color-background-orange"] },
  sensibleDot: { backgroundColor: colorVars["--color-icon-orange"] },
  sensibleText: { color: colorVars["--color-text-orange"] },
  sensibleBorder: { borderColor: colorVars["--color-icon-orange"] },
  sinDocumentarBg: { backgroundColor: colorVars["--color-background-muted"] },
  sinDocumentarDot: { backgroundColor: colorVars["--color-icon-disabled"] },
  // El label del chip ("Sin doc. N") y el borde de estado activo son
  // texto/indicador real que hay que poder leer — no van con el token de
  // disabled (~2:1, reprueba AA). Mismo criterio en StatusBadge.
  sinDocumentarText: { color: colorVars["--color-text-secondary"] },
  sinDocumentarBorder: { borderColor: colorVars["--color-text-secondary"] },
  list: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    flex: 1,
    marginTop: spacingVars["--spacing-2"],
    // El launcher flotante (48px + 24px de margen, zIndex más alto) vive
    // fuera de este panel pero se superpone visualmente a su esquina
    // inferior derecha. Sin este padding, con suficientes resultados para
    // llegar al fondo, las últimas filas quedaban tapadas Y su click
    // interceptado por el launcher.
    paddingBottom: 88,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacingVars["--spacing-3"],
    paddingBlock: spacingVars["--spacing-3"],
    paddingInline: spacingVars["--spacing-6"],
  },
  rowButton: {
    display: "block",
    width: "100%",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "inherit",
    backgroundColor: {
      default: colorVars["--color-background-surface"],
      ":hover": {
        "@media (hover: hover)":
          `color-mix(in srgb, ${colorVars["--color-background-surface"]}, ${colorVars["--color-tint-hover"]} 5%)`,
      },
    },
  },
  rowLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  skeletonRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacingVars["--spacing-3"],
    paddingBlock: spacingVars["--spacing-4"],
    paddingInline: spacingVars["--spacing-6"],
  },
  skeletonLeft: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-2"],
  },
  emptyWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingVars["--spacing-2"],
    paddingInline: spacingVars["--spacing-6"],
    paddingBlock: 40,
    textAlign: "center",
  },
  emptyIcon: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colorVars["--color-background-muted"],
    marginBottom: spacingVars["--spacing-1"],
  },
  emptyBar: {
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: colorVars["--color-text-disabled"],
  },
  emptyDescription: {
    color: colorVars["--color-text-secondary"],
  },
});

const CHIP_STYLES: Record<
  FieldStatus,
  {
    bg: stylex.StyleXStyles;
    dot: stylex.StyleXStyles;
    text: stylex.StyleXStyles;
    border: stylex.StyleXStyles;
  }
> = {
  documentado: {
    bg: styles.documentadoBg,
    dot: styles.documentadoDot,
    text: styles.documentadoText,
    border: styles.documentadoBorder,
  },
  sensible: {
    bg: styles.sensibleBg,
    dot: styles.sensibleDot,
    text: styles.sensibleText,
    border: styles.sensibleBorder,
  },
  "sin-documentar": {
    bg: styles.sinDocumentarBg,
    dot: styles.sinDocumentarDot,
    text: styles.sinDocumentarText,
    border: styles.sinDocumentarBorder,
  },
};

function EmptyIcon() {
  return (
    <div {...stylex.props(styles.emptyIcon)}>
      <span {...stylex.props(styles.emptyBar)} style={{ width: 18 }} />
      <span {...stylex.props(styles.emptyBar)} style={{ width: 13 }} />
      <span {...stylex.props(styles.emptyBar)} style={{ width: 8 }} />
    </div>
  );
}

/**
 * Índice de justificaciones — panel global, CLAUDE.md P1: búsqueda de
 * todos los "por qués", 400px anclado a la derecha, sin dimmer. Figma:
 * "Índice de justificaciones (panel global)", node 67:116. También cubre
 * los estados "Cargando (skeleton)" (76:865), "Sin resultados (búsqueda)"
 * (76:492) y "Sin resultados (filtro)" (76:679).
 */
export function IndexPanel({
  entries,
  onClose,
  onSelect,
  isOpen = true,
  isLoading = false,
  initialQuery = "",
  initialStatuses = [],
}: {
  entries: IndexEntry[];
  onClose: () => void;
  /** Si se pasa, cada resultado se vuelve clickeable y navega a ese campo. */
  onSelect?: (entry: IndexEntry) => void;
  /** Controla la transición de entrada/salida (desliza + funde). Por
   * defecto `true` — las pantallas estáticas de referencia que montan y
   * desmontan el panel entero sin pasar esto siguen viéndolo "abierto"
   * de entrada, sin cambios de comportamiento para ellas. */
  isOpen?: boolean;
  isLoading?: boolean;
  initialQuery?: string;
  initialStatuses?: FieldStatus[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeStatuses, setActiveStatuses] = useState<Set<FieldStatus>>(
    new Set(initialStatuses),
  );

  const counts = useMemo(() => {
    const c: Record<FieldStatus, number> = {
      documentado: 0,
      sensible: 0,
      "sin-documentar": 0,
    };
    entries.forEach((e) => c[e.status]++);
    return c;
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesQuery =
        q.length === 0 ||
        e.fieldLabel.toLowerCase().includes(q) ||
        e.campaignLabel.toLowerCase().includes(q);
      const matchesStatus =
        activeStatuses.size === 0 || activeStatuses.has(e.status);
      return matchesQuery && matchesStatus;
    });
  }, [entries, query, activeStatuses]);

  function toggleStatus(status: FieldStatus) {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }

  const hasQuery = query.trim().length > 0;
  const hasFilter = activeStatuses.size > 0;
  const singleActiveStatus =
    activeStatuses.size === 1 ? [...activeStatuses][0] : null;

  return (
    <div data-open={isOpen} {...stylex.props(styles.panel)}>
      <div {...stylex.props(styles.accentEdge)} />

      <div {...stylex.props(styles.header)}>
        <Heading level={2}>Índice de justificaciones</Heading>
        <IconButton
          label="Cerrar"
          icon={<span aria-hidden>×</span>}
          variant="ghost"
          size="sm"
          onClick={onClose}
        />
      </div>

      <div {...stylex.props(styles.body)}>
        <TextInput
          label="Buscar por campo o campaña"
          isLabelHidden
          value={query}
          onChange={setQuery}
          placeholder="Buscar por campo o campaña…"
          startIcon="search"
          hasClear
          isDisabled={isLoading}
        />

        <Text type="supporting" as="div" xstyle={styles.scope}>
          Buscando en todas las campañas
        </Text>

        <div {...stylex.props(styles.chips)}>
          {STATUS_ORDER.map((status) => {
            const variant = CHIP_STYLES[status];
            const isActive = activeStatuses.has(status);
            return (
              <button
                key={status}
                type="button"
                data-active={isActive}
                aria-pressed={isActive}
                disabled={isLoading}
                onClick={() => toggleStatus(status)}
                {...stylex.props(
                  styles.chip,
                  variant.bg,
                  isActive && variant.border,
                )}
              >
                <span {...stylex.props(styles.chipDot, variant.dot)} />
                <span {...stylex.props(variant.text)}>
                  {CHIP_LABEL[status]} {counts[status]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Divider />

      <div {...stylex.props(styles.list)}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div {...stylex.props(styles.skeletonRow)}>
                <div {...stylex.props(styles.skeletonLeft)}>
                  <Skeleton width={i % 2 === 0 ? 180 : 160} height={12} index={i * 3} />
                  <Skeleton width={100} height={10} index={i * 3 + 1} />
                </div>
                <Skeleton width={90} height={22} radius="rounded" index={i * 3 + 2} />
              </div>
              {i < 3 && <Divider />}
            </div>
          ))
        ) : filtered.length === 0 ? (
          hasQuery ? (
            <div {...stylex.props(styles.emptyWrapper)}>
              <EmptyIcon />
              <Text type="body" weight="semibold" as="div">
                No encontramos nada para &apos;{query}&apos;
              </Text>
              <Text type="supporting" as="div" xstyle={styles.emptyDescription}>
                Revisa que esté bien escrito, o prueba buscando por el nombre
                de la campaña en vez del campo.
              </Text>
              <Button
                label="Limpiar búsqueda"
                variant="secondary"
                size="sm"
                onClick={() => setQuery("")}
              />
            </div>
          ) : hasFilter ? (
            <div {...stylex.props(styles.emptyWrapper)}>
              <EmptyIcon />
              <Text type="body" weight="semibold" as="div">
                {singleActiveStatus
                  ? FILTER_EMPTY_COPY[singleActiveStatus].title
                  : "No hay campos con esos filtros"}
              </Text>
              <Text type="supporting" as="div" xstyle={styles.emptyDescription}>
                {singleActiveStatus
                  ? FILTER_EMPTY_COPY[singleActiveStatus].description
                  : "Probá sacando alguno de los filtros activos."}
              </Text>
              <Button
                label="Ver todos"
                variant="secondary"
                size="sm"
                onClick={() => setActiveStatuses(new Set())}
              />
            </div>
          ) : null
        ) : (
          filtered.map((entry, index) => {
            const rowContent = (
              <div {...stylex.props(styles.row)}>
                <div {...stylex.props(styles.rowLeft)}>
                  <Text type="body" weight="medium" maxLines={1}>
                    {entry.fieldLabel}
                  </Text>
                  <Text type="supporting" color="secondary" maxLines={1}>
                    {entry.campaignLabel}
                  </Text>
                </div>
                <StatusBadge status={entry.status} />
              </div>
            );
            return (
              <div key={`${entry.campaignId}-${entry.fieldId}`}>
                {onSelect ? (
                  <button
                    type="button"
                    onClick={() => onSelect(entry)}
                    {...stylex.props(styles.rowButton)}
                  >
                    {rowContent}
                  </button>
                ) : (
                  rowContent
                )}
                {index < filtered.length - 1 && <Divider />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
