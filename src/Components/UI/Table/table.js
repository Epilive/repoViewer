import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./table.css";

function ForkTable(props) {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     currentPage: 1,
  //     nameInput: "",
  //     ownerInput: "",
  //     ratingInput: "",
  //     linkInput: "",
  //     addedRepos: [],
  //   };
  const myStorage = window.localStorage;
  if (myStorage.getItem("repos") == null) {
    myStorage.setItem("repos", JSON.stringify(new Array(0)));
    console.log(myStorage.getItem("repos"));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [nameInput, setNameInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [addedRepos, setAddedRepos] = useState(
    JSON.parse(myStorage.getItem("repos"))
  );

  // const handleClick = (pageNum) => {
  //   return () => {
  //     this.setState({ currentPage: pageNum }, () => {
  //       this.handleSubmit(this.state.currentPage);
  //     });
  //   };
  // };

  const handleClick = (pageNum) => {
    return () => {
      setCurrentPage(pageNum);
    };
  };

  useEffect(() => {
    handleSubmit(currentPage);
  }, [currentPage]);

  const handleSubmit = (pageNum) => {
    let userName = props.data.tableData[0].owner.login;
    props.handleSubmit(userName, pageNum);
  };

  // const handleAddRepoClick = (event) => {
  //   console.log(addedRepos);
  //   let [addedReposCopy] = [addedRepos];
  //   addedReposCopy.push({
  //     name: nameInput,
  //     owner: ownerInput,
  //     rating: ratingInput,
  //     link: linkInput,
  //   });

  //   myStorage.setItem("repos", addedReposCopy);

  //   setAddedRepos(myStorage.getItem("repos"));
  // };

  const handleAddRepoClick = (event) => {
    let [addedReposCopy] = [JSON.parse(myStorage.getItem("repos"))];
    addedReposCopy.push({
      name: nameInput,
      owner: ownerInput,
      rating: ratingInput,
      link: linkInput,
    });

    myStorage.setItem("repos", JSON.stringify(addedReposCopy));
    setAddedRepos(JSON.parse(myStorage.getItem("repos")));
  };

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleOwnerChange = (event) => {
    setOwnerInput(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingInput(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLinkInput(event.target.value);
  };

  const { isLoaded, data } = props;

  const { first, last, next, prev } = data.pageData;

  return (
    <div className="table-wrapper">
      <div className="head-row">
        <div className="table-cell-name">Repository Name</div>
        <div className="table-cell-owner">Owner</div>
        <div className="table-cell-rating">Rating</div>
        <div className="table-cell-link">Link</div>
      </div>

      <div className="input-row">
        <div className="table-cell-name">
          <button className="add-button" onClick={handleAddRepoClick}>
            +
          </button>
          <input
            className="table-input"
            type="text"
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="table-cell-owner">
          <input
            className="table-input"
            type="text"
            onChange={handleOwnerChange}
          ></input>
        </div>
        <div className="table-cell-rating">
          <input
            className="table-input"
            type="text"
            onChange={handleRatingChange}
          ></input>
        </div>
        <div className="table-cell-link">
          <input
            className="table-input"
            type="text"
            onChange={handleLinkChange}
          ></input>
        </div>
      </div>

      {!!addedRepos.length &&
        addedRepos.map((it) => (
          <div key={it.id} className="row">
            <div className="table-cell-name">{it.name}</div>
            <div className="table-cell-owner">{it.owner}</div>
            <div className="table-cell-rating">{it.rating}</div>
            <div className="table-cell-link">
              <a href={it.link}>Link</a>
            </div>
          </div>
        ))}

      {isLoaded
        ? data.tableData.map((it) => (
            <div key={it.id} className="row">
              <div className="table-cell-name">{it.name}</div>
              <div className="table-cell-owner">{it.owner.login}</div>
              <div className="table-cell-rating">{it.stargazers_count}</div>
              <div className="table-cell-link">
                <a href={it.html_url}>Link</a>
              </div>
            </div>
          ))
        : null}

      {isLoaded && (
        <div className="table-pagination">
          {!!first && (
            <div className="button-wrapper">
              <button onClick={handleClick(first)}>{first}</button>
              <span>...</span>
              <button onClick={handleClick(currentPage - 1)}>{prev}</button>
            </div>
          )}

          <button className="current-page">{currentPage}</button>

          {!!last && (
            <div className="button-wrapper">
              <button onClick={handleClick(currentPage + 1)}>{next}</button>
              <span>...</span>
              <button onClick={handleClick(last)}>{last}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { ForkTable };
