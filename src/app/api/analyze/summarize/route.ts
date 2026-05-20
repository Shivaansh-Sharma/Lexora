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
        "facebook/bart-large-cnn",
        body.text
      );

    return NextResponse.json({
      success: true,
      summary:
        result[0]
          .summary_text,
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