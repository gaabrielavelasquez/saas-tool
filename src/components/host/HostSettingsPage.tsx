"use client";

import { Fragment, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colorVars, radiusVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text, Heading } from "@astryxdesign/core/Text";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { Divider } from "@astryxdesign/core/Divider";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-5"],
  },
  // El breadcrumb es texto real de navegación, no contenido "deshabilitado"
  // — usa el mismo token que ya está endurecido a AAA (~7.45:1), no el de
  // disabled (~2:1, reprueba hasta AA). Ver hallazgo de QA de contraste.
  breadcrumb: {
    color: colorVars["--color-text-secondary"],
  },
  headingGroup: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-1"],
  },
  card: {
    backgroundColor: colorVars["--color-background-surface"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colorVars["--color-border"],
    borderRadius: radiusVars["--radius-container"],
    overflow: "hidden",
  },
});

export type HostSettingsTab = "detalles" | "configuracion" | "actividad" | "cobertura";

/**
 * Mock del host anfitrión: breadcrumb + título + tabs + lista de campos
 * ("Host UI / Settings list" en Figma). Es UI del host, no del producto
 * — se repite igual en varias pantallas de onboarding/detalle.
 */
export function HostSettingsPage({
  breadcrumb,
  title,
  subtitle,
  summary,
  rows,
  defaultTab = "configuracion",
  tab: controlledTab,
  onTabChange,
}: {
  breadcrumb: string;
  title: string;
  subtitle: string;
  /** Bloque opcional arriba de las filas, ej. el resumen de Cobertura. */
  summary?: React.ReactNode;
  rows: React.ReactNode[];
  defaultTab?: HostSettingsTab;
  /**
   * Sin esto, el tab activo es puro estado visual interno (las pantallas
   * estáticas de Fase 2/3 siempre muestran las mismas `rows` sin importar
   * el tab). Pasándolo junto con `onTabChange`, el padre controla el tab
   * y puede cambiar `rows`/`summary` según cuál esté activo — lo que usa
   * /flujo-completo para que Configuración y Cobertura muestren contenido
   * real y distinto.
   */
  tab?: HostSettingsTab;
  onTabChange?: (tab: HostSettingsTab) => void;
}) {
  const [uncontrolledTab, setUncontrolledTab] = useState(defaultTab);
  const tab = controlledTab ?? uncontrolledTab;
  const setTab = onTabChange ?? setUncontrolledTab;

  return (
    <div {...stylex.props(styles.page)}>
      <Text type="supporting" as="div" xstyle={styles.breadcrumb}>
        {breadcrumb}
      </Text>

      <div {...stylex.props(styles.headingGroup)}>
        <Heading level={1}>{title}</Heading>
        <Text type="supporting" color="secondary">
          {subtitle}
        </Text>
      </div>

      <TabList value={tab} onChange={(v) => setTab(v as HostSettingsTab)} hasDivider>
        <Tab value="detalles" label="Detalles" />
        <Tab value="configuracion" label="Configuración" />
        <Tab value="actividad" label="Actividad" />
        <Tab id="tour-tab-cobertura" value="cobertura" label="Cobertura" />
      </TabList>

      <div {...stylex.props(styles.card)}>
        {summary}
        {summary && <Divider />}
        {rows.map((row, index) => (
          <Fragment key={index}>
            {row}
            {index < rows.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
