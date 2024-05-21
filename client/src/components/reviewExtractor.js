import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./reviewExtractor.scss";
import { FormInput } from "./forms";
import axios from "axios";
import WordCloud from "./wordcloud";
import Charts from "./Chart";

function ReviewExtractor() {
  const [productURL, setProductURL] = useState("");
  const [positiveAspects, setPositiveAspects] = useState([]);
  const [negativeAspects, setNegativeAspects] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [genderDataFreq, setGenderDataFreq] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setGenderDataFreq(getFrequency(genderData));
    console.log(positiveAspects);
    console.log(negativeAspects);
  }, [positiveAspects, negativeAspects, genderData]);

  async function submitData(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/getReviews", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          productURL: productURL,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNegativeAspects(res.data["negative"]["negAspects"]);
        setPositiveAspects(res.data["positive"]["posAspects"]);
        setGenderData(res.data["MostRecent"]["gender"]);
        setReviews(res.data["MostRecent"]["review"]);
      })

      .catch((err) => console.log(err));
  }
  function setDefault() {
    setNegativeAspects([]);
    setPositiveAspects([]);
    setGenderData([]);
  }

  const getFrequency = (array) => {
    const map = {};
    array.forEach((item) => {
      if (map[item]) {
        map[item]++;
      } else {
        map[item] = 1;
      }
    });
    return map;
  };

  return (
    <div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>

      <div className="formDIV">
        <form
          method="POST"
          id="webForm"
          onSubmit={(e) => {
            submitData(e);
          }}
        >
          <FormInput
            placeholder="Enter Flipkart Product URL"
            setProductURL={setProductURL}
            setDefault={setDefault}
            name="productURL"
          />

          <button
            type="submit"
            className="btn btn-primary mt-0 mb-5 submitButton"
          >
            submit
          </button>
        </form>
      </div>
      <div className="AnalysisContainer">
        <div className="genderChart">
          {genderData.length &&
            ((<h1>Gender Data</h1>),
            (
              <Charts
                male={genderDataFreq["0"]}
                female={genderDataFreq["1"]}
                unknowns={genderDataFreq["2"]}
              />
            ))}
        </div>
        <div className="wordCloud">
          {positiveAspects.length &&
            ((<h1>Positive Aspects</h1>),
            (<WordCloud words={positiveAspects} />))}
        </div>
        <div className="wordCloud">
          {negativeAspects.length &&
            ((<h1>Negative Aspects</h1>),
            (<WordCloud words={negativeAspects} />))}
        </div>
        <div className="reviews">
          {reviews.length && (
            <ul>
              {reviews.map((review) => {
                <li className="rv">review</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default ReviewExtractor;
