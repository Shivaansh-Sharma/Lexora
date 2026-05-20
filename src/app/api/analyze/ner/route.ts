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
        "dslim/bert-base-NER",
        body.text
      );

    return NextResponse.json({
      success: true,
      entities:
        result,
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        error:
          "NER analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}