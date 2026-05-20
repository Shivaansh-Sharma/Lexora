from transformers import pipeline

summarizer = None

def get_summarizer():

    global summarizer

    if summarizer is None:

        summarizer = pipeline(
            "summarization",
            model="sshleifer/distilbart-cnn-12-6"
        )

    return summarizer

def summarize_text(text: str):

    cleaned_text = " ".join(
        text.split()
    )

    result = get_summarizer()(
        cleaned_text,
        max_length=120,
        min_length=30,
        do_sample=False
    )

    return {
        "summary":
            result[0]["summary_text"]
    }