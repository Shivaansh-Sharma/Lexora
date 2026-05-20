from transformers import pipeline
import textstat
import re
import difflib

grammar_corrector = pipeline(
    "text2text-generation",
    model="pszemraj/flan-t5-large-grammar-synthesis"
)

def analyze_grammar(text: str):

    result = grammar_corrector(
        f"grammar: {text}",
        max_length=512
    )

    corrected_text = result[0][
        "generated_text"
    ].replace("grammar:", "").strip()

    original_words = text.split()
    corrected_words = corrected_text.split()

    matcher = difflib.SequenceMatcher(
        None,
        original_words,
        corrected_words
    )

    issues = []

    grammar_count = 0
    spelling_count = 0

    grammar_keywords = [
        "were",
        "was",
        "is",
        "are",
        "to",
        "too",
        "their",
        "there",
        "they're",
        "respects",
        "finishes",
        "left",
    ]

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():

        if tag != "equal":

            original_fragment = " ".join(
                original_words[i1:i2]
            )

            corrected_fragment = " ".join(
                corrected_words[j1:j2]
            )

            if (
                original_fragment.lower()
                in grammar_keywords
                or len(original_fragment.split()) > 1
            ):

                issue_type = "grammar"
                grammar_count += 1

            else:

                issue_type = "spelling"
                spelling_count += 1

            issues.append({
                "type": issue_type,

                "original":
                    original_fragment,

                "suggestion":
                    corrected_fragment
            })

    sentences = re.split(r"[.!?]+", text)

    sentences = [
        s.strip()
        for s in sentences
        if s.strip()
    ]

    word_count = len(original_words)

    average_sentence_length = (
        round(
            word_count / len(sentences),
            2
        )
        if sentences
        else 0
    )

    reading_ease = (
        textstat.flesch_reading_ease(text)
    )

    grade_level = (
        textstat.flesch_kincaid_grade(text)
    )

    passive_voice_estimate = (
        round(
            (
                text.lower().count("was")
                + text.lower().count("were")
                + text.lower().count("been")
            )
            / max(len(sentences), 1),
            2
        )
    )

    if reading_ease >= 80:
        writing_level = "Easy"

    elif reading_ease >= 60:
        writing_level = "Intermediate"

    else:
        writing_level = "Advanced"

    tone = "Neutral"

    if average_sentence_length > 20:
        tone = "Formal"

    elif average_sentence_length < 10:
        tone = "Casual"

    return {
        "corrected_text":
            corrected_text,

        "issues_found":
            len(issues),

        "grammar_issues":
            grammar_count,

        "spelling_issues":
            spelling_count,

        "issues":
            issues[:20],

        "average_sentence_length":
            average_sentence_length,

        "word_count":
            word_count,

        "writing_level":
            writing_level,

        "tone":
            tone,

        "passive_voice_estimate":
            passive_voice_estimate,

        "reading_ease":
            round(reading_ease, 2),

        "grade_level":
            round(grade_level, 2),
    }