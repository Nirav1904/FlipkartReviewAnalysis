from time import sleep
from random import random
import pandas as pd
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import urllib.parse as urlparse
from urllib.parse import parse_qs
from prettytable import PrettyTable
import math
import tqdm


sampleURL = "https://www.amazon.in/HP-Micro-Edge-Anti-Glare-15s-fq5112TU/dp/B0B6F6HN37/ref=pd_rhf_d_gw_s_pd_sbs_rvi_sccl_1_3/262-1108095-8060150?pd_rd_w=MXxSQ&content-id=amzn1.sym.0d5f32d5-d8bf-40fc-9298-1b7e0b0b5c8d&pf_rd_p=0d5f32d5-d8bf-40fc-9298-1b7e0b0b5c8d&pf_rd_r=9PMZGY4KZ8NMKA95EQ6N&pd_rd_wg=bRDPK&pd_rd_r=054cd999-eff2-4dce-85ce-c40e0742667a&pd_rd_i=B0B6F6HN37&th=1"
reviewURL = sampleURL.replace("dp", "product-reviews")

dataset = {"reviewID": [], "person": [], "reviewHeader": [],
           "review": [], "rating": []}

rID = 1
pg = 1


def getSource(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")
    return soup


url = "https://www.amazon.in/OnePlus-Nord-Jade-128GB-Storage/dp/B0B3CPQ5PF/ref=cm_cr_getr_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&th=1"


def ReviewExtract(productURL):
    reviewURL = productURL.replace('dp', 'product-reviews')
    rID = 1
    for i in tqdm.tqdm(range(1, 10)):
        # parsed = urlparse.urlparse(reviewURL)
        # pid = parse_qs(parsed.query)['pid'][0]
        URL = f"{reviewURL}&pageNumber={i}&sortBy=recent"
        print(URL)

        soup = getSource(URL)

        reviews = soup.findAll("div", {"data-hook": "review"})
        print(len(reviews))
        for review in reviews:
            reviewBody = review.find(
                "span", {"data-hook": "review-body"}).text.strip()
            print(rID, " : ", reviewBody)
            rID += 1


productURL = "https://www.amazon.in/OnePlus-Nord-Jade-128GB-Storage/product-reviews/B0B3CPQ5PF/ref=cm_cr_getr_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&th=1&pageNumber=7&sortBy=recent"
page = requests.get(productURL)
soup = BeautifulSoup(page.text, "html.parser")


reviews = soup.findAll("div", {"class": "review"})
print(reviews)
rID = 1
for review in reviews:
    reviewBody = review.find("span", {"data-hook": "review"}).text.strip()
    print(rID, " : ", reviewBody)
