import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction import DictVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB

df_names = pd.read_csv('./datasets/CombinedGender.csv')

# Features
Xfeatures = df_names['name']
cv = CountVectorizer()
X = cv.fit_transform(Xfeatures)
y = df_names['sex']

xtrain, xtest, ytrain, ytest = train_test_split(
    X, y, test_size=0.20, random_state=42)

clf = MultinomialNB()
# clf = DecisionTreeClassifier(random_state=0)
clf.fit(xtrain, ytrain)
clf.score(xtest, ytest)


def getGender(Names):
    vect = cv.transform(Names).toarray()
    res = clf.predict(vect)
    res = res.tolist()
    for i in range(len(Names)):
        if (Names[i] == "") or (Names[i] == "Flipkart Customer"):
            res[i] = 2
    return res


if __name__ == "__main__":
    print("accuracy of model : ", clf.score(xtest, ytest) * 100)
    sample_name3 = ["neha", "Nasha", "rupam gupta"
        , "", "Risheet",
                    "", "", "Xia", "Flipkart Customer", "Xianliang"]

    res = getGender(sample_name3)
    print(res)
    print(type(res))
