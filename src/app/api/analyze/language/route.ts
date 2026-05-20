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
        "papluca/xlm-roberta-base-language-detection",
        body.text
      );

    return NextResponse.json({
      success: true,
      result:
        result[0],
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        error:
          "Language detection failed",
      },
      {
        status: 500,
      }
    );
  }
}