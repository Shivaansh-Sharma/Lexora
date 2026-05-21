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

  if (!HF_TOKEN) {

    throw new Error(
      "HF_TOKEN missing"
    );
  }

  const body =
    typeof payload ===
    "string"

      ? {
          inputs: payload,
        }

      : payload;

  for (
    let attempt = 0;
    attempt < 3;
    attempt++
  ) {

    try {

      const controller =
        new AbortController();

      const timeout =
        setTimeout(
          () =>
            controller.abort(),
          45000
        );

      const response =
        await fetch(
          `https://router.huggingface.co/hf-inference/models/${model}`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${HF_TOKEN}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              body
            ),

            signal:
              controller.signal,

            cache:
              "no-store",
          }
        );

      clearTimeout(
        timeout
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

        await sleep(4000);

        continue;
      }

      const errorText =
        await response.text();

      console.error(
        "HF ERROR:",
        errorText
      );

      throw new Error(
        `HF request failed: ${response.status}`
      );

    } catch (error) {

      console.error(
        "HF FETCH ERROR:",
        error
      );

      if (
        attempt === 2
      ) {

        throw error;
      }

      await sleep(3000);
    }
  }

  throw new Error(
    "HF model timeout"
  );
}