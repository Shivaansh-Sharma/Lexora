from transformers import pipeline

classifier = None

def get_classifier():

    global classifier

    if classifier is None:

        classifier = pipeline(
            "sentiment-analysis",
            model="distilbert/distilbert-base-uncased-finetuned-sst-2-english"
        )

    return classifier

def analyze_sentiment(text: str):

    result = get_classifier()(text)[0]

    return {
        "label": result["label"],
        "score": round(
            result["score"],
            4
        )
    }