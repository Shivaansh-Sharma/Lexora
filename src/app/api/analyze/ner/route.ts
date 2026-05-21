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
  "On",
  "In",
  "At",
  "By",
  "For",
  "To",
  "Consequently",
  "However",
  "Meanwhile",
  "Therefore",
];

const PRODUCT_PATTERNS = [
  /\bsmart watch\b/gi,
  /\bfitness tracking\b/gi,
  /\bcustomer support\b/gi,
  /\bintuitive interface\b/gi,
  /\bsleek design\b/gi,
];

function classifyEntity(
  entity: string
) {

  if (
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(
      entity
    )
  ) {
    return "DATE";
  }

  if (
    /\b(paris|london|tokyo|berlin|western europe|new york|india|france|germany)\b/i.test(
      entity
    )
  ) {
    return "LOCATION";
  }

  if (
    /\b(exchange|solutions|biotech|corp|inc|ltd|technologies|systems|labs)\b/i.test(
      entity
    )
  ) {
    return "ORGANIZATION";
  }

  if (
    /\$\d+|\b\d+\s?(million|billion|dollars|usd|eur|rupees)\b/i.test(
      entity
    )
  ) {
    return "MONEY";
  }

  if (
    entity.split(" ").length >= 2
  ) {
    return "PERSON";
  }

  return "PROPER_NOUN";
}

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
          classifyEntity(
            cleaned
          ),
      });
    }
  );

  PRODUCT_PATTERNS.forEach(
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

  return entities.slice(0, 15);
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