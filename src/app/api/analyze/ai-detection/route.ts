import { NextResponse }
from "next/server";

function averageWordLength(
  words: string[]
) {

  return (
    words.reduce(
      (sum, word) =>
        sum + word.length,
      0
    ) / words.length
  );
}

function calculateBurstiness(
  sentences: string[]
) {

  const lengths =
    sentences.map(
      (s) =>
        s.split(" ").length
    );

  const avg =
    lengths.reduce(
      (a, b) => a + b,
      0
    ) / lengths.length;

  const variance =
    lengths.reduce(
      (sum, len) =>
        sum +
        Math.pow(
          len - avg,
          2
        ),
      0
    ) / lengths.length;

  return Math.sqrt(
    variance
  );
}

function repetitionScore(
  words: string[]
) {

  const unique =
    new Set(words);

  return (
    1 -
    unique.size /
      words.length
  );
}

function sentenceVariation(
  sentences: string[]
) {

  const lengths =
    sentences.map(
      (s) => s.length
    );

  const max =
    Math.max(...lengths);

  const min =
    Math.min(...lengths);

  return max - min;
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text;

    const cleaned =
      text
        .replace(/\s+/g, " ")
        .trim();

    const words =
      cleaned.split(" ");

    const sentences =
      cleaned
        .split(/[.!?]+/)
        .filter(Boolean);

    const avgWordLength =
      averageWordLength(
        words
      );

    const burstiness =
      calculateBurstiness(
        sentences
      );

    const repetition =
      repetitionScore(
        words
      );

    const variation =
      sentenceVariation(
        sentences
      );

    let score = 0;

    if (
      avgWordLength > 5
    ) score += 20;

    if (
      burstiness < 5
    ) score += 30;

    if (
      repetition > 0.25
    ) score += 25;

    if (
      variation < 40
    ) score += 25;

    score = Math.min(
      100,
      Math.max(0, score)
    );

    return NextResponse.json({

      success: true,

      aiProbability:
        score,

      metrics: {

        burstiness:
          Number(
            burstiness.toFixed(
              2
            )
          ),

        repetition:
          Number(
            repetition.toFixed(
              2
            )
          ),

        sentenceVariation:
          variation,

        avgWordLength:
          Number(
            avgWordLength.toFixed(
              2
            )
          ),
      },
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "AI detection failed",
      },
      {
        status: 500,
      }
    );
  }
}