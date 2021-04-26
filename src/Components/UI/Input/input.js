import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./input.css";

function InputField(props) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event) => {
    handleSubmit();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let userName = inputValue;
    let firstPage = 1;

    props.handleSubmit(userName, firstPage);
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleClick}></button>
    </div>
  );
}

export { InputField };
