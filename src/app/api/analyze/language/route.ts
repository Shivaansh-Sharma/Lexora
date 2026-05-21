import { NextResponse }
from "next/server";

import { franc }
from "franc";

const languageMap:
  Record<string, string> = {

  eng: "English",
  spa: "Spanish",
  fra: "French",
  deu: "German",
  ita: "Italian",
  por: "Portuguese",
  rus: "Russian",
  hin: "Hindi",
  ben: "Bengali",
  jpn: "Japanese",
  kor: "Korean",
  zho: "Chinese",
  ara: "Arabic",
};

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text || "";

    const langCode =
      franc(text);

    const language =
      languageMap[
        langCode
      ] || "Unknown";

    return NextResponse.json({

      success: true,

      result: {

        language,

        code: langCode,

        confidence:
          language === "Unknown"
            ? 0.3
            : 0.95,
      },
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