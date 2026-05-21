import { NextResponse }
from "next/server";

const FORMAL_WORDS = [

  "furthermore",
  "moreover",
  "consequently",
  "therefore",
  "additionally",
  "thus",
  "hence",
  "however",
  "overall",
  "notably",
  "significantly",
  "leveraging",
  "optimization",
  "framework",
  "implementation",
  "infrastructure",
  "transformative",
  "streamlining",
  "enhancing",
  "facilitates",
  "utilize",
  "comprehensive",
  "robust",
  "scalable",
  "innovative",
  "seamless",
  "efficient",
];

const AI_PATTERNS = [

  "in today's world",
  "plays a crucial role",
  "it is important to note",
  "in conclusion",
  "overall",
  "as a result",
  "on the other hand",
  "this highlights",
  "this demonstrates",
  "this suggests",
  "in the modern era",
  "rapidly evolving",
  "across industries",
  "digital transformation",
];

const TRANSITION_WORDS = [

  "furthermore",
  "moreover",
  "however",
  "therefore",
  "consequently",
  "additionally",
  "thus",
  "meanwhile",
];

function normalizeScore(
  value: number,
  maxValue: number
) {

  return Math.min(
    value / maxValue,
    1
  );
}

function repetitionScore(
  words: string[]
) {

  const counts:
    Record<
      string,
      number
    > = {};

  words.forEach((word) => {

    counts[word] =
      (counts[word] || 0) + 1;
  });

  const repeated =
    Object.values(counts)
      .filter(
        (count) =>
          count > 1
      )
      .reduce(
        (a, b) => a + b,
        0
      );

  return (
    repeated /
    Math.max(
      words.length,
      1
    )
  );
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const text =
      body.text || "";

    const cleanText =
      text.trim();

    const sentences =
      cleanText
        .split(/[.!?]+/)
        .filter(Boolean);

    const words =
      cleanText
        .toLowerCase()
        .match(/\b\w+\b/g) || [];

    const sentenceCount =
      sentences.length;

    const wordCount =
      words.length;

    const uniqueWords =
      new Set(words).size;

    const avgSentenceLength =
      wordCount /
      Math.max(
        sentenceCount,
        1
      );

    const lexicalDiversity =
      uniqueWords /
      Math.max(
        wordCount,
        1
      );

    const repetition =
      repetitionScore(
        words
      );

    const formalCount =
      FORMAL_WORDS.reduce(
        (
          total,
          word
        ) =>
          total +
          cleanText
            .toLowerCase()
            .split(word).length -
          1,
        0
      );

    const aiPatternCount =
      AI_PATTERNS.reduce(
        (
          total,
          pattern
        ) =>
          total +
          cleanText
            .toLowerCase()
            .split(pattern).length -
          1,
        0
      );

    const transitionCount =
      TRANSITION_WORDS.reduce(
        (
          total,
          word
        ) =>
          total +
          cleanText
            .toLowerCase()
            .split(word).length -
          1,
        0
      );

const longWords =
  words.filter(
    (
      word: string
    ) =>
      word.length >= 8
  );

    const longWordRatio =
      longWords.length /
      Math.max(
        wordCount,
        1
      );

    const punctuationDensity =
      (
        cleanText.match(
          /[.,!?;]/g
        )?.length || 0
      ) /
      Math.max(
        cleanText.length,
        1
      );

    let structureScore = 0;
    let vocabularyScore = 0;
    let readabilityScore = 0;
    let uniformityScore = 0;
    let patternScore = 0;

    if (
      avgSentenceLength >= 24
    ) {

      structureScore += 1;

    } else if (
      avgSentenceLength >= 18
    ) {

      structureScore += 0.7;

    } else if (
      avgSentenceLength >= 14
    ) {

      structureScore += 0.4;
    }

    if (
      punctuationDensity <
      0.015
    ) {

      structureScore += 0.3;
    }

    vocabularyScore +=
      normalizeScore(
        formalCount,
        8
      );

    vocabularyScore +=
      normalizeScore(
        longWordRatio,
        0.35
      );

    vocabularyScore /= 2;

    if (
      lexicalDiversity < 0.55
    ) {

      uniformityScore += 1;

    } else if (
      lexicalDiversity < 0.70
    ) {

      uniformityScore += 0.6;

    } else if (
      lexicalDiversity < 0.82
    ) {

      uniformityScore += 0.3;
    }

    if (
      repetition > 0.35
    ) {

      uniformityScore += 0.3;
    }

    uniformityScore =
      Math.min(
        uniformityScore,
        1
      );

    patternScore +=
      normalizeScore(
        aiPatternCount,
        4
      );

    patternScore +=
      normalizeScore(
        transitionCount,
        6
      );

    patternScore /= 2;

    readabilityScore +=
      normalizeScore(
        avgSentenceLength,
        30
      );

    let aiLikelihood =

      structureScore * 0.20 +

      vocabularyScore * 0.25 +

      readabilityScore * 0.25 +

      uniformityScore * 0.15 +

      patternScore * 0.15;

    if (
      formalCount >= 4 &&
      avgSentenceLength > 18
    ) {

      aiLikelihood += 0.20;
    }

    if (
      longWordRatio > 0.30
    ) {

      aiLikelihood += 0.15;
    }

    if (
      wordCount > 120 &&
      transitionCount >= 3
    ) {

      aiLikelihood += 0.10;
    }

    aiLikelihood =
      Math.min(
        Math.max(
          aiLikelihood,
          0
        ),
        1
      );

    const humanLikelihood =
      1 - aiLikelihood;

    let prediction =
      "Natural Human Writing Pattern";

    if (
      aiLikelihood >= 0.80
    ) {

      prediction =
        "Strong AI Writing Signals";

    } else if (
      aiLikelihood >= 0.60
    ) {

      prediction =
        "Moderate AI Writing Signals";

    } else if (
      aiLikelihood >= 0.40
    ) {

      prediction =
        "Mixed Writing Signals";
    }

    return NextResponse.json({

      success: true,

      ai_writing_likelihood:
        Number(
          (
            aiLikelihood * 100
          ).toFixed(2)
        ),

      human_writing_likelihood:
        Number(
          (
            humanLikelihood * 100
          ).toFixed(2)
        ),

      prediction,

      confidence:
        Number(
          (
            Math.max(
              aiLikelihood,
              humanLikelihood
            ) * 100
          ).toFixed(2)
        ),

      metrics: {

        sentence_count:
          sentenceCount,

        word_count:
          wordCount,

        average_sentence_length:
          Number(
            avgSentenceLength.toFixed(
              2
            )
          ),

        lexical_diversity:
          Number(
(lexicalDiversity || 0).toFixed(4)
          ),

        repetition_score:
          Number(
(repetition || 0).toFixed(4)
          ),

        formal_word_matches:
          formalCount,

        ai_pattern_matches:
          aiPatternCount,

        transition_word_matches:
          transitionCount,

        long_word_ratio:
          Number(
            (
              (longWordRatio || 0) * 100
            ).toFixed(2)
          ),

        punctuation_density:
          Number(
            punctuationDensity.toFixed(
              4
            )
          ),
      },

      analysis_breakdown: {

        structure_score:
          Number(
            (
              structureScore * 100
            ).toFixed(2)
          ),

        vocabulary_score:
          Number(
            (
              vocabularyScore * 100
            ).toFixed(2)
          ),

        readability_score:
          Number(
            (
              readabilityScore * 100
            ).toFixed(2)
          ),

        uniformity_score:
          Number(
            (
              uniformityScore * 100
            ).toFixed(2)
          ),

        pattern_score:
          Number(
            (
              patternScore * 100
            ).toFixed(2)
          ),
      },

      disclaimer:
        "Experimental heuristic analysis using linguistic pattern recognition and soft computing techniques.",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "AI detection failed",
      },
      {
        status: 500,
      }
    );
  }
}