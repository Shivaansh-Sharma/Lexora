import spacy

nlp = spacy.load("en_core_web_sm")

def analyze_entities(text: str):
    doc = nlp(text)

    entities = []

    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_,
        })

    return entities