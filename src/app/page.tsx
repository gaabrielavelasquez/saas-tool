import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Layout";

const styles = stylex.create({
  page: { padding: 32 },
});

const screens = [
  {
    href: "/flujo-completo",
    label:
      "★ Flujo P0+P1 completo — hover, detalle, editar, guardar, Cobertura, Índice (interactivo)",
  },
  {
    href: "/reactivacion-90-dias",
    label: "★ Campaña mock — Reactivación 90 días",
  },
  {
    href: "/black-friday-2026",
    label: "★ Campaña mock — Black Friday 2026",
  },
  {
    href: "/lanzamiento-q1-2027",
    label: "★ Campaña mock — Lanzamiento Q1 2027 (vacía, sin campos — Cobertura vacío real)",
  },
  { href: "/onboarding", label: "1. Onboarding — Paso 1 (spotlight)" },
  { href: "/primer-uso", label: "2. Primer uso — Tooltip al pasar el mouse" },
  { href: "/detalle", label: "3. Vista de detalle — por qué documentado" },
  { href: "/agregar", label: "4. Agregar un \"por qué\" (menos de 3 pasos)" },
  { href: "/cobertura", label: "5. Cobertura" },
  { href: "/indice", label: "6. Índice de justificaciones (panel global)" },
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
    <Stack direction="vertical" gap={4} xstyle={styles.page}>
      <Heading level={1}>SaaS Tool — Pantallas</Heading>
      <Text type="body" color="secondary">
        Índice de pantallas construidas hasta ahora.
      </Text>
      <Stack direction="vertical" gap={2}>
        {screens.map((s) => (
          <Link key={s.href} href={s.href}>
            <Text type="body" color="accent">
              {s.label}
            </Text>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
