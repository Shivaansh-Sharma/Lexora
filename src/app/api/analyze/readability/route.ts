import { NextResponse }
from "next/server";

function countSyllables(word: string) {

  word = word.toLowerCase();

  if (word.length <= 3) return 1;

  const matches =
    word.match(/[aeiouy]{1,2}/g);

  return matches
    ? matches.length
    : 1;
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
      text.split(/[.!?]+/)
      .filter(Boolean);

    const words =
      text.match(/\b\w+\b/g)
      || [];

    const syllables =
      words.reduce(
        (total, word) =>
          total +
          countSyllables(word),
        0
      );

    const sentenceCount =
      Math.max(
        sentences.length,
        1
      );

    const wordCount =
      Math.max(
        words.length,
        1
      );

    const readingEase =
      206.835 -
      1.015 *
      (wordCount /
        sentenceCount) -
      84.6 *
      (syllables /
        wordCount);

    const gradeLevel =
      0.39 *
        (wordCount /
          sentenceCount) +
      11.8 *
        (syllables /
          wordCount) -
      15.59;

    return NextResponse.json({
      success: true,

      readingEase:
        Number(
          readingEase.toFixed(2)
        ),

      gradeLevel:
        Number(
          gradeLevel.toFixed(2)
        ),
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Readability analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}