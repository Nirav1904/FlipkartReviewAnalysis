import natural from "natural";
import stopword from "stopword";
import postagger from "wink-pos-tagger";

const getSentences = (text) => {
  const regEx = /[^\.!\?]+[\.!\?]+/g;
  const sent = text.match(regEx);
  if (sent === null) {
    if (getCharactersWithoutSpaces(text) > 0) {
      return 1;
    }
    return 0;
  }
  return sent.length;
};

const getParagraph = (text) => {
  const para = text.replace(/\n$/gm, "").split(/\n/);
  return para.length;
};

const getWords = (text) => {
  return text.split(" ").filter(function (num) {
    return num != "";
  }).length;
};

const getCharactersWithSpaces = (text) => {
  const count = text.length;
  return count;
};

const getCharactersWithoutSpaces = (text) => {
  const count = text.length;

  const spaces = text.split(" ").length - 1;
  return count - spaces;
};

const getWordsPerSentences = (text) => {
  const wd = getWords(text);
  const sent = getSentences(text);
  if (sent === 0) {
    return wd;
  }
  var numb = wd / sent;
  const rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
  return rounded;
};
const getCharactersPerWord = (text) => {
  const ch = getCharactersWithoutSpaces(text);
  const wd = getWords(text);
  if (wd === 0) {
    return ch;
  }
  var numb = ch / wd;
  const rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
  return rounded;
};

//JavaScript code
function getWordFreq(str) {
  //Edge case: an empty array
  var output = {};
  if (str.length === 0) {
    console.log("empty string");
    return {};
  }

  var strArr = str.split(" ");
  strArr = stopword.removeStopwords(strArr);
  //A loop
  for (var i = 0; i < strArr.length; i++) {
    var word = strArr[i];
    if (output[word] === undefined) {
      output[word] = 1;
    } else {
      output[word] += 1;
    }
  }
  for (var property in output) {
    if (output[property] === 1) {
      delete output[property];
    }
  }
  return output;
}

function POSTagging(text) {
  var tagger = postagger();
  const words = stopword.removeStopwords(text.split(" "));
  const posTags = {};
  words.forEach((element) => {
    const tags = tagger.tagSentence(element);
    tags.forEach((tag) => {
      if (tag.value != tag.pos && tag.pos != undefined) {
        posTags[tag.value] = tag.pos;
      }
    });
  });
  return posTags;
}

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
console.log(getWordFreq(text));
export {
  getSentences,
  getWords,
  getParagraph,
  getCharactersPerWord,
  getCharactersWithoutSpaces,
  getCharactersWithSpaces,
  getWordsPerSentences,
  getWordFreq,
  POSTagging,
};
