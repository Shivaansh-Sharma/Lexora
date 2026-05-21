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

const FEATURE_WORDS = [
  "battery",
  "design",
  "performance",
  "interface",
  "tracking",
  "display",
  "camera",
  "speed",
  "accuracy",
  "features",
  "support",
  "quality",
  "device",
  "fitness",
  "software",
  "hardware",
];

const EMOTIONAL_WORDS = [
  "amazing",
  "wonderful",
  "fantastic",
  "incredible",
  "perfect",
  "completely",
  "truly",
  "extremely",
  "highly",
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

function cleanSentence(
  sentence: string
) {

  return sentence
    .replace(
      /\b(completely|truly|wonderfully|extremely|highly)\b/gi,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
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
            score += 0.8;
          }

          if (
            index ===
            sentences.length - 1
          ) {
            score += 0.3;
          }

          if (
            sentenceWords.length >= 8 &&
            sentenceWords.length <= 28
          ) {
            score += 0.5;
          }

          if (
            /\b(important|key|significant|excellent|innovative|powerful|effective)\b/i.test(
              sentence
            )
          ) {
            score += 0.8;
          }

          FEATURE_WORDS.forEach(
            (word) => {

              if (
                sentence
                  .toLowerCase()
                  .includes(word)
              ) {

                score += 0.4;
              }
            }
          );

          EMOTIONAL_WORDS.forEach(
            (word) => {

              if (
                sentence
                  .toLowerCase()
                  .includes(word)
              ) {

                score -= 0.15;
              }
            }
          );

          if (
            /\d/.test(sentence)
          ) {
            score += 0.3;
          }

          return {
            sentence:
              cleanSentence(
                sentence.trim()
              ),
            score,
            index,
            words:
              sentenceWords,
          };
        }
      );

    let summaryLength = 2;

    if (
      sentences.length > 10
    ) {
      summaryLength = 3;
    }

    if (
      sentences.length > 20
    ) {
      summaryLength = 4;
    }

    const selected: typeof scored =
      [];

    const usedWords =
      new Set<string>();

    scored
      .sort(
        (a, b) =>
          b.score - a.score
      )
      .forEach((item) => {

        if (
          selected.length >=
          summaryLength
        ) {
          return;
        }

        const overlap =
          item.words.filter(
            (word) =>
              usedWords.has(word)
          ).length;

        const overlapRatio =
          overlap /
          Math.max(
            item.words.length,
            1
          );

        if (
          overlapRatio < 0.6
        ) {

          selected.push(item);

          item.words.forEach(
            (word) =>
              usedWords.add(word)
          );
        }
      });

    const summary =
      selected
        .sort(
          (a, b) =>
            a.index - b.index
        )
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