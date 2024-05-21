from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)
#
import time


def sentimentAnalysisWithRoberta(ex):
    # Run for Roberta Model
    encoded_text = tokenizer(ex, return_tensors='pt')
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    mx = max(scores[0], scores[1], scores[2])
    sent = ""
    if scores[0] == mx:
        sent = "neg"
    elif scores[1] == mx:
        sent = "neu"
    else:
        sent = "pos"
    polarity = {
        sent: mx
    }
    return polarity


from nltk.sentiment import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()


def sentimentAnalysisWithNLTK(ex):
    res = sia.polarity_scores(ex)
    return res


if __name__ == "__main__":
    ex = "This oatmeal is not good. Its mushy, soft, I don't like it. Quaker Oats is the way to go."
