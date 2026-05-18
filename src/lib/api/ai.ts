export async function analyzeText(
  type: string,
  text: string
) {
  const endpointMap: Record<string, string> = {
    sentiment: "sentiment",
    emotion: "emotion",
    ner: "ner",
  };

  const endpoint = endpointMap[type];

  if (!endpoint) {
    throw new Error("Invalid analysis type");
  }

  const response = await fetch(
    `http://127.0.0.1:8000/analyze/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}