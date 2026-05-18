from transformers import pipeline

summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

def summarize_text(text: str):
    cleaned_text = " ".join(text.split())

    result = summarizer(
        cleaned_text,
        max_length=120,
        min_length=30,
        do_sample=False
    )

    return {
        "summary": result[0]["summary_text"]
    }