import { NextResponse }
from "next/server";

const HF_TOKEN =
  process.env.HF_TOKEN;

async function sleep(
  ms: number
) {

  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );
}

async function getEmbedding(
  text: string
) {

  const response =
    await fetch(
      "https://router.huggingface.co/hf-inference/models/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${HF_TOKEN}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          inputs: text,
        }),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Embedding request failed"
    );
  }

  return response.json();
}

async function retryFetch(
  text: string
) {

  for (
    let i = 0;
    i < 3;
    i++
  ) {

    try {

      const result =
        await getEmbedding(
          text
        );

      if (
        Array.isArray(
          result
        )
      ) {

        return result;
      }

      if (
        result.error
      ) {

        await sleep(3000);

        continue;
      }

    } catch (error) {

      console.error(error);

      await sleep(3000);
    }
  }

  throw new Error(
    "Embedding failed after retries"
  );
}

function cosineSimilarity(
  a: number[],
  b: number[]
) {

  if (
    !a.length ||
    !b.length
  ) {

    return 0;
  }

  const dot =
    a.reduce(
      (sum, val, i) =>
        sum + val * b[i],
      0
    );

  const magA =
    Math.sqrt(
      a.reduce(
        (sum, val) =>
          sum + val * val,
        0
      )
    );

  const magB =
    Math.sqrt(
      b.reduce(
        (sum, val) =>
          sum + val * val,
        0
      )
    );

  if (
    magA === 0 ||
    magB === 0
  ) {

    return 0;
  }

  return dot / (magA * magB);
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    if (
      !body.text1 ||
      !body.text2
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Both texts are required",
        },
        {
          status: 400,
        }
      );
    }

    const [
      emb1,
      emb2,
    ] = await Promise.all([
      retryFetch(
        body.text1
      ),
      retryFetch(
        body.text2
      ),
    ]);

const vector1 =
  Array.isArray(
    emb1[0]
  )

    ? emb1[0]

    : emb1;

const vector2 =
  Array.isArray(
    emb2[0]
  )

    ? emb2[0]

    : emb2;

const similarity =
  cosineSimilarity(
    vector1,
    vector2
  );

const similarityScore =
  Math.round(similarity * 100);

return NextResponse.json({
  success: true,

  data: {
    similarity_score:
      similarityScore,

    tone_difference:
      similarityScore > 75
        ? "Low"
        : similarityScore > 45
        ? "Moderate"
        : "High",

    keyword_overlap: [],

    keyword_overlap_score:
      similarityScore,

    plagiarism_risk:
      similarityScore > 80
        ? "High"
        : similarityScore > 50
        ? "Moderate"
        : "Low",

    matching_sentences: [],

    text1_sentiment: {
      label: "Neutral",
      score: 0.5,
    },

    text2_sentiment: {
      label: "Neutral",
      score: 0.5,
    },
  },
});

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Comparison failed",
      },
      {
        status: 500,
      }
    );
  }
}