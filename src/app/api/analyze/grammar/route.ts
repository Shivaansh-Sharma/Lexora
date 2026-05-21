import { NextResponse } from "next/server";

type GrammarMatch = {
  message: string;
};

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      body.text || "";

    const matches: GrammarMatch[] = [];

    // Double spaces
    if (
      text.includes("  ")
    ) {
      matches.push({
        message:
          "Double spaces detected",
      });
    }

    // Missing punctuation
    if (
      text.length > 0 &&
      !/[.!?]$/.test(
        text.trim()
      )
    ) {
      matches.push({
        message:
          "Sentence may need punctuation",
      });
    }

    // Repeated words
    const repeatedWords =
      text.match(
        /\b(\w+)\s+\1\b/gi
      );

    if (
      repeatedWords
    ) {
      matches.push({
        message:
          "Repeated words detected",
      });
    }

    // Very long sentences
    const sentences =
      text
        .split(/[.!?]+/)
        .filter(Boolean);

    sentences.forEach(
      (sentence) => {
        const wordCount =
          sentence
            .trim()
            .split(/\s+/).length;

        if (
          wordCount > 35
        ) {
          matches.push({
            message:
              "Very long sentence may reduce readability",
          });
        }
      }
    );

    // Excessive capitalization
    if (
      /[A-Z]{5,}/.test(text)
    ) {
      matches.push({
        message:
          "Excessive capitalization detected",
      });
    }

    // Multiple punctuation
    if (
      /[!?]{2,}/.test(text)
    ) {
      matches.push({
        message:
          "Repeated punctuation detected",
      });
    }

    return NextResponse.json({
      success: true,

      analysis: {
        matches,
      },
    });
  } catch (error) {
    console.error(error);

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