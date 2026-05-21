export async function analyzeEmotion(text: string) {
  const response = await fetch(
    "/api/analyze/emotion",
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
    throw new Error("Failed to analyze emotion");
  }

  return response.json();
}