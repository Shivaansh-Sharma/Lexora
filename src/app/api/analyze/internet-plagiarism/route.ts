import { NextResponse } from "next/server";

function calculateRisk(
  text: string
) {
  const words =
    text
      .toLowerCase()
      .match(/\b\w+\b/g) || [];

  const unique =
    new Set(words).size;

  const repetition =
    1 - unique / Math.max(words.length, 1);

  let score =
    repetition * 100;

  if (words.length > 300) {
    score += 10;
  }

  score = Math.min(score, 100);

  let risk = "Low";

  if (score > 65) {
    risk = "High";
  } else if (score > 35) {
    risk = "Moderate";
  }

  return {
    plagiarism_score:
      Number(score.toFixed(2)),
    risk,
  };
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      body.text || "";

    const result =
      calculateRisk(text);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Plagiarism analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}