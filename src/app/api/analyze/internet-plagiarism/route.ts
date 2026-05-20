import { NextResponse }
from "next/server";

import {
  search,
} from "duck-duck-scrape";

function similarity(
  a: string,
  b: string
) {

  const wordsA =
    new Set(
      a
        .toLowerCase()
        .split(/\W+/)
    );

  const wordsB =
    new Set(
      b
        .toLowerCase()
        .split(/\W+/)
    );

  const intersection =
    [...wordsA].filter(
      (word) =>
        wordsB.has(word)
    );

  const union =
    new Set([
      ...wordsA,
      ...wordsB,
    ]);

  return (
    intersection.length /
    union.size
  );
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text;

    if (
      !text ||
      text.length < 40
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Text too short",
        },
        {
          status: 400,
        }
      );
    }

    const query =
      text
        .split(" ")
        .slice(0, 20)
        .join(" ");

    const results =
      await search(query, {
        safeSearch:1,
      });

    const matches =
      results.results
        .map((result) => {

          const score =
            similarity(
              text,
              result.title +
                " " +
                result.description
            );

          return {

            title:
              result.title,

            url:
              result.url,

            snippet:
              result.description,

            similarity:
              Math.round(
                score * 100
              ),
          };
        })
        .filter(
          (item) =>
            item.similarity >=
            15
        )
        .sort(
          (a, b) =>
            b.similarity -
            a.similarity
        )
        .slice(0, 5);

    return NextResponse.json({

      success: true,

      matches,

      plagiarism_score:
        matches.length > 0

          ? Math.min(
              100,
              matches[0]
                .similarity
            )

          : 0,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Plagiarism detection failed",
      },
      {
        status: 500,
      }
    );
  }
}