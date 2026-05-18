from transformers import pipeline

classifier = pipeline(
    "sentiment-analysis",
    model="distilbert/distilbert-base-uncased-finetuned-sst-2-english"
)

def analyze_sentiment(text: str):
    result = classifier(text)[0]

    return {
        "label": result["label"],
        "score": round(result["score"], 4)
    }