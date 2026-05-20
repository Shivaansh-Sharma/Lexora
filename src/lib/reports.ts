export async function getReports() {

  const response =
    await fetch(
      "/api/reports"
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch reports"
    );
  }

  return response.json();
}

export async function deleteAnalysis(
  id: string
) {

  const response =
    await fetch(
      `/api/analysis/${id}`,
      {
        method: "DELETE",
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to delete analysis"
    );
  }

  return response.json();
}

export async function deleteComparisonReport(
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