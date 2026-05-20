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
        "distilbert/distilbert-base-uncased-finetuned-sst-2-english",
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
          "Sentiment analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}