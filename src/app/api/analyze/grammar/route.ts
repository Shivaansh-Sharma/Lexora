import { NextResponse }
from "next/server";

import LanguageTool
from "languagetool-api";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const result =
      await LanguageTool.check(
        body.text
      );

    return NextResponse.json({
      success: true,
      matches:
        result.matches,
    });

  } catch (error) {

  console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Grammar analysis failed",
          
      },
      {
        status: 500,
      }
    );
    
  }
}