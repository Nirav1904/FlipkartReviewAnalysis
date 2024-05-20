import express, { json } from "express";
import cors from "cors";
import {
  getSentences,
  getWords,
  getParagraph,
  getCharactersPerWord,
  getCharactersWithoutSpaces,
  getCharactersWithSpaces,
  getWordsPerSentences,
  getWordFreq,
  POSTagging,
} from "./textAnalyzerFunctions.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use();

var text;
var textData = {};

app.get("/", (req, res) => {
  res.send("From node.js Home page");
});
app.post("/postText", (req, res) => {
  text = req.body.data;
  res.send("Text received!!!");
});

app.get("/textOutput", (req, res) => {
  textData = {
    text: text,
    Sentences: getSentences(text),
    Paragraphs: getParagraph(text),
    Words: getWords(text),
    Characters_including_spaces: getCharactersWithSpaces(text),
    Characters_excluding_spaces: getCharactersWithoutSpaces(text),

    Words_per_sentence: getWordsPerSentences(text),
    Characters_per_word: getCharactersPerWord(text),
    freq: getWordFreq(text),
    posTags: POSTagging(text),
  };
  console.log(textData.freq);
  res.send(textData);
});

app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});
