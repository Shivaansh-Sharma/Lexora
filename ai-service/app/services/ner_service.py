import spacy

nlp = None

def get_nlp():

    global nlp

    if nlp is None:

        nlp = spacy.load(
            "en_core_web_sm"
        )

    return nlp

def analyze_entities(
    text: str
):

    doc = get_nlp()(text)

    entities = []

    for ent in doc.ents:

        entities.append({
            "text": ent.text,
            "label": ent.label_,
        })

    return entities