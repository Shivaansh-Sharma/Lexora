import textstat
import re
from collections import Counter

FORMAL_WORDS = [
    "furthermore",
    "moreover",
    "consequently",
    "therefore",
    "additionally",
    "thus",
    "hence",
    "however",
    "overall",
    "notably",
    "significantly",
    "leveraging",
    "optimization",
    "framework",
    "implementation",
    "infrastructure",
    "transformative",
    "streamlining",
    "enhancing",
    "facilitates",
    "utilize",
    "comprehensive",
    "robust",
    "scalable",
    "innovative",
    "seamless",
    "efficient",
]

AI_PATTERNS = [
    "in today's world",
    "plays a crucial role",
    "it is important to note",
    "in conclusion",
    "overall",
    "as a result",
    "on the other hand",
    "this highlights",
    "this demonstrates",
    "this suggests",
    "in the modern era",
    "rapidly evolving",
    "across industries",
    "digital transformation",
]

TRANSITION_WORDS = [
    "furthermore",
    "moreover",
    "however",
    "therefore",
    "consequently",
    "additionally",
    "thus",
    "meanwhile",
]

def calculate_repetition_score(words):

    if not words:
        return 0

    counter = Counter(words)

    repeated_words = sum(
        count
        for count in counter.values()
        if count > 1
    )

    return repeated_words / len(words)

def normalize_score(value, max_value):

    return min(value / max_value, 1.0)

def detect_ai_text(text: str):

    # -----------------------------------
    # Preprocessing
    # -----------------------------------

    clean_text = text.strip()

    sentences = re.split(
        r"[.!?]+",
        clean_text
    )

    sentences = [
        s.strip()
        for s in sentences
        if s.strip()
    ]

    words = re.findall(
        r"\b\w+\b",
        clean_text.lower()
    )

    sentence_count = len(sentences)

    word_count = len(words)

    unique_words = len(set(words))

    avg_sentence_length = (
        word_count / max(sentence_count, 1)
    )

    reading_ease = round(
        textstat.flesch_reading_ease(clean_text),
        2
    )

    grade_level = round(
        textstat.flesch_kincaid_grade(clean_text),
        2
    )

    lexical_diversity = round(
        unique_words / max(word_count, 1),
        4
    )

    repetition_score = round(
        calculate_repetition_score(words),
        4
    )

    # -----------------------------------
    # Linguistic Indicators
    # -----------------------------------

    formal_count = sum(
        clean_text.lower().count(word)
        for word in FORMAL_WORDS
    )

    ai_pattern_count = sum(
        clean_text.lower().count(pattern)
        for pattern in AI_PATTERNS
    )

    transition_count = sum(
        clean_text.lower().count(word)
        for word in TRANSITION_WORDS
    )

    punctuation_density = round(
        (
            clean_text.count(",")
            + clean_text.count(";")
        ) / max(sentence_count, 1),
        2
    )

    long_word_count = len([
        word
        for word in words
        if len(word) >= 8
    ])

    long_word_ratio = round(
        long_word_count / max(word_count, 1),
        4
    )

    # -----------------------------------
    # Soft Computing / Fuzzy Scoring
    # -----------------------------------

    structure_score = 0
    vocabulary_score = 0
    readability_score = 0
    uniformity_score = 0
    pattern_score = 0

    # -----------------------------------
    # Structure Analysis
    # -----------------------------------

    if avg_sentence_length >= 24:
        structure_score += 1.0

    elif avg_sentence_length >= 18:
        structure_score += 0.7

    elif avg_sentence_length >= 14:
        structure_score += 0.4

    if punctuation_density >= 2:
        structure_score += 0.3

    # -----------------------------------
    # Vocabulary Analysis
    # -----------------------------------

    vocabulary_score += normalize_score(
        formal_count,
        8
    )

    vocabulary_score += normalize_score(
        long_word_ratio,
        0.35
    )

    vocabulary_score /= 2

    # -----------------------------------
    # Readability Complexity
    # -----------------------------------

    if reading_ease < 0:
        readability_score += 1.0

    elif reading_ease < 20:
        readability_score += 0.7

    elif reading_ease < 40:
        readability_score += 0.4

    if grade_level > 18:
        readability_score += 0.3

    elif grade_level > 14:
        readability_score += 0.15

    readability_score = min(
        readability_score,
        1.0
    )

    # -----------------------------------
    # Uniformity Analysis
    # -----------------------------------

    if lexical_diversity < 0.55:
        uniformity_score += 1.0

    elif lexical_diversity < 0.70:
        uniformity_score += 0.6

    elif lexical_diversity < 0.82:
        uniformity_score += 0.3

    if repetition_score > 0.35:
        uniformity_score += 0.3

    uniformity_score = min(
        uniformity_score,
        1.0
    )

    # -----------------------------------
    # AI Phrase Pattern Analysis
    # -----------------------------------

    pattern_score += normalize_score(
        ai_pattern_count,
        4
    )

    pattern_score += normalize_score(
        transition_count,
        6
    )

    pattern_score /= 2

    # -----------------------------------
    # Final Weighted Score
    # -----------------------------------

    ai_likelihood = (
        (structure_score * 0.20)
        + (vocabulary_score * 0.25)
        + (readability_score * 0.25)
        + (uniformity_score * 0.15)
        + (pattern_score * 0.15)
    )

    # -----------------------------------
    # Special Overrides
    # -----------------------------------

    # Very polished enterprise AI writing
    if (
        formal_count >= 4
        and reading_ease < 15
        and avg_sentence_length > 18
    ):
        ai_likelihood += 0.20

    # Extremely academic / synthetic style
    if (
        grade_level > 18
        and long_word_ratio > 0.30
    ):
        ai_likelihood += 0.15

    # Long structured AI-like response
    if (
        word_count > 120
        and transition_count >= 3
    ):
        ai_likelihood += 0.10

    ai_likelihood = min(
        max(ai_likelihood, 0),
        1.0
    )

    human_likelihood = round(
        1 - ai_likelihood,
        4
    )

    # -----------------------------------
    # Perplexity Style Indicator
    # -----------------------------------

    perplexity_indicator = "Natural Variation"

    if ai_likelihood > 0.80:
        perplexity_indicator = "Highly Uniform"

    elif ai_likelihood > 0.60:
        perplexity_indicator = "Moderately Uniform"

    elif ai_likelihood > 0.45:
        perplexity_indicator = "Slightly Uniform"

    # -----------------------------------
    # Prediction
    # -----------------------------------

    if ai_likelihood >= 0.80:
        prediction = "Strong AI Writing Signals"

    elif ai_likelihood >= 0.60:
        prediction = "Moderate AI Writing Signals"

    elif ai_likelihood >= 0.40:
        prediction = "Mixed Writing Signals"

    else:
        prediction = "Natural Human Writing Pattern"

    confidence = round(
        max(
            ai_likelihood,
            human_likelihood
        ) * 100,
        2
    )

    # -----------------------------------
    # Final Response
    # -----------------------------------

    return {

        "ai_writing_likelihood":
            round(ai_likelihood * 100, 2),

        "human_writing_likelihood":
            round(human_likelihood * 100, 2),

        "prediction":
            prediction,

        "confidence":
            confidence,

        "sentence_count":
            sentence_count,

        "word_count":
            word_count,

        "average_sentence_length":
            round(avg_sentence_length, 2),

        "reading_ease":
            reading_ease,

        "grade_level":
            grade_level,

        "lexical_diversity":
            lexical_diversity,

        "repetition_score":
            repetition_score,

        "formal_word_matches":
            formal_count,

        "ai_pattern_matches":
            ai_pattern_count,

        "transition_word_matches":
            transition_count,

        "long_word_ratio":
            round(long_word_ratio * 100, 2),

        "perplexity_indicator":
            perplexity_indicator,

        "analysis_breakdown": {

            "structure_score":
                round(structure_score * 100, 2),

            "vocabulary_score":
                round(vocabulary_score * 100, 2),

            "readability_score":
                round(readability_score * 100, 2),

            "uniformity_score":
                round(uniformity_score * 100, 2),

            "pattern_score":
                round(pattern_score * 100, 2),
        },

        "disclaimer":
            (
                "Experimental heuristic analysis "
                "using linguistic pattern recognition "
                "and soft computing techniques. "
                "Results may not be fully accurate."
            )
    }