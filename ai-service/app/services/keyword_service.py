from keybert import KeyBERT

kw_model = KeyBERT()

def extract_keywords(text: str):
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=10
    )

    formatted = []

    for keyword, score in keywords:
        formatted.append({
            "keyword": keyword,
            "score": round(score, 4)
        })

    return formatted