import csv
import re

regExes = []

# Python code to illustrate with()
with open("regExs.txt") as regExFile:
    for line in regExFile.read().splitlines():
        regExes.append(line)

reviews = {}

with open("reviewsExtracted.csv", "r", encoding="utf8") as csvfile:
    csvreader = csv.reader(csvfile)
    line_count = 0
    for row in csvreader:
        if line_count != 0:
            reviews[row[0]] = row[3]
        line_count += 1
print(reviews)

for reg in regExes:
    if re.match(reg, " fuck it bro"):
        print("YES")


for reviewID, review in reviews.items():
    for reg in regExes:
        if re.match(reg, review):
            reviews[reviewID] = "-----"

print(reviews)
