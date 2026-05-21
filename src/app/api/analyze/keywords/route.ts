import { NextResponse }
from "next/server";

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "if",
  "then",
  "from",
  "with",
  "this",
  "that",
  "these",
  "those",
  "into",
  "about",
  "very",
  "really",
  "just",
  "completely",
  "incredibly",
  "wonderfully",
  "truly",
  "single",
  "moment",
  "also",
  "when",
  "they",
  "them",
  "their",
  "there",
  "while",
  "would",
  "could",
  "should",
  "have",
  "has",
  "had",
  "been",
  "being",
  "was",
  "were",
  "is",
  "are",
  "am",
  "to",
  "of",
  "for",
  "on",
  "in",
  "at",
  "by",
  "as",
  "it",
  "its",
  "my",
  "your",
  "our",
]);

function cleanWord(
  word: string
) {
  return word
    .toLowerCase()
    .replace(/[^a-zA-Z]/g, "");
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text || "";

    const words =
      text.split(/\s+/);

    const frequencies:
      Record<
        string,
        number
      > = {};

    for (const rawWord of words) {

      const word =
        cleanWord(rawWord);

      if (
        !word ||
        word.length < 4 ||
        STOPWORDS.has(word)
      ) {
        continue;
      }

      frequencies[word] =
        (frequencies[word] || 0) + 1;
    }

    const phrases:
      Record<
        string,
        number
      > = {};

    for (
      let i = 0;
      i < words.length - 1;
      i++
    ) {

      const first =
        cleanWord(words[i]);

      const second =
        cleanWord(words[i + 1]);

      if (
        first.length < 4 ||
        second.length < 4
      ) {
        continue;
      }

      if (
        STOPWORDS.has(first) ||
        STOPWORDS.has(second)
      ) {
        continue;
      }

      const phrase =
        `${first} ${second}`;

      phrases[phrase] =
        (phrases[phrase] || 0) + 1;
    }

    const topPhrases =
      Object.entries(phrases)
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 5)
        .map(([phrase]) => phrase);

    const topWords =
      Object.entries(frequencies)
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 10)
        .map(([word]) => word);

    const keywords = [
      ...topPhrases,
      ...topWords,
    ].slice(0, 12);

    return NextResponse.json({

      success: true,

      result: {
        keywords,
      },
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Keyword extraction failed",
      },
      {
        status: 500,
      }
    );
  }
}