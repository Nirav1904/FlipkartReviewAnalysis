from flask import Flask, jsonify, request, json, render_template
from flipkartReviewExtractor import extractReview
from flask_cors import CORS, cross_origin
from genderClassifiers import getGender
from getAspects import getAspects

app = Flask(__name__)
CORS(app)
CORS(app, support_credentials=True)


class ReviewData():
    dataset = {"reviewID": [], "person": [], "reviewHeader": [],
               "review": [], "rating": []}
    pURL = ""
    baseWeb = ""
    a = "risheet"


@app.route("/hello", methods=["GET"])
@cross_origin(supports_credentials=True)
def hello():
    a = ReviewData.a
    return f"hello {a}"


def getPositiveReviews(productURL):
    return extractReview(productURL, 'positive')


def getNegativeReviews(productURL):
    return extractReview(productURL, 'negative')


def getMostRecentReviews(productURL):
    return extractReview(productURL)


@app.route('/getReviews', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def postProductReview():
    req = request.json
    print(req)
    ReviewData.pURL = req['data']['productURL']
    productURL = ReviewData.pURL

    # # if productURL comes invalid from FrontEnd :::::Happened a lot of timeweb
    # # productURL = productURL[1:len(productURL) - 2]

    positiveData = getPositiveReviews(productURL)
    negativeData = getNegativeReviews(productURL)
    mostRecentData = getMostRecentReviews(productURL)

    gender = getGender(mostRecentData['person'])
    mostRecentData['gender'] = list(gender)

    aspects = getAspects(positiveData['review'])
    positiveData['posAspects'] = list(aspects)

    aspects2 = getAspects(negativeData['review'])
    negativeData['negAspects'] = list(aspects2)

    return jsonify({
        'positive': positiveData,
        'negative': negativeData,
        'MostRecent': mostRecentData,
    })


if __name__ == '__main__':
    app.run(port=5000, debug=True)
