import React, { useEffect, useState } from "react";
import "./textForm.scss";
import axios from "axios";
import Navbar from "./navbar";

function TextForm() {
  const [textData, setTextData] = useState({
    text: "",
    Sentences: "",
    Paragraphs: "",
    Words: "",
    Characters_including_spaces: "",
    Characters_excluding_spaces: "",

    Words_per_sentence: "",
    Characters_per_word: "",
  });
  const [wordFreq, setWordFreq] = useState({
    freq: {},
  });
  const [posTags, setPosTags] = useState({
    Tags: {},
  });

  const showFreqOfWords = () => {
    return (
      <div>
        <h3 className="freq-Header text-center">Freq Of Words</h3>
        <ul className="list-group freq-words mt-0">
          {Object.entries(wordFreq.freq).map(([key, val], i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50 hover-overlay "
            >
              {key}
              <span className="badge badge-primary badge-pill text-primary">
                {val}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const showPosTagging = () => {
    return (
      <div>
        <h3 className="PosTagHeader text-center">PosTagging</h3>
        <ul className="list-group posWords mt-0">
          {Object.entries(posTags.Tags).map(([key, val], i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50 hover-overlay "
            >
              {key}
              <span className="badge badge-primary badge-pill text-primary">
                {val}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    showFreqOfWords();
    showPosTagging();
  }, [wordFreq, posTags]);

  // const BASEURL = "http://localhost:4000";
  async function submit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/postText", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: textData.text,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  }

  async function getData(e) {
    await axios
      .get("http://localhost:4000/textOutput")
      .then((res) => {
        setTextData(res.data);
        setWordFreq({ freq: res.data.freq });
        setPosTags({ Tags: res.data.posTags });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function handleTextChange(e) {
    setTextData({ text: e.target.value });
    setWordFreq({
      freq: {},
    });
    setPosTags({
      Tags: {},
    });
  }

  //   console.log(wordFreq);
  return (
    <div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
      <div className="form-group">
        <textarea
          name="textEntered"
          value={textData.text}
          id="formGroupExampleInput"
          cols="30"
          rows="10"
          className="form-control textInput mx-auto w-75 my-4"
          onChange={(e) => handleTextChange(e)}
          form="txtform"
        ></textarea>
        <form
          method="POST"
          id="txtform"
          onSubmit={function (e) {
            submit(e);
            getData(e);
          }}
        >
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary mt-0 mb-5 submitButton"
            >
              submit
            </button>
          </div>
        </form>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Sentences
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Sentences}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Paragraphs
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Paragraphs}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Words
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Words}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Characters_including_spaces
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Characters_including_spaces}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Characters_excluding_spaces
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Characters_excluding_spaces}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Words_per_sentence
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Words_per_sentence}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Characters_per_word
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Characters_per_word}
          </span>
        </li>
      </ul>

      {Object.keys(wordFreq["freq"]).length && <div>{showFreqOfWords()}</div>}

      {Object.keys(posTags["Tags"]).length && <div>{showPosTagging()}</div>}
    </div>
  );
}

export default TextForm;
