import { NextResponse }
from "next/server";

import { queryHF }
from "@/lib/ai/huggingface";

const MODELS: Record<
  string,
  string
> = {

  sentiment:
    "distilbert/distilbert-base-uncased-finetuned-sst-2-english",

  emotion:
    "j-hartmann/emotion-english-distilroberta-base",

  summarize:
    "sshleifer/distilbart-cnn-12-6",

  language:
    "papluca/xlm-roberta-base-language-detection",

  topic:
    "facebook/bart-large-mnli",

  ner:
    "dslim/bert-base-NER",
};

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: {
      type: string;
    };
  }
) {

  try {

    const body =
      await request.json();

    const text =
      body.text;

    const type =
      params.type;

    if (
      !MODELS[type]
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid analysis type",
        },
        {
          status: 400,
        }
      );
    }

    let result;

    if (
      type === "topic"
    ) {

      result =
        await queryHF(
          MODELS[type],
          {
            inputs: text,

            parameters: {
              candidate_labels: [
                "Technology",
                "AI",
                "Education",
                "Finance",
                "Healthcare",
                "Business",
                "Marketing",
                "Politics",
                "Sports",
                "Science",
              ],
            },
          } as any
        );

    } else {

      result =
        await queryHF(
          MODELS[type],
          text
        );
    }

    return NextResponse.json(
      result
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}