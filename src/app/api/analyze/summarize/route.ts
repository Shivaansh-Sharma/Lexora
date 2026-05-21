import { NextResponse }
from "next/server";

const STOP_WORDS = [
  "the",
  "is",
  "a",
  "an",
  "and",
  "or",
  "but",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "as",
  "by",
  "at",
  "from",
  "that",
  "this",
  "it",
  "be",
  "are",
  "was",
  "were",
];

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text || "";

    const sentences =
      text.match(
        /[^.!?]+[.!?]+/g
      ) || [];

    if (
      sentences.length === 0
    ) {

      return NextResponse.json({
        success: true,
        summary: "",
      });
    }

    const words =
      text
        .toLowerCase()
        .match(/\b[a-z]{3,}\b/g) || [];

    const frequencies:
      Record<string, number> =
      {};

    words.forEach((word) => {

      if (
        !STOP_WORDS.includes(
          word
        )
      ) {

        frequencies[word] =
          (frequencies[word] || 0) + 1;
      }
    });

    const scored =
      sentences.map(
        (sentence) => {

          const sentenceWords =
            sentence
              .toLowerCase()
              .match(
                /\b[a-z]{3,}\b/g
              ) || [];

          let score = 0;

          sentenceWords.forEach(
            (word) => {

              score +=
                frequencies[
                  word
                ] || 0;
            }
          );

          return {
            sentence:
              sentence.trim(),
            score,
          };
        }
      );

    let summaryLength = 2;

    if (
      sentences.length > 8
    ) {

      summaryLength = 3;
    }

    if (
      sentences.length > 15
    ) {

      summaryLength = 5;
    }

    if (
      sentences.length > 30
    ) {

      summaryLength = 8;
    }

    const topSentences =
      scored

        .sort(
          (a, b) =>
            b.score - a.score
        )

        .slice(
          0,
          summaryLength
        )

        .map(
          (item) =>
            item.sentence
        );

    const summary =
      sentences.filter(
        (sentence) =>
          topSentences.includes(
            sentence.trim()
          )
      ).join(" ");

    return NextResponse.json({

      success: true,

      summary,
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        error:
          "Summarization failed",
      },
      {
        status: 500,
      }
    );
  }
}