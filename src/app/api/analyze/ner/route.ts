import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      body.text || "";

const entities =
  text.match(
    /\b[A-Z][a-z]{2,}(?:\s[A-Z][a-z]{2,})*\b/g
  ) || [];

    return NextResponse.json({
      success: true,

      entities:
        entities.map((entity) => ({
          entity,
          type: "PROPER_NOUN",
        })),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "NER failed",
      },
      {
        status: 500,
      }
    );
  }
}