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
        "facebook/bart-large-mnli",
        {
          inputs:
            body.text,

          parameters: {
            candidate_labels: [
              "Technology",
              "AI",
              "Finance",
              "Healthcare",
              "Education",
              "Business",
              "Politics",
              "Science",
              "Sports",
            ],
          },
        }
      );

    return NextResponse.json({
      success: true,
      result,
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        error:
          "Topic classification failed",
      },
      {
        status: 500,
      }
    );
  }
}