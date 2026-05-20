import { NextResponse }
from "next/server";

import { queryHF }
from "@/lib/ai/huggingface";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const result =
      await queryHF(
        "j-hartmann/emotion-english-distilroberta-base",
        body.text
      );

    return NextResponse.json({
      success: true,
      result:
        result[0],
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Emotion analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}