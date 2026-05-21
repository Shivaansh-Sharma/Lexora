import { NextResponse }
from "next/server";

const EMOTION_PATTERNS = {

  joy: {
    strong: [
      "ecstatic",
      "thrilled",
      "overjoyed",
      "delighted",
      "euphoric",
      "celebration",
      "celebrate",
      "achievement",
      "success",
      "acceptance",
    ],

    medium: [
      "happy",
      "joy",
      "love",
      "excited",
      "amazing",
      "wonderful",
      "fantastic",
      "excellent",
      "great",
      "positive",
      "grateful",
      "smile",
      "laugh",
      "warmth",
      "hopeful",
    ],

    light: [
      "good",
      "nice",
      "pleasant",
      "bright",
      "relieved",
      "enjoy",
    ],
  },

  sadness: {
    strong: [
      "devastated",
      "heartbroken",
      "grief",
      "hopeless",
      "miserable",
    ],

    medium: [
      "sad",
      "depressed",
      "lonely",
      "hurt",
      "cry",
      "upset",
      "pain",
    ],

    light: [
      "disappointed",
      "tired",
      "down",
      "emotional",
    ],
  },

  anger: {
    strong: [
      "furious",
      "rage",
      "outraged",
      "violent",
    ],

    medium: [
      "angry",
      "hate",
      "frustrated",
      "annoyed",
      "irritated",
    ],

    light: [
      "upset",
      "displeased",
      "offended",
    ],
  },

  fear: {
    strong: [
      "terrified",
      "panic",
      "horrified",
    ],

    medium: [
      "fear",
      "afraid",
      "anxious",
      "worried",
      "nervous",
      "uncertain",
    ],

    light: [
      "concerned",
      "uneasy",
      "stress",
    ],
  },

  optimism: {
    strong: [
      "confident",
      "determined",
      "successful",
    ],

    medium: [
      "hope",
      "optimistic",
      "positive",
      "motivated",
      "inspired",
      "focused",
    ],

    light: [
      "improving",
      "progress",
      "growing",
    ],
  },

  surprise: {
    strong: [
      "shocked",
      "astonished",
      "unbelievable",
    ],

    medium: [
      "surprised",
      "unexpected",
      "suddenly",
      "sudden",
      "remarkable",
    ],

    light: [
      "different",
      "unusual",
      "interesting",
    ],
  },
};

function scoreEmotion(
  text: string,
  words: string[],
  emotion: keyof typeof EMOTION_PATTERNS
) {

  const categories =
    EMOTION_PATTERNS[
      emotion
    ];

  let score = 0;

  categories.strong.forEach(
    (word) => {

      const matches =
        text.match(
          new RegExp(
            `\\b${word}\\b`,
            "gi"
          )
        );

      if (matches) {
        score +=
          matches.length * 3;
      }
    }
  );

  categories.medium.forEach(
    (word) => {

      const matches =
        text.match(
          new RegExp(
            `\\b${word}\\b`,
            "gi"
          )
        );

      if (matches) {
        score +=
          matches.length * 2;
      }
    }
  );

  categories.light.forEach(
    (word) => {

      const matches =
        text.match(
          new RegExp(
            `\\b${word}\\b`,
            "gi"
          )
        );

      if (matches) {
        score +=
          matches.length;
      }
    }
  );

  const intensityBoost =
    (
      text.match(
        /!+/g
      )?.length || 0
    ) * 0.4;

  score += intensityBoost;

  const normalized =
    Math.min(
      score /
        Math.max(
          words.length * 0.04,
          1
        ),
      1
    );

  return Number(
    normalized.toFixed(2)
  );
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const rawText =
      body.text || "";

    const text =
      rawText.toLowerCase();

    const words =
      text.match(/\b\w+\b/g)
      || [];

    const result: {
      label: string;
      score: number;
    }[] = [];

    (
      Object.keys(
        EMOTION_PATTERNS
      ) as Array<
        keyof typeof EMOTION_PATTERNS
      >
    ).forEach(
      (emotion) => {

        const score =
          scoreEmotion(
            text,
            words,
            emotion
          );

        if (score > 0) {

          result.push({
            label:
              emotion,

            score,
          });
        }
      }
    );

    result.sort(
      (a, b) =>
        b.score - a.score
    );

    return NextResponse.json({

      success: true,

      result,

      dominantEmotion:
        result[0]?.label ||
        "neutral",

      confidence:
        result[0]?.score ||
        0,
    });

  } catch (error) {

    console.error(error);

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