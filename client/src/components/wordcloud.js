import React from "react";
import ReactWordcloud from "react-wordcloud";
import "./wordcloud.css";

function WordCloud(props) {
  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const callbacks = {
    getWordColor: (word) => (word.value > 50 ? "blue" : "red"),
    onWordClick: (word) =>
      console.log(
        window.open(
          `https://www.google.com/search?q=${word.text}&safe=strict`,
          "_blank",
          "noreferrer"
        )
      ),
    // onWordMouseOver: (word) => console.log("mouse is on word " + word.text),
    getWordTooltip: (word) =>
      `${word.text} [${word.value > 50 ? "good" : "bad"}]`,
  };

  const options = {
    rotations: 0,
    rotationAngles: [-30, 0],
  };
  const size = [400, 400];

  const words = props.words;
  const wd = words.map((d) => ({
    text: d["aspect"],
    value: randomNumberInRange(1, 50),
    des: d["description"],
  }));

  return (
    <div className="Container">
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        size={size}
        words={wd}
      />
    </div>
  );
}

export default WordCloud;
