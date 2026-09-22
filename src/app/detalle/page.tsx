"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Popover } from "@astryxdesign/core/Popover";
import { radiusVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge } from "@/components/product/StatusBadge";
import { Launcher } from "@/components/product/Launcher";
import { FieldDetailCard } from "@/components/product/FieldDetailCard";
import { AddCriterioForm } from "@/components/product/AddCriterioForm";

const styles = stylex.create({
  trigger: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    borderRadius: radiusVars["--radius-full"],
  },
});

const FIELD_LABEL = "Frecuencia de envío de emails";
const REGISTRADO_POR = "Ana Torres";
const CUANDO = "hace 12 días";

export default function DetallePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [criterio, setCriterio] = useState(
    "El equipo probaba distintas frecuencias de envío para esta lista de bienvenida. Se llegó a 3 envíos por semana: a diario bajaba el open rate 12%, y menos de 3 perdía momentum con los leads nuevos.",
  );

  return (
    <AppShell topNav={<TopBar />} sideNav={<Sidebar />} contentPadding={6}>
      <HostSettingsPage
        breadcrumb="Campañas  ›  Envío de bienvenida  ›  Configuración"
        title="Envío de bienvenida"
        subtitle="Campaña de email · Activa"
        rows={[
          <FieldRow
            key="descuento"
            label="Límite de descuento por campaña"
            value="15%"
            badge={<StatusBadge status="sin-documentar" />}
          />,
          <FieldRow
            key="frecuencia"
            label={FIELD_LABEL}
            value="3 por semana"
            badge={
              <Popover
                isOpen={isOpen}
                onOpenChange={(open) => {
                  setIsOpen(open);
                  if (!open) setIsEditing(false);
                }}
                isModal={false}
                placement="below"
                alignment="end"
                label={`Detalle del campo: ${FIELD_LABEL}`}
                content={
                  isEditing ? (
                    <AddCriterioForm
                      fieldLabel={FIELD_LABEL}
                      status="documentado"
                      placeholderExample="Se probó enviar a diario y bajaba el open rate un 12%. 3 envíos por semana es el punto óptimo para esta lista."
                      initialValue={criterio}
                      saveLabel="Guardar cambios"
                      onCancel={() => setIsEditing(false)}
                      onSave={(value) => {
                        setCriterio(value);
                        setIsEditing(false);
                      }}
                    />
                  ) : (
                    <FieldDetailCard
                      fieldLabel={FIELD_LABEL}
                      status="documentado"
                      criterio={criterio}
                      registradoPor={REGISTRADO_POR}
                      cuando={CUANDO}
                      onClose={() => setIsOpen(false)}
                      onEdit={() => setIsEditing(true)}
                    />
                  )
                }
              >
                <button
                  type="button"
                  aria-label={`Ver detalle de ${FIELD_LABEL}`}
                  {...stylex.props(styles.trigger)}
                >
                  <StatusBadge status="documentado" />
                </button>
              </Popover>
            }
          />,
          <FieldRow
            key="segmento"
            label="Segmento por defecto"
            value="Clientes activos"
            badge={<StatusBadge status="documentado" />}
          />,
          <FieldRow
            key="lead"
            label="Campo de puntuación de lead"
            value="Score mayor a 80"
            badge={<StatusBadge status="sensible" />}
          />,
        ]}
      />

      <Launcher />
    </AppShell>
  );
}
