import { NextResponse }
from "next/server";

function getWords(
  text: string
) {

  return (
    text
      .toLowerCase()
      .match(/\b\w+\b/g) || []
  );
}

function unique(
  arr: string[]
) {

  return [...new Set(arr)];
}

function sentimentScore(
  text: string
) {

  const positive = [
    "good",
    "great",
    "excellent",
    "happy",
    "love",
    "success",
    "positive",
    "amazing",
  ];

  const negative = [
    "bad",
    "sad",
    "terrible",
    "hate",
    "negative",
    "failure",
    "awful",
  ];

  let score = 0;

  positive.forEach((word) => {

    if (
      text
        .toLowerCase()
        .includes(word)
    ) {

      score++;
    }
  });

  negative.forEach((word) => {

    if (
      text
        .toLowerCase()
        .includes(word)
    ) {

      score--;
    }
  });

  return {
    label:
      score > 0
        ? "Positive"
        : score < 0
        ? "Negative"
        : "Neutral",

    score:
      Math.min(
        Math.abs(score) / 5,
        1
      ) || 0.5,
  };
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text1 =
      body.text1 || "";

    const text2 =
      body.text2 || "";

    if (
      !text1 ||
      !text2
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Both texts are required",
        },
        {
          status: 400,
        }
      );
    }

    const words1 =
      unique(
        getWords(text1)
      );

    const words2 =
      unique(
        getWords(text2)
      );
const stopWords = [
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "have",
];
const overlap =
  words1.filter(
    (word) =>
      words2.includes(word) &&
      word.length > 2 &&
      !stopWords.includes(word)
  );

    const similarity =
      Math.round(
        (
          overlap.length /
          Math.max(
            words1.length,
            words2.length,
            1
          )
        ) * 100
      );

    const matchingSentences =
      overlap
        .slice(0, 10)
        .map((word) => ({

          keyword: word,

          text1_match:
            text1
              .split(".")
              .find((s: string) =>
                s
                  .toLowerCase()
                  .includes(word)
              ) || "",

          text2_match:
            text2
              .split(".")
              .find((s: string) =>
                s
                  .toLowerCase()
                  .includes(word)
              ) || "",
        }));

    const result = {

      similarity_score:
        similarity,

      tone_difference:
        similarity > 70
          ? "Low"
          : similarity > 40
          ? "Moderate"
          : "High",

      keyword_overlap:
        overlap.slice(0, 10),

      keyword_overlap_score:
        Math.min(
          overlap.length * 10,
          100
        ),

      plagiarism_risk:
        similarity > 80
          ? "High"
          : similarity > 50
          ? "Moderate"
          : "Low",

      matching_sentences:
        matchingSentences,

      text1_sentiment:
        sentimentScore(
          text1
        ),

      text2_sentiment:
        sentimentScore(
          text2
        ),
    };

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Comparison failed",
      },
      {
        status: 500,
      }
    );
  }
}