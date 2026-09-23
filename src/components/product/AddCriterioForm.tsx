"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Divider } from "@astryxdesign/core/Divider";
import { IconButton } from "@astryxdesign/core/IconButton";
import { TextArea } from "@astryxdesign/core/TextArea";
import { Switch } from "@astryxdesign/core/Switch";
import { StatusBadge, type FieldStatus } from "./StatusBadge";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-4"],
    width: 380,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacingVars["--spacing-3"],
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-1-5"],
  },
  prompt: {
    color: colorVars["--color-text-secondary"],
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // "Cancelar" es un botón real y clickeable, no un control deshabilitado.
  cancel: {
    color: colorVars["--color-text-secondary"],
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
  },
});

/**
 * Formulario de "Agregar un por qué" — CLAUDE.md P0 #3: 1 solo campo de
 * texto libre, placeholder instructivo con ejemplo real, flujo <3 pasos,
 * sin aprobación. También sirve para editar (con `initialValue`).
 * Figma: "Agregar un 'por qué' (menos de 3 pasos)", node 54:2.
 */
export function AddCriterioForm({
  fieldLabel,
  status,
  placeholderExample,
  initialValue = "",
  initialIsSensitive = false,
  saveLabel = "Guardar",
  isEditingExisting = false,
  onCancel,
  onSave,
}: {
  fieldLabel: string;
  status: FieldStatus;
  placeholderExample: string;
  initialValue?: string;
  initialIsSensitive?: boolean;
  saveLabel?: string;
  /**
   * true cuando el campo ya tenía un criterio documentado (viene de
   * "Editar", no de "Agregar"). En ese caso vaciar el textarea es una
   * acción válida — vuelve el campo a "sin documentar" — así que Guardar
   * no se deshabilita por estar vacío, solo en el flujo de Agregar.
   */
  isEditingExisting?: boolean;
  onCancel?: () => void;
  onSave?: (criterio: string, isSensitive: boolean) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [isSensitive, setIsSensitive] = useState(initialIsSensitive);

  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerLeft)}>
          <Text type="body" weight="semibold">
            {fieldLabel}
          </Text>
          <StatusBadge status={status} />
        </div>
        <IconButton
          label="Cerrar"
          tooltip="Cerrar"
          icon={<span aria-hidden>×</span>}
          variant="ghost"
          size="sm"
          onClick={onCancel}
        />
      </div>

      <Divider />

      <Text type="body" weight="medium" as="div" xstyle={styles.prompt}>
        ¿Cuál es el criterio o contexto detrás de este valor?
      </Text>

      <TextArea
        label="Criterio o contexto"
        isLabelHidden
        value={value}
        onChange={setValue}
        placeholder={placeholderExample}
        rows={3}
        hasAutoFocus
      />

      <Switch
        label="Marcar como sensible / no tocar sin preguntar"
        size="sm"
        value={isSensitive}
        onChange={setIsSensitive}
      />

      <div {...stylex.props(styles.footer)}>
        <button type="button" onClick={onCancel} {...stylex.props(styles.cancel)}>
          Cancelar
        </button>
        <Button
          label={saveLabel}
          variant="primary"
          isDisabled={!isEditingExisting && value.trim().length === 0}
          onClick={() => onSave?.(value, isSensitive)}
        />
      </div>
    </div>
  );
}
