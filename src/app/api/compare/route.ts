import { NextResponse }
from "next/server";

const STOP_WORDS = [
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "have",
  "been",
  "were",
  "their",
  "there",
  "about",
  "would",
  "could",
  "should",
  "into",
  "while",
  "where",
  "which",
  "when",
  "what",
  "your",
  "than",
  "then",
  "they",
  "them",
  "because",
  "very",
  "much",
  "many",
  "some",
  "also",
  "just",
  "only",
];

function getWords(
  text: string
) {

  return (
    text
      .toLowerCase()

      .replace(
        /[^a-z0-9\s]/g,
        ""
      )

      .split(/\s+/)

      .filter(
        (word) =>

          word.length > 2 &&

          !STOP_WORDS.includes(
            word
          )
      )

      .map((word) => {

        if (
          word.endsWith("ing")
        ) {

          return word.slice(
            0,
            -3
          );
        }

        if (
          word.endsWith("ed")
        ) {

          return word.slice(
            0,
            -2
          );
        }

        if (
          word.endsWith("s")
        ) {

          return word.slice(
            0,
            -1
          );
        }

        return word;
      })
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
    "wonderful",
    "fantastic",
    "creative",
    "smart",
    "powerful",
    "efficient",
    "beautiful",
    "helpful",
    "impressive",
  ];

  const negative = [
    "bad",
    "sad",
    "terrible",
    "hate",
    "negative",
    "failure",
    "awful",
    "weak",
    "confusing",
    "difficult",
    "problem",
    "issue",
    "broken",
    "annoying",
    "ugly",
    "frustrating",
  ];

  let score = 0;

  positive.forEach(
    (word) => {

      const matches =
        text
          .toLowerCase()
          .match(
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

  negative.forEach(
    (word) => {

      const matches =
        text
          .toLowerCase()
          .match(
            new RegExp(
              `\\b${word}\\b`,
              "gi"
            )
          );

      if (matches) {

        score -=
          matches.length;
      }
    }
  );

  return {

    label:
      score > 1
        ? "Positive"
        : score < -1
        ? "Negative"
        : "Neutral",

    score:
      Math.min(
        Math.abs(score) / 6,
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

    const overlap =
      words1.filter(
        (word) =>
          words2.includes(word)
      );

    const overlapSet =
      [...new Set(overlap)];

    const similarity =
      Math.round(
        (
          overlapSet.length /

          Math.max(
            (
              words1.length +
              words2.length
            ) / 2,
            1
          )
        ) * 100
      );

    const matchingSentences =
      overlapSet
        .slice(0, 10)
        .map((word) => ({

          keyword: word,

          text1_match:
            text1
              .split(/[.!?]/)
              .find(
                (
                  s: string
                ) =>

                  s
                    .toLowerCase()
                    .includes(word)
              ) || "",

          text2_match:
            text2
              .split(/[.!?]/)
              .find(
                (
                  s: string
                ) =>

                  s
                    .toLowerCase()
                    .includes(word)
              ) || "",
        }));

    const result = {

      similarity_score:
        similarity,

      tone_difference:
        similarity > 75
          ? "Low"
          : similarity > 45
          ? "Moderate"
          : "High",

      keyword_overlap:
        overlapSet.slice(
          0,
          12
        ),

      keyword_overlap_score:
        Math.min(
          overlapSet.length *
            8,
          100
        ),

      plagiarism_risk:
        similarity > 85
          ? "High"
          : similarity > 60
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