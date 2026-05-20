import { NextResponse }
from "next/server";

import textstat
from "textstat";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const text =
    body.text;

  return NextResponse.json({

    fleschReadingEase:
      textstat.fleschReadingEase(
        text
      ),

    grade:
      textstat.fleschKincaidGrade(
        text
      ),
  });
}