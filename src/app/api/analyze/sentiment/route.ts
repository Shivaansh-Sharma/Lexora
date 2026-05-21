import { NextResponse }
from "next/server";

const POSITIVE = {

  strong: [
    "excellent",
    "amazing",
    "fantastic",
    "wonderful",
    "outstanding",
    "incredible",
    "brilliant",
    "perfect",
    "exceptional",
  ],

  medium: [
    "great",
    "good",
    "happy",
    "love",
    "success",
    "positive",
    "impressive",
    "creative",
    "smart",
    "powerful",
    "efficient",
    "beautiful",
    "helpful",
    "confident",
    "excited",
  ],

  light: [
    "nice",
    "pleasant",
    "decent",
    "fine",
    "okay",
    "satisfied",
  ],
};

const NEGATIVE = {

  strong: [
    "terrible",
    "awful",
    "horrible",
    "disaster",
    "hate",
    "broken",
    "useless",
    "pathetic",
  ],

  medium: [
    "bad",
    "sad",
    "negative",
    "failure",
    "poor",
    "weak",
    "confusing",
    "difficult",
    "problem",
    "issue",
    "annoying",
    "frustrating",
    "ugly",
  ],

  light: [
    "slow",
    "concern",
    "unclear",
    "stress",
    "tired",
  ],
};

const NEGATIONS = [
  "not",
  "never",
  "hardly",
  "barely",
  "no",
  "without",
];

function countMatches(
  text: string,
  words: string[],
  weight: number
) {

  let score = 0;

  words.forEach((word) => {

    const regex =
      new RegExp(
        `\\b${word}\\b`,
        "gi"
      );

    const matches =
      text.match(regex);

    if (matches) {

      score +=
        matches.length *
        weight;
    }
  });

  return score;
}

function applyNegationLogic(
  text: string,
  score: number
) {

  NEGATIONS.forEach(
    (negation) => {

      const regex =
        new RegExp(
          `${negation}\\s+(good|great|excellent|amazing|happy|love)`,
          "gi"
        );

      if (
        regex.test(text)
      ) {

        score -= 2;
      }
    }
  );

  return score;
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

    let positiveScore = 0;
    let negativeScore = 0;

    positiveScore +=
      countMatches(
        text,
        POSITIVE.strong,
        3
      );

    positiveScore +=
      countMatches(
        text,
        POSITIVE.medium,
        2
      );

    positiveScore +=
      countMatches(
        text,
        POSITIVE.light,
        1
      );

    negativeScore +=
      countMatches(
        text,
        NEGATIVE.strong,
        3
      );

    negativeScore +=
      countMatches(
        text,
        NEGATIVE.medium,
        2
      );

    negativeScore +=
      countMatches(
        text,
        NEGATIVE.light,
        1
      );

    positiveScore =
      applyNegationLogic(
        text,
        positiveScore
      );

    const exclamationBoost =
      (
        text.match(/!/g)
          ?.length || 0
      ) * 0.4;

    if (
      positiveScore >
      negativeScore
    ) {

      positiveScore +=
        exclamationBoost;
    } else {

      negativeScore +=
        exclamationBoost;
    }

    const rawDifference =
      positiveScore -
      negativeScore;

    let label =
      "Neutral";

    if (
      rawDifference > 1.5
    ) {
      label = "Positive";
    }

    if (
      rawDifference < -1.5
    ) {
      label = "Negative";
    }

    const totalSignal =
      Math.max(
        positiveScore +
          negativeScore,
        1
      );

    const confidence =
      Math.min(
        Math.abs(
          rawDifference
        ) / totalSignal,
        1
      );

    return NextResponse.json({

      success: true,

      result: {

        label,

        score:
          Number(
            confidence.toFixed(
              2
            )
          ),

        positiveScore:
          Number(
            positiveScore.toFixed(
              2
            )
          ),

        negativeScore:
          Number(
            negativeScore.toFixed(
              2
            )
          ),

        emotionalIntensity:
          Number(
            (
              totalSignal /
              Math.max(
                words.length *
                  0.08,
                1
              )
            ).toFixed(2)
          ),
      },
    });

  } catch (error) {

    console.error(error);

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