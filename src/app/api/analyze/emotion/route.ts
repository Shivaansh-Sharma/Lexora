import { NextResponse } from "next/server";

const emotions = {
  joy: [
    "happy",
    "joy",
    "love",
    "excited",
    "great",
  ],

  sadness: [
    "sad",
    "cry",
    "depressed",
    "lonely",
  ],

  anger: [
    "angry",
    "hate",
    "furious",
    "annoyed",
  ],

  fear: [
    "fear",
    "afraid",
    "worried",
    "anxious",
  ],
};

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      body.text.toLowerCase();

    const scores:
      Record<string, number> =
      {};

    for (const key in emotions) {
      scores[key] = 0;

      emotions[
        key as keyof typeof emotions
      ].forEach((word) => {
        if (text.includes(word)) {
          scores[key]++;
        }
      });
    }

    const topEmotion =
      Object.entries(scores).sort(
        (a, b) => b[1] - a[1]
      )[0];

    return NextResponse.json({
      success: true,

      emotion: topEmotion[0],

      confidence:
        topEmotion[1] > 0
          ? 0.8
          : 0.4,

      scores,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Emotion analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}