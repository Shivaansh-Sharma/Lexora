from transformers import pipeline

classifier = None

def get_classifier():

    global classifier

    if classifier is None:

        classifier = pipeline(
            "text-classification",
            model="j-hartmann/emotion-english-distilroberta-base",
            top_k=None
        )

    return classifier

def analyze_emotion(text: str):

    results = get_classifier()(text)[0]

    formatted = []

    for item in results:

        formatted.append({
            "label": item["label"],
            "score": round(
                item["score"],
                4
            )
        })

    return formatted