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

    throw new Error(
      data.error ||
      "Analysis failed"
    );
  }

  let normalized =
    null;

  switch (type) {

    case "sentiment":

    case "emotion":

    case "language":

      normalized =
        data.result;

      break;

    case "summarize":

      normalized = {
        summary:
          data.summary,
      };

      break;

    case "ner":

      normalized = {
        entities:
          data.entities,
      };

      break;

    case "keywords":

      normalized = {
        keywords:
          data.keywords,
      };

      break;

    case "grammar":

      normalized = {
        matches:
          data.matches,
      };

      break;

    case "readability":

      normalized = {
        readingEase:
          data.readingEase,

        gradeLevel:
          data.gradeLevel,
      };

      break;

    case "topic":

      normalized =
        data.result;

      break;

    case "ai-detection":

      normalized =
        data;

      break;

    case "internet-plagiarism":

      normalized = {
        matches:
          data.matches,

        plagiarism_score:
          data.plagiarism_score,
      };

      break;

    default:

      normalized =
        data;
  }

  return {
    data: normalized,
  };
}