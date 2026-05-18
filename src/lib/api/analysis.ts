export async function saveAnalysis(data: {
  type: string;
  inputText: string;
  result: unknown;
  language?: string;
}) {
  const response = await fetch("/api/analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save analysis");
  }

  return response.json();
}