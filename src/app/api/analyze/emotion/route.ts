import { NextResponse }
from "next/server";

const emotions = {

  joy: [
    "happy",
    "joy",
    "love",
    "excited",
    "great",
    "amazing",
    "wonderful",
    "fantastic",
    "excellent",
    "delighted",
  ],

  sadness: [
    "sad",
    "cry",
    "depressed",
    "lonely",
    "hurt",
    "miserable",
  ],

  anger: [
    "angry",
    "hate",
    "furious",
    "annoyed",
    "frustrated",
    "rage",
  ],

  fear: [
    "fear",
    "afraid",
    "worried",
    "anxious",
    "panic",
    "nervous",
  ],

  optimism: [
    "hope",
    "optimistic",
    "positive",
    "confident",
    "successful",
    "bright",
  ],

  surprise: [
    "surprised",
    "shocked",
    "unexpected",
    "astonished",
  ],
};

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      (
        body.text || ""
      ).toLowerCase();

    const words =
      text.match(/\b\w+\b/g)
      || [];

    const totalWords =
      Math.max(
        words.length,
        1
      );

    const result: {
      label: string;
      score: number;
    }[] = [];

    for (const key in emotions) {

      let count = 0;

      emotions[
        key as keyof typeof emotions
      ].forEach(
        (word) => {

          const matches =
            text.match(
              new RegExp(
                `\\b${word}\\b`,
                "gi"
              )
            );

          if (matches) {
            count +=
              matches.length;
          }
        }
      );

      if (count > 0) {

        result.push({

          label: key,

          score:
            Number(
              Math.min(
                count /
                  (
                    totalWords *
                    0.08
                  ),
                1
              ).toFixed(2)
            ),
        });
      }
    }

    result.sort(
      (a, b) =>
        b.score - a.score
    );

    return NextResponse.json({

      success: true,

      result,
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