import { NextResponse } from "next/server";

const TOPICS = {
  Technology: [
    "technology",
    "software",
    "computer",
    "internet",
    "artificial intelligence",
    "ai",
    "machine learning",
    "programming",
    "digital",
    "data",
    "cybersecurity",
    "cloud",
  ],

  Business: [
    "business",
    "marketing",
    "startup",
    "finance",
    "investment",
    "economy",
    "sales",
    "management",
    "entrepreneur",
    "company",
  ],

  Education: [
    "education",
    "learning",
    "student",
    "school",
    "university",
    "teacher",
    "academic",
    "study",
    "course",
  ],

  Health: [
    "health",
    "medical",
    "fitness",
    "exercise",
    "nutrition",
    "mental health",
    "doctor",
    "disease",
    "treatment",
  ],

  Science: [
    "science",
    "physics",
    "chemistry",
    "biology",
    "research",
    "scientific",
    "laboratory",
    "experiment",
  ],

  Politics: [
    "politics",
    "government",
    "policy",
    "election",
    "law",
    "president",
    "democracy",
    "minister",
  ],
};

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const text =
      (
        body.text || ""
      ).toLowerCase();

    let bestTopic =
      "General";

    let bestScore = 0;

    let totalMatches = 0;

    for (const [
      topic,
      keywords,
    ] of Object.entries(
      TOPICS
    )) {
      let score = 0;

      keywords.forEach(
        (keyword) => {
          if (
            text.includes(
              keyword
            )
          ) {
            score++;
            totalMatches++;
          }
        }
      );

      if (
        score > bestScore
      ) {
        bestScore = score;
        bestTopic = topic;
      }
    }

    const confidence =
      totalMatches > 0
        ? Number(
            (
              (bestScore /
                totalMatches) *
              100
            ).toFixed(2)
          )
        : 0;

    return NextResponse.json({
      success: true,

      topic: bestTopic,

      confidence,
    });
  } catch (error) {
    console.error(error);

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