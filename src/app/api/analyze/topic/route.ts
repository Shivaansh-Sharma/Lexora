import { NextResponse } from "next/server";

const TOPICS = {
  technology: [
    "ai",
    "software",
    "computer",
    "technology",
    "digital",
  ],

  health: [
    "health",
    "fitness",
    "exercise",
    "diet",
  ],

  finance: [
    "money",
    "finance",
    "investment",
    "bank",
  ],

  education: [
    "school",
    "education",
    "learning",
    "student",
  ],
};

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      body.text.toLowerCase();

    const scores:
      Record<string, number> =
      {};

    for (const topic in TOPICS) {
      scores[topic] = 0;

      TOPICS[
        topic as keyof typeof TOPICS
      ].forEach((word) => {
        if (text.includes(word)) {
          scores[topic]++;
        }
      });
    }

    const topTopic =
      Object.entries(scores).sort(
        (a, b) => b[1] - a[1]
      )[0];

    return NextResponse.json({
      success: true,

      topic: topTopic[0],

      confidence:
        topTopic[1] > 0
          ? 0.85
          : 0.4,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Topic detection failed",
      },
      {
        status: 500,
      }
    );
  }
}