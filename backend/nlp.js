import natural from "natural";
import fs from "fs";
import stopword from "stopword";
import postagger from "wink-pos-tagger";

var text;
text = fs.readFileSync("./text.txt", "utf8");

var tokenizer = new natural.WordTokenizer();

var TOKENS = tokenizer.tokenize(text);
// console.log(TOKENS);
// console.log(natural.PorterStemmer.tokenizeAndStem("friends"));

const temp = stopword.removeStopwords(text.split(" "));
// console.log(TOKENS);
// console.log(temp);

var tagger = postagger();

text.split(" ").forEach((element) => {
  const tags = tagger.tagSentence(element);
  tags.forEach((tag) => {
    if (tag.value != tag.pos && tag.pos != undefined) {
      console.log(tag.pos + " : " + tag.value);
    }
  });
});
