import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { Collapsible, CollapsibleGroup } from "@astryxdesign/core/Collapsible";

const FAQ_ITEMS = [
  {
    value: "producto-real",
    question: "¿Esto es un producto real?",
    answer:
      "No, es un caso de estudio de producto, construido para mostrar cómo pensé y resolví un problema real de RevOps de punta a punta.",
  },
  {
    value: "datos-reales",
    question: "¿Los datos son reales?",
    answer:
      "No, son datos de ejemplo, pensados para representar escenarios reales de una herramienta de marketing o CRM.",
  },
  {
    value: "progreso",
    question: "¿Mi progreso se guarda?",
    answer:
      "No, el estado vive en memoria del navegador. Si recargas la página o cierras la pestaña, vuelve al estado inicial.",
  },
];

/** FAQ de la landing — mismo patrón de accordion que "Referencia técnica"
 * (Collapsible), en modo "single" con divisores en vez de anidado. */
export function LandingFaq() {
  return (
    <Stack gap={4}>
      <Heading level={2}>Preguntas frecuentes</Heading>
      <CollapsibleGroup type="single" hasDividers>
        {FAQ_ITEMS.map((item) => (
          <Collapsible
            key={item.value}
            value={item.value}
            trigger={
              <Text type="body" weight="semibold">
                {item.question}
              </Text>
            }
          >
            <Text type="body" color="secondary">
              {item.answer}
            </Text>
          </Collapsible>
        ))}
      </CollapsibleGroup>
    </Stack>
  );
}
