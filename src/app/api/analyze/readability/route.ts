import { NextResponse }
from "next/server";

import textReadability
from "text-readability";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text || "";

    const readingEase =
      textReadability
        .fleschReadingEase(
          text
        );

    const gradeLevel =
      textReadability
        .fleschKincaidGrade(
          text
        );

    return NextResponse.json({

      success: true,

      readingEase:
        Number(
          readingEase.toFixed(
            2
          )
        ),

      gradeLevel:
        Number(
          gradeLevel.toFixed(
            2
          )
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