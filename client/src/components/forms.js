import React from "react";
import "./forms.scss";

function FormInput(props) {
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <div className="formInput">
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e) => {
          props.setProductURL(e.target.value);
          if (e.target.value === "") {
            props.setDefault();
          }
        }}
      />
    </div>
  );
}

function FormSelect(props) {
  return (
    <div className="formSelect" style={{ color: "white" }}>
      <label htmlFor="webSiteFrom">Select BaseWeb</label>
      <select
        name={props.name}
        id="typesOfReview"
        onChange={(e) => props.setReviewType(e.target.value)}
      >
        <option value="Most Recent">Most Recent</option>
        <option value="negative">Negative</option>
        <option value="positive">Positive</option>
      </select>
    </div>
  );
}

export { FormInput, FormSelect };
