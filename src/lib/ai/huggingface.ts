const HF_TOKEN =
  process.env.HF_TOKEN;

async function sleep(
  ms: number
) {

  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );
}

export async function queryHF(
  model: string,
  payload: any
) {

  for (
    let attempt = 0;
    attempt < 3;
    attempt++
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

    if (
      response.ok
    ) {

      return response.json();
    }

    if (
      response.status ===
      503
    ) {

      await sleep(3000);

      continue;
    }

    throw new Error(
      "HuggingFace request failed"
    );
  }

  throw new Error(
    "Model loading timeout"
  );
}