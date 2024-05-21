import spacy
from textblob import TextBlob
from sentimentAnalysis import sentimentAnalysisWithRoberta

def getAspects(sentences):
    nlp = spacy.load("en_core_web_sm")
    aspects = []
    for sentence in sentences:
        doc = nlp(sentence)
        descriptive_term = ''
        target = ''
        for token in doc:
            if token.dep_ == 'nsubj' and token.pos_ == 'NOUN':
                target = token.text
            if token.pos_ == 'ADJ':
                prepend = ''
                for child in token.children:
                    if child.pos_ != 'ADV':
                        continue
                    prepend += child.text + ' '
                descriptive_term = prepend + token.text
        aspects.append({'aspect': target,
                        'description': descriptive_term})
    for aspect in aspects:
        aspect['sentiment'] = TextBlob(aspect['description']).sentiment
        # aspect['sentiment'] = sentimentAnalysisWithRoberta(aspect['description'])
    return aspects


if __name__ == "__main__":
    # sent = ['food is good but service is far worst' , "the service is good but parking facility is too cocky" ]
    # aspects = getAspects(sent)
    # print(aspects)
    ex = 'food is good but service is far worst'
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(ex)
    print(doc)
    sentiment = sentimentAnalysisWithRoberta(ex)
    for token in doc :
        print(token.pos_ , token.dep_)

    print(sentiment)