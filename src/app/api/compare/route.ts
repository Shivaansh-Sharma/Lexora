import { NextResponse }
from "next/server";

const HF_TOKEN =
  process.env.HF_TOKEN;

async function getEmbedding(
  text: string
) {

  const response =
    await fetch(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
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

  return response.json();
}

function cosineSimilarity(
  a: number[],
  b: number[]
) {

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

  return dot / (magA * magB);
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const [
      emb1,
      emb2,
    ] = await Promise.all([
      getEmbedding(
        body.text1
      ),
      getEmbedding(
        body.text2
      ),
    ]);

    const similarity =
      cosineSimilarity(
        emb1[0],
        emb2[0]
      );

    return NextResponse.json({

      similarity:
        Math.round(
          similarity * 100
        ),
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Comparison failed",
      },
      {
        status: 500,
      }
    );
  }
}