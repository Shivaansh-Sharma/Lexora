import { NextResponse }
from "next/server";

import {
  fleschReadingEase,
} from "text-readability";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  return NextResponse.json({
    success: true,

    score:
      fleschReadingEase(
        body.text
      ),
  });
}