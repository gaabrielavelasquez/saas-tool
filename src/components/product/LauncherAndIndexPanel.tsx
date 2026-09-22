"use client";

import { useEffect, useRef, useState } from "react";
import { Launcher } from "./Launcher";
import { IndexPanel, type IndexEntry } from "./IndexPanel";

/**
 * Cablea el Launcher + panel de Índice juntos: el launcher abre/cierra
 * (CLAUDE.md P1), y agrega el resto de las formas de cerrar que pide el
 * flujo — click afuera y Esc — sin tocar Launcher/IndexPanel (que quedan
 * reutilizables solos, como en las pantallas estáticas de referencia).
 * El click "afuera" se detecta contra este wrapper, que envuelve a los
 * dos: así el propio botón del launcher queda naturalmente excluido, sin
 * necesitar un ref/id aparte para reconocerlo.
 */
export function LauncherAndIndexPanel({
  entries,
  onSelectEntry,
  onOpenChange,
}: {
  entries: IndexEntry[];
  onSelectEntry: (entry: IndexEntry) => void;
  /** Para que quien lo use pueda evitar superponer otra cosa flotante
   * (ej. el botón de reabrir el tour) mientras el panel está abierto. */
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpenState] = useState(false);
  // No hay fetch real acá (todo vive en memoria vía campaignsStore), así
  // que abrir el panel nunca tuvo un momento de "cargando" que mostrar —
  // por eso el skeleton (Figma 76:865) nunca se disparaba en el flujo
  // real, solo en la demo estática con su timer artificial. Reproducimos
  // el mismo timer acá para que también se vea en el flujo real.
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function setIsOpen(next: boolean) {
    setIsOpenState(next);
    onOpenChange?.(next);
    if (next) setIsLoading(true);
  }

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Al cerrar con el botón × o con Esc, el elemento que tenía el foco
  // desaparece del DOM — sin esto el foco caía en <body>, perdiendo la
  // posición del usuario. El click afuera queda aparte: ahí el foco ya
  // va naturalmente a lo que se clickeó, no hay que forzarlo.
  function closeAndRestoreFocus() {
    setIsOpen(false);
    document.getElementById("product-launcher")?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeAndRestoreFocus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      <Launcher isActive={isOpen} onToggle={setIsOpen} />
      {isOpen && (
        <IndexPanel
          entries={entries}
          isLoading={isLoading}
          onClose={closeAndRestoreFocus}
          onSelect={(entry) => {
            setIsOpen(false);
            onSelectEntry(entry);
          }}
        />
      )}
    </div>
  );
}
