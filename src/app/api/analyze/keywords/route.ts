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
        "ml6team/keyphrase-extraction-kbir-inspec",
        body.text
      );

    return NextResponse.json({
      success: true,
      keywords:
        result,
    });

  } catch {

    return NextResponse.json(
      {
        error:
          "Keyword extraction failed",
      },
      {
        status: 500,
      }
    );
  }
}