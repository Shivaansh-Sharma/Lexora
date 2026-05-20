export async function saveComparison(
  payload: {
    text1: string;
    text2: string;
    result: unknown;
  }
) {

  const response =
    await fetch(
      "/api/comparison",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          payload
        ),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to save comparison"
    );
  }

  return response.json();
}

export async function getComparisons() {

  const response =
    await fetch(
      "/api/comparison"
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch comparisons"
    );
  }

  return response.json();
}

export async function getComparisonById(
  id: string
) {

  const response =
    await fetch(
      `/api/comparison/${id}/get`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch comparison"
    );
  }

  return response.json();
}

export async function deleteComparison(
  id: string
) {

  const response =
    await fetch(
      `/api/comparison/${id}`,
      {
        method: "DELETE",
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to delete comparison"
    );
  }

  return response.json();
}