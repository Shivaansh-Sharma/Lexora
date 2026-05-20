const HF_TOKEN =
  process.env.HF_TOKEN;

export async function queryHF(
  model: string,
  payload: any
) {

  const response =
    await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${HF_TOKEN}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          typeof payload ===
            "string"

            ? {
                inputs:
                  payload,
              }

            : payload
        ),
      }
    );

  if (!response.ok) {

    throw new Error(
      "HuggingFace request failed"
    );
  }

  return response.json();
}