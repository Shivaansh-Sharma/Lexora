export async function analyzeText(
  type: string,
  text: string
) {

  const endpointMap: Record<
    string,
    string
  > = {

    sentiment:
      "sentiment",

    emotion:
      "emotion",

    ner:
      "ner",

    summarize:
      "summarize",

    readability:
      "readability",

    keywords:
      "keywords",

    language:
      "language",

    topic:
      "topic",

    grammar:
      "grammar",

    "ai-detection":
      "ai-detection",

    "internet-plagiarism":
      "internet-plagiarism",
  };

  const endpoint =
    endpointMap[type];

  if (!endpoint) {

    throw new Error(
      "Invalid analysis type"
    );
  }

  const response =
    await fetch(
      `/api/analyze/${endpoint}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          text,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

console.error(data);

throw new Error(
  data.error ||
  JSON.stringify(data) ||
  "Analysis failed"
);
  }

let normalized: Record<string, any> | any = null;

switch (type) {

  case "sentiment":

    normalized = {
      label:
        data?.result?.label ||
        data?.label ||
        "Neutral",

      score:
        data?.result?.score ||
        data?.score ||
        0,
    };

    break;

  case "emotion":

    normalized = {
      emotions:
        data?.result ||
        data ||
        [],
    };

    break;

case "language":

  normalized = {
    language:
      data?.result?.language ||
      "Unknown",

    code:
      data?.result?.code ||
      "unknown",

    confidence:
      Number(
        (
          (data?.result
            ?.confidence || 0) *
          100
        ).toFixed(2)
      ),
  };

  break;

  case "summarize":

    normalized = {
      summary:
        data?.result?.summary ||
        data?.summary ||
        "",
    };

    break;

  case "ner":

    normalized = {
      entities:
        data?.result?.entities ||
        data?.entities ||
        [],
    };

    break;

  case "keywords":

    normalized = {
      keywords:
        data?.result?.keywords ||
        data?.keywords ||
        [],
    };

    break;

case "grammar":

  normalized = {
    matches:
      data?.analysis?.matches ||
      [],
  };

  break;

  case "readability":

  normalized = {
    reading_ease:
      data?.result?.readingEase ||
      data?.readingEase ||
      0,

    grade_level:
      data?.result?.gradeLevel ||
      data?.gradeLevel ||
      0,

    difficult_words:
      data?.result?.difficultWords ||
      data?.difficultWords ||
      0,

    sentence_count:
      data?.result?.sentenceCount ||
      data?.sentenceCount ||
      0,

    word_count:
      data?.result?.wordCount ||
      data?.wordCount ||
      0,
  };

  break;
  
case "topic":

  normalized = {
    topic:
      data?.result?.topic ||
      data?.topic ||
      "General",

    confidence:
      data?.result?.confidence ||
      data?.confidence ||
      0,
  };

  break;

  case "ai-detection":

    normalized =
      data?.result ||
      data;

    break;

  case "internet-plagiarism":

    normalized = {
      matches:
        data?.result?.matches ||
        data?.matches ||
        [],

      plagiarism_score:
        data?.result?.plagiarism_score ||
        data?.plagiarism_score ||
        0,
    };

    break;

  default:

    normalized =
      data?.result ||
      data;
}

  return {
    data: normalized,
  };
}