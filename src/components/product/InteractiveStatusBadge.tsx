"use client";

import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { radiusVars } from "@astryxdesign/core/theme/tokens.stylex";
import { HoverCard } from "@astryxdesign/core/HoverCard";
import { Popover } from "@astryxdesign/core/Popover";
import { StatusBadge, type FieldStatus } from "./StatusBadge";
import { FieldPreviewCard } from "./FieldPreviewCard";
import { FieldDetailCard } from "./FieldDetailCard";
import { AddCriterioForm } from "./AddCriterioForm";

const styles = stylex.create({
  trigger: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    borderRadius: radiusVars["--radius-full"],
  },
});

/**
 * El badge de estado de un campo, con el flujo P0 completo enganchado
 * según su estado real — todo en memoria, sin backend todavía:
 *
 * - documentado / sensible: hover muestra un preview liviano
 *   (FieldPreviewCard); click en el badge o en "Ver detalle →" del
 *   preview abre la card de detalle anclada (FieldDetailCard); desde
 *   ahí, "Editar" abre el mismo formulario que agregar, precargado.
 * - sin-documentar: no hay nada que previsualizar, así que el click
 *   abre directo el formulario de agregar (vacío).
 * - Guardar cierra la card y actualiza el estado del badge en memoria.
 *
 * El estado documentado (`status`/`criterio`/`isSensitive`/`cuando`) es
 * controlado por el padre — así la misma fuente de verdad la puede leer
 * también la tab Cobertura. Solo lo puramente visual de esta card (si
 * está abierta, si está en modo edición) queda local.
 */
export function InteractiveStatusBadge({
  fieldLabel,
  registradoPor,
  placeholderExample,
  status,
  criterio,
  isSensitive,
  cuando,
  onSave,
  id,
  autoOpen = false,
  onAutoOpened,
}: {
  fieldLabel: string;
  registradoPor: string;
  placeholderExample: string;
  status: FieldStatus;
  criterio: string;
  isSensitive: boolean;
  cuando: string;
  onSave: (criterio: string, isSensitive: boolean) => void;
  /** Id del `<button>` trigger — usado por el tour de onboarding para
   * apuntar el spotlight a un campo específico. */
  id?: string;
  /**
   * true cuando esta card debe abrirse apenas monta — el salto desde una
   * fila de Cobertura. Solo se lee en el mount inicial (a propósito: no
   * queremos reabrirla en updates posteriores mientras el usuario ya
   * está interactuando con ella).
   */
  autoOpen?: boolean;
  /** Avisa al padre que ya consumió el `autoOpen`, para que no se
   * dispare de nuevo si este campo vuelve a montar más adelante (ej. si
   * el usuario cambia de tab y vuelve por su cuenta, no por otro salto). */
  onAutoOpened?: () => void;
}) {
  const hasCriterio = status !== "sin-documentar";

  const [isDetailOpen, setIsDetailOpen] = useState(autoOpen);
  const [isEditing, setIsEditing] = useState(autoOpen && !hasCriterio);
  // HoverCard queda no-controlado (así conserva su propio delay de
  // mostrar/ocultar), pero eso significa que no hay forma de forzarlo
  // cerrado desde afuera cuando el Popover de detalle abre encima suyo
  // — quedaba "pegado" abierto (invisible) interceptando clicks de las
  // filas de abajo. Cambiar su `key` lo remonta de cero, sin ese estado
  // interno colgado.
  const [hoverResetKey, setHoverResetKey] = useState(0);

  useEffect(() => {
    if (autoOpen) onAutoOpened?.();
    // Solo en el mount: es un handshake de una sola vez con el padre,
    // no algo que deba repetirse si `autoOpen`/`onAutoOpened` cambian
    // mientras este campo sigue montado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openDetailOrEdit() {
    setIsEditing(!hasCriterio); // sin-documentar → directo al formulario
    setIsDetailOpen(true);
    // isEnabled=false no cierra un HoverCard que ya estaba abierto por
    // hover genuino (solo bloquea nuevas aperturas) — remonta para
    // asegurarse de que no quede pegado abajo del Popover de detalle.
    setHoverResetKey((k) => k + 1);
  }

  function closeDetail() {
    setIsDetailOpen(false);
    setIsEditing(false);
    setHoverResetKey((k) => k + 1);
  }

  function handleSave(value: string, sensitive: boolean) {
    // El padre decide qué implica guardar (incluido vaciar el texto para
    // volver a sin-documentar) — es la misma fuente de verdad que lee
    // Cobertura, así que la transición de estado vive ahí, no acá.
    onSave(value, sensitive);
    closeDetail(); // "al guardar, la card se cierra"
  }

  function handleCancelEdit() {
    // Si ya había criterio, "Cancelar" vuelve al detalle, no cierra todo.
    if (hasCriterio) setIsEditing(false);
    else closeDetail();
  }

  const trigger = (
    <button
      type="button"
      id={id}
      aria-label={
        hasCriterio
          ? `Ver detalle de ${fieldLabel}`
          : `Agregar el criterio de ${fieldLabel}`
      }
      {...stylex.props(styles.trigger)}
      onClick={openDetailOrEdit}
    >
      <StatusBadge status={status} />
    </button>
  );

  const popoverContent = isEditing ? (
    <AddCriterioForm
      fieldLabel={fieldLabel}
      status={status}
      placeholderExample={placeholderExample}
      initialValue={criterio}
      initialIsSensitive={isSensitive}
      saveLabel={hasCriterio ? "Guardar cambios" : "Guardar"}
      isEditingExisting={hasCriterio}
      onCancel={handleCancelEdit}
      onSave={handleSave}
    />
  ) : (
    <FieldDetailCard
      fieldLabel={fieldLabel}
      status={status}
      criterio={criterio}
      registradoPor={registradoPor}
      cuando={cuando}
      onClose={closeDetail}
      onEdit={() => setIsEditing(true)}
    />
  );

  const popover = (
    <Popover
      isOpen={isDetailOpen}
      onOpenChange={(open) => {
        if (open) setIsDetailOpen(true);
        else closeDetail();
      }}
      isModal={false}
      placement="below"
      alignment="end"
      label={
        isEditing
          ? `${hasCriterio ? "Editar" : "Agregar"} el criterio de ${fieldLabel}`
          : `Detalle del campo: ${fieldLabel}`
      }
      content={popoverContent}
    >
      {trigger}
    </Popover>
  );

  // Sin criterio documentado todavía: nada que previsualizar al hover.
  if (!hasCriterio) return popover;

  return (
    <HoverCard
      key={hoverResetKey}
      placement="below"
      alignment="end"
      isEnabled={!isDetailOpen}
      label={`Vista previa del criterio: ${fieldLabel}`}
      content={
        <FieldPreviewCard
          criterio={criterio}
          registradoPor={registradoPor}
          cuando={cuando}
          onVerDetalle={openDetailOrEdit}
        />
      }
    >
      {popover}
    </HoverCard>
  );
}
