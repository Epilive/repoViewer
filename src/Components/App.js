import React, { useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import parse from "parse-link-header";

import { InputField } from "./UI/Input";
import { ForkTable } from "./UI/Table";
import * as actions from "../redux/actions";

function App(props) {
  const { isLoaded, tableData, parsedHeader, fetchRepos } = props;

  const handleSubmit = (userName, pageNum) => {
    fetchRepos(userName, pageNum);
    console.log("HANDLE SUBMIT");
  };

  return (
    <div className="App">
      <InputField handleSubmit={handleSubmit} />
      {tableData && (
        <ForkTable
          handleSubmit={handleSubmit}
          data={{
            tableData,
            pageData: parsedHeader,
          }}
          isLoaded={isLoaded}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoaded: state.isLoaded,
  isLoading: state.isLoading,
  tableData: state.tableData,
  parsedHeader: state.parsedHeader,
});

const mapDispatchToProps = {
  setIsLoaded: actions.setIsLoaded,
  setTableData: actions.setTableData,
  setParsedHeader: actions.setParsedHeader,
  fetchRepos: actions.fetchRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
