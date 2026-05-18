from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

def analyze_emotion(text: str):
    results = classifier(text)[0]

    formatted = []

    for item in results:
        formatted.append({
            "label": item["label"],
            "score": round(item["score"], 4)
        })

    return formatted