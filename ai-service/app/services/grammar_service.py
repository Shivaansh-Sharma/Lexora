import language_tool_python
import textstat
import re

tool = None

def get_tool():

    global tool

    if tool is None:

        tool = language_tool_python.LanguageTool(
            "en-US"
        )

    return tool

def analyze_grammar(
    text: str
):

    matches =
        get_tool().check(text)

    corrected_text =
        language_tool_python.utils.correct(
            text,
            matches
        )

    issues = []

    grammar_count = 0
    spelling_count = 0

    for match in matches[:20]:

        issue_type =
            "grammar"

        if (
            "spelling"
            in match.ruleIssueType.lower()
        ):

            issue_type =
                "spelling"

            spelling_count += 1

        else:

            grammar_count += 1

        issues.append({

            "type":
                issue_type,

            "original":
                text[
                    match.offset:
                    match.offset + match.errorLength
                ],

            "suggestion":
                match.replacements[0]
                if match.replacements
                else ""
        })

    sentences = re.split(
        r"[.!?]+",
        text
    )

    sentences = [
        s.strip()
        for s in sentences
        if s.strip()
    ]

    word_count =
        len(text.split())

    average_sentence_length = (

        round(
            word_count /
            len(sentences),
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

        writing_level =
            "Easy"

    elif reading_ease >= 60:

        writing_level =
            "Intermediate"

    else:

        writing_level =
            "Advanced"

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
            issues,

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