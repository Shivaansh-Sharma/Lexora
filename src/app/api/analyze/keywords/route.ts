import { NextResponse } from "next/server";

const STOP_WORDS = [
  "the",
  "is",
  "and",
  "a",
  "to",
  "of",
  "in",
  "that",
  "it",
  "for",
];

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const words =
      body.text
        .toLowerCase()
        .match(/\b\w+\b/g) || [];

    const freq:
      Record<string, number> =
      {};

    words.forEach((word: string) => {
      if (
        !STOP_WORDS.includes(word) &&
        word.length > 3
      ) {
        freq[word] =
          (freq[word] || 0) + 1;
      }
    });

    const keywords =
      Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word);

    return NextResponse.json({
      success: true,
      keywords,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Keyword extraction failed",
      },
      {
        status: 500,
      }
    );
  }
}