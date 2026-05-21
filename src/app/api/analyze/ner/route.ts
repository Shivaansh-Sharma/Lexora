import { NextResponse }
from "next/server";

const STOP_WORDS = [
  "The",
  "This",
  "That",
  "These",
  "Those",
  "A",
  "An",
  "And",
  "But",
  "Or",
  "From",
  "With",
  "Without",
  "Customer",
  "Support",
  "It",
  "They",
  "Their",
  "His",
  "Her",
  "Our",
  "Your",
];

const COMMON_WORDS = [
  "watch",
  "device",
  "battery",
  "design",
  "interface",
  "features",
  "tracking",
  "charge",
  "routine",
  "question",
  "data",
];

function extractEntities(
  text: string
) {

  const entities: {
    text: string;
    label: string;
  }[] = [];

  const seen =
    new Set<string>();

  const properNouns =
    text.match(
      /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/g
    ) || [];

  properNouns.forEach(
    (entity) => {

      const cleaned =
        entity.trim();

      if (
        cleaned.length < 3
      ) {
        return;
      }

      if (
        STOP_WORDS.includes(
          cleaned
        )
      ) {
        return;
      }

      if (
        COMMON_WORDS.includes(
          cleaned.toLowerCase()
        )
      ) {
        return;
      }

      if (
        seen.has(
          cleaned.toLowerCase()
        )
      ) {
        return;
      }

      seen.add(
        cleaned.toLowerCase()
      );

      entities.push({
        text: cleaned,
        label:
          "PROPER_NOUN",
      });
    }
  );

  const productPatterns =
    [
      /\bsmart watch\b/gi,
      /\bfitness tracking\b/gi,
      /\bcustomer support\b/gi,
      /\bintuitive interface\b/gi,
      /\bsleek design\b/gi,
    ];

  productPatterns.forEach(
    (pattern) => {

      const matches =
        text.match(pattern) || [];

      matches.forEach(
        (match) => {

          const cleaned =
            match.trim();

          if (
            seen.has(
              cleaned.toLowerCase()
            )
          ) {
            return;
          }

          seen.add(
            cleaned.toLowerCase()
          );

          entities.push({
            text: cleaned,
            label: "PRODUCT",
          });
        }
      );
    }
  );

  return entities.slice(0, 12);
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text || "";

    const entities =
      extractEntities(text);

    return NextResponse.json({

      success: true,

      result: entities,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "NER analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}