import { NextResponse } from "next/server";

const POSITIVE = [
  "good",
  "great",
  "excellent",
  "happy",
  "love",
  "amazing",
  "success",
  "positive",
];

const NEGATIVE = [
  "bad",
  "terrible",
  "sad",
  "hate",
  "awful",
  "negative",
  "failure",
  "poor",
];

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const text =
      body.text.toLowerCase();

    let score = 0;

    POSITIVE.forEach((word) => {
      if (text.includes(word))
        score++;
    });

    NEGATIVE.forEach((word) => {
      if (text.includes(word))
        score--;
    });

    let label = "Neutral";

    if (score > 0)
      label = "Positive";

    if (score < 0)
      label = "Negative";

    return NextResponse.json({
      success: true,
      result: {
        label,
        score:
          Math.min(
            Math.abs(score) / 5,
            1
          ) || 0.5,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Sentiment analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}