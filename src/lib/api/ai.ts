export async function analyzeSentiment(text: string) {
  const response = await fetch(
    "http://127.0.0.1:8000/analyze/sentiment",
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
    throw new Error("Failed to analyze sentiment");
  }

  return response.json();
}