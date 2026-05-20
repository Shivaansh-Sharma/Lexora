import requests
import re

from bs4 import BeautifulSoup

from ddgs import DDGS

from difflib import SequenceMatcher


HEADERS = {
    "User-Agent":
    (
        "Mozilla/5.0 "
        "(Windows NT 10.0; Win64; x64)"
    )
}


def clean_text(text: str):

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


def similarity(a: str, b: str):

    return round(
        SequenceMatcher(
            None,
            a.lower(),
            b.lower()
        ).ratio() * 100,
        2
    )


def split_sentences(text: str):

    sentences = re.split(
        r"[.!?]+",
        text
    )

    return [
        s.strip()
        for s in sentences
        if len(s.strip()) > 25
    ]


def fetch_page_content(url: str):

    try:

        response = requests.get(
            url,
            headers=HEADERS,
            timeout=10
        )

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        text = soup.get_text(
            separator=" "
        )

        return clean_text(text)

    except Exception:

        return ""


def detect_internet_plagiarism(
    text: str
):

    sentences = split_sentences(text)

    matched_sources = []

    checked_urls = set()

    all_scores = []

    for sentence in sentences[:5]:

        try:

            words = sentence.split()

            query = " ".join(words[:12])

            with DDGS() as ddgs:

                results = list(
                    ddgs.text(
                        query,
                        max_results=5
                    )
                )

            search_results = [
                r["href"]
                for r in results
                if "href" in r
            ]

        except Exception:
            continue

        for url in search_results:

            if url in checked_urls:
                continue

            checked_urls.add(url)

            page_text = fetch_page_content(
                url
            )

            if not page_text:
                continue

            best_local_score = 0

            best_chunk = ""

            chunks = re.split(
                r"[.!?]+",
                page_text
            )

            for chunk in chunks:

                chunk = chunk.strip()

                if len(chunk) < 30:
                    continue

                local_score = similarity(
                    sentence,
                    chunk
                )

                if local_score > best_local_score:

                    best_local_score = local_score

                    best_chunk = chunk

            score = best_local_score

            all_scores.append(score)

            if score >= 45:

                matched_sources.append({

                    "url": url,

                    "matched_text":
                        sentence,

                    "source_snippet":
                        best_chunk[:300],

                    "similarity_score":
                        score
                })

    if all_scores:

        plagiarism_percentage = round(
            sum(all_scores) /
            len(all_scores),
            2
        )

    else:

        plagiarism_percentage = 0

    plagiarism_risk = "Low"

    if plagiarism_percentage >= 75:
        plagiarism_risk = "High"

    elif plagiarism_percentage >= 45:
        plagiarism_risk = "Moderate"

    return {

        "internet_plagiarism_score":
            round(
                plagiarism_percentage,
                2
            ),

        "plagiarism_risk":
            plagiarism_risk,

        "matched_sources":
            matched_sources
    }