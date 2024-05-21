from time import sleep
from random import random
import pandas as pd
import requests
import tqdm
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import urllib.parse as urlparse
from urllib.parse import parse_qs
from prettytable import PrettyTable
from math import ceil


# r = requests.get(reviewURL)
# soup = BeautifulSoup(r.content, 'html.parser')
# # print(soup.prettify()[:500])


def getSource(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")
    return soup


# returns List of tags with that name
def findTags(soup, tagName, attributeName, attributeValue):
    tags = soup.findAll(
        str(tagName), {str(attributeName): str(attributeValue)})
    return tags


def getPages(productURL):
    soup1 = getSource(productURL)
    temp = findTags(soup1, "div", "class", "_3UAT2v")
    for i in temp:
        txt = i.find('span').text.strip()
        page = ceil(int(txt.split(" ")[1]) / 10)
        return min(page, 11)




def reviewURLToMostRecent(productURL):
    reviewURL = productURL.replace("/p/", "/product-reviews/")
    reviewURL = reviewURL.replace(
        "&marketplace=FLIPKART", "&aid=overall&certifiedBuyer=false&sortOrder=MOST_RECENT")
    return reviewURL


def reviewURLToNegetive(productURL):
    reviewURL = productURL.replace("/p/", "/product-reviews/")
    reviewURL = reviewURL.replace(
        "marketplace=FLIPKART", "aid=overall&certifiedBuyer=false&sortOrder=NEGATIVE_FIRST")
    return reviewURL


def reviewURLToPositive(productURL):
    reviewURL = productURL.replace("/p/", "/product-reviews/")
    reviewURL = reviewURL.replace(
        "marketplace=FLIPKART", "aid=overall&certifiedBuyer=false&sortOrder=POSITIVE_FIRST")
    return reviewURL


def extractReview(productURL, reviewURLType=None):
    dataset = {"reviewID": [], "person": [], "reviewHeader": [],
               "review": [], "rating": []}
    pages = getPages(productURL)
    if reviewURLType == "positive":
        reviewURL = reviewURLToPositive(productURL)
    elif reviewURLType == "negative":
        reviewURL = reviewURLToNegetive(productURL)
    else:
        reviewURL = reviewURLToMostRecent(productURL)
    rID = 1
    for i in tqdm.tqdm(range(1, pages)):
        parsed = urlparse.urlparse(reviewURL)
        pid = parse_qs(parsed.query)['pid'][0]
        URL = f"{reviewURL}&page={i}"

        soup = getSource(URL)
        rows = findTags(soup, "div", "class", "_2wzgFH")
        # rows = soup.find_all("div", {'class': '_2wzgFH'})
        for row in rows:

            sub_row = row.find_all("div", {"class": "row"})
            person = sub_row[2].find_all(
                'p', {"class": "_2sc7ZR"})[0].text.strip()
            rating = sub_row[0].find('div').text
            reviewHeader = sub_row[0].find('p').text.strip()
            review = sub_row[1].find_all('div')[2].text.strip()

            dataset["reviewID"].append(rID)
            dataset["person"].append(person)
            dataset["reviewHeader"].append(reviewHeader)
            dataset["review"].append(review)
            dataset["rating"].append(rating)
            rID += 1

    # df = pd.DataFrame.from_dict(dataset)
    return dataset


if __name__ == "__main__":

    sampleURL = "https://www.flipkart.com/noymi-3d-rechargeable-100-waterproof-ipx7-electric-shaver-wet-dry-rotary-shavers-men-shaving-razors-trimmer-black/p/itm03a068cb187d5?pid=SHVG42MUZ3UBW7MV&lid=LSTSHVG42MUZ3UBW7MVHVEZVZ&marketplace=FLIPKART&page=1"
    pg = getPages(sampleURL)
    print(type(pg))

# "https://www.flipkart.com/noymi-3d-rechargeable-100-waterproof-ipx7-electric-shaver-wet-dry-rotary-shavers-men-shaving-razors-trimmer-black/p/itm03a068cb187d5?pid=SHVG42MUZ3UBW7MV&lid=LSTSHVG42MUZ3UBW7MVHVEZVZ&aid=overall&certifiedBuyer=false&sortOrder=MOST_RECENT"
