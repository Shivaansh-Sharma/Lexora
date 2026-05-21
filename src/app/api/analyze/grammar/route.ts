import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      body.text || "";

const matches: {
  message: string;
}[] = [];

    if (
      text.includes("  ")
    ) {
      matches.push({
        message:
          "Double spaces detected",
      });
    }

    if (
      text.length > 0 &&
      !/[.!?]$/.test(text)
    ) {
      matches.push({
        message:
          "Sentence may need punctuation",
      });
    }

    return NextResponse.json({
      success: true,
      matches,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Grammar analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}