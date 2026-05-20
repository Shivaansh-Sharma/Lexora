from keybert import KeyBERT
from transformers import pipeline

kw_model = None
classifier = None

def get_kw_model():

    global kw_model

    if kw_model is None:

        kw_model = KeyBERT()

    return kw_model


def get_classifier():

    global classifier

    if classifier is None:

        classifier = pipeline(
            "zero-shot-classification",
            model="typeform/distilbert-base-uncased-mnli"
        )

    return classifier


CANDIDATE_LABELS = [
    "Technology",
    "Artificial Intelligence",
    "Machine Learning",
    "Software Development",
    "Cybersecurity",
    "Data Science",

    "Education",
    "E-Learning",
    "Academic Research",

    "Finance",
    "Banking",
    "Cryptocurrency",
    "Economics",

    "Healthcare",
    "Medicine",
    "Mental Health",
    "Fitness",

    "Politics",
    "Government",
    "Law",

    "Business",
    "Marketing",
    "Startups",
    "Management",

    "Science",
    "Physics",
    "Biology",
    "Chemistry",

    "Environment",
    "Climate Change",
    "Sustainability",

    "Sports",
    "Entertainment",
    "Gaming",

    "Social Media",
    "Journalism",
    "News",

    "Travel",
    "Food",
    "Lifestyle",

    "History",
    "Philosophy",
    "Psychology",

    "Self Improvement",
    "Personal Development",
    "Reading",
    "Books",
    "Literature",
    "Productivity",
    "Communication",
    "Motivation",
]


def extract_topics(text: str):

    keywords = get_kw_model().extract_keywords(
        text,
        keyphrase_ngram_range=(1, 3),
        stop_words="english",
        use_mmr=True,
        diversity=0.7,
        top_n=8
    )

    cleaned_topics = []

    seen = set()

    for keyword, score in keywords:

        normalized = keyword.lower().strip()

        if normalized not in seen:

            seen.add(normalized)

            cleaned_topics.append({
                "topic": keyword.title(),
                "score": round(score, 4)
            })

    classification = get_classifier()(
        text,
        CANDIDATE_LABELS,
        multi_label=True
    )

    categories = []

    for label, score in zip(
        classification["labels"],
        classification["scores"]
    ):

        if score > 0.15:

            categories.append({
                "category": label,
                "score": round(score, 4)
            })

    return {

        "main_category":
            categories[0]["category"]
            if categories
            else "General",

        "category_confidence":
            categories[0]["score"]
            if categories
            else 0,

        "categories": categories[:5],

        "topics": cleaned_topics
    }