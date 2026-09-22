"use client";

import { useEffect, useRef, useState } from "react";
import { Launcher } from "./Launcher";
import { IndexPanel, type IndexEntry } from "./IndexPanel";

// Coincide con la duración de transición del panel (IndexPanel.tsx) —
// cuánto se mantiene montado después de cerrar para que la animación de
// salida llegue a correr antes de sacarlo del DOM.
const PANEL_TRANSITION_MS = 180;

/**
 * Cablea el Launcher + panel de Índice juntos: el launcher abre/cierra
 * (CLAUDE.md P1), agrega click afuera/Esc para cerrar, y la microinteracción
 * de apertura/cierre del panel (desliza + funde, ~180ms) — sin tocar
 * Launcher/IndexPanel por separado (que quedan reutilizables solos, como
 * en las pantallas estáticas de referencia). El click "afuera" se detecta
 * contra este wrapper, que envuelve a los dos: así el propio botón del
 * launcher queda naturalmente excluido, sin necesitar un ref/id aparte.
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
  // `isOpen` es el estado lógico (dispara Launcher→X, transición del
  // panel, y arma/desarma click-afuera+Esc). `isMounted` es si el panel
  // sigue en el DOM — queda `true` un rato más que `isOpen` al cerrar,
  // para que la transición de salida tenga tiempo de correr antes de
  // desmontar.
  const [isOpen, setIsOpenState] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // No hay fetch real acá (todo vive en memoria vía campaignsStore), así
  // que abrir el panel nunca tuvo un momento de "cargando" que mostrar —
  // por eso el skeleton (Figma 76:865) nunca se disparaba en el flujo
  // real, solo en la demo estática con su timer artificial. Reproducimos
  // el mismo timer acá para que también se vea en el flujo real.
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function setIsOpen(next: boolean) {
    onOpenChange?.(next);
    if (next) {
      setIsMounted(true);
      setIsLoading(true);
      // `isOpen` se pone en true recién en el próximo frame (más abajo),
      // no acá — así el panel monta primero en su estado "cerrado" (CSS)
      // y la transición de entrada tiene algo desde dónde animar, en vez
      // de aparecer ya abierto.
    } else {
      setIsOpenState(false);
    }
  }

  // Dispara la transición de entrada un frame después de montar.
  useEffect(() => {
    if (!isMounted) return;
    const raf = requestAnimationFrame(() => setIsOpenState(true));
    return () => cancelAnimationFrame(raf);
  }, [isMounted]);

  // Desmonta recién cuando termina la transición de salida.
  useEffect(() => {
    if (isOpen || !isMounted) return;
    const timer = setTimeout(() => setIsMounted(false), PANEL_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [isOpen, isMounted]);

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
      {isMounted && (
        <IndexPanel
          entries={entries}
          isOpen={isOpen}
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
