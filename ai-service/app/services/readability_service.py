import textstat

def analyze_readability(text: str):
    return {
        "flesch_reading_ease": round(
            textstat.flesch_reading_ease(text),
            2
        ),
        "flesch_kincaid_grade": round(
            textstat.flesch_kincaid_grade(text),
            2
        ),
        "gunning_fog": round(
            textstat.gunning_fog(text),
            2
        ),
        "smog_index": round(
            textstat.smog_index(text),
            2
        ),
        "automated_readability_index": round(
            textstat.automated_readability_index(text),
            2
        ),
        "coleman_liau_index": round(
            textstat.coleman_liau_index(text),
            2
        ),
        "sentence_count": textstat.sentence_count(text),
        "word_count": textstat.lexicon_count(text),
        "difficult_words": textstat.difficult_words(text),
    }