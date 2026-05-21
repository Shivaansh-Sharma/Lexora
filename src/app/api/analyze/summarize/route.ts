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
  "have",
  "has",
  "had",
  "will",
  "would",
  "can",
  "could",
  "should",
  "about",
  "into",
  "than",
  "then",
  "them",
  "they",
  "their",
];

function tokenize(
  text: string
) {

  return (
    text
      .toLowerCase()
      .match(/\b[a-z]{3,}\b/g) || []
  );
}

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

    const allWords =
      tokenize(text);

    const frequencies:
      Record<string, number> =
      {};

    allWords.forEach((word) => {

      if (
        !STOP_WORDS.includes(word)
      ) {

        frequencies[word] =
          (frequencies[word] || 0) + 1;
      }
    });

    const maxFrequency =
      Math.max(
        ...Object.values(
          frequencies
        ),
        1
      );

    Object.keys(
      frequencies
    ).forEach((word) => {

      frequencies[word] =
        frequencies[word] /
        maxFrequency;
    });

    const scored =
      sentences.map(
        (
          sentence,
          index
        ) => {

          const sentenceWords =
            tokenize(sentence);

          let score = 0;

          sentenceWords.forEach(
            (word) => {

              score +=
                frequencies[word] || 0;
            }
          );

          score =
            score /
            Math.max(
              sentenceWords.length,
              1
            );

          if (index === 0) {
            score += 1.2;
          }

          if (
            index ===
            sentences.length - 1
          ) {
            score += 0.4;
          }

          if (
            sentenceWords.length >= 8 &&
            sentenceWords.length <= 28
          ) {
            score += 0.5;
          }

          if (
            /\b(
              important|
              key|
              significant|
              recommend|
              excellent|
              innovative|
              powerful|
              effective
            )\b/ix.test(sentence)
          ) {
            score += 0.8;
          }

          return {
            sentence:
              sentence.trim(),
            score,
            index,
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
      summaryLength = 4;
    }

    if (
      sentences.length > 30
    ) {
      summaryLength = 6;
    }

    const selected =
      scored
        .sort(
          (a, b) =>
            b.score - a.score
        )
        .slice(
          0,
          summaryLength
        )
        .sort(
          (a, b) =>
            a.index - b.index
        );

    const summary =
      selected
        .map(
          (item) =>
            item.sentence
        )
        .join(" ");

    return NextResponse.json({

      success: true,

      summary,
    });

  } catch (error) {

    console.error(error);

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