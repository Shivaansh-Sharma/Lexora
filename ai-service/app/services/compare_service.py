from sentence_transformers import SentenceTransformer

from sklearn.metrics.pairwise import cosine_similarity

from keybert import KeyBERT

from transformers import pipeline

import numpy as np


model = None

kw_model = None

sentiment_pipeline = None


def get_model():

    global model

    if model is None:

        model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

    return model


def get_kw_model():

    global kw_model

    if kw_model is None:

        kw_model = KeyBERT()

    return kw_model


def get_sentiment_pipeline():

    global sentiment_pipeline

    if sentiment_pipeline is None:

        sentiment_pipeline = pipeline(
            "sentiment-analysis"
        )

    return sentiment_pipeline


def extract_keywords(text: str):

    keywords = (
        get_kw_model()
        .extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words="english",
            top_n=10
        )
    )

    return [
        keyword.lower()
        for keyword, score in keywords
    ]


def compare_texts(
    text1: str,
    text2: str
):

    embeddings = (
        get_model()
        .encode([
            text1,
            text2
        ])
    )

    similarity = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    similarity_percentage = round(
        float(similarity) * 100,
        2
    )

    keywords1 = extract_keywords(text1)

    keywords2 = extract_keywords(text2)

    overlap = list(
        set(keywords1).intersection(
            set(keywords2)
        )
    )

    overlap_percentage = round(
        (
            len(overlap)
            / max(
                len(
                    set(
                        keywords1 + keywords2
                    )
                ),
                1
            )
        ) * 100,
        2
    )

    sentiment1 = (
        get_sentiment_pipeline()
        (text1)[0]
    )

    sentiment2 = (
        get_sentiment_pipeline()
        (text2)[0]
    )

    tone_difference = (
        "Similar Tone"
        if sentiment1["label"]
        == sentiment2["label"]
        else "Different Tone"
    )

    plagiarism_risk = "Low"

    if similarity_percentage > 85:

        plagiarism_risk = "High"

    elif similarity_percentage > 65:

        plagiarism_risk = "Moderate"

    return {

        "similarity_score":
            float(similarity_percentage),

        "tone_difference":
            tone_difference,

        "keyword_overlap":
            overlap,

        "keyword_overlap_score":
            float(overlap_percentage),

        "plagiarism_risk":
            plagiarism_risk,

        "text1_sentiment": {

            "label":
                sentiment1["label"],

            "score":
                float(sentiment1["score"])
        },

        "text2_sentiment": {

            "label":
                sentiment2["label"],

            "score":
                float(sentiment2["score"])
        },
    }