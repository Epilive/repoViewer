import {
  SET_IS_LOADED,
  SET_TABLE_DATA,
  SET_PARSED_HEADER,
  FETCH_REPOS_BEGIN,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from "./types";

import parse from "parse-link-header";

export const setIsLoaded = (isLoaded) => ({
  type: SET_IS_LOADED,
  payload: isLoaded,
});

export const setTableData = (tableData) => ({
  type: SET_TABLE_DATA,
  payload: tableData,
});

export const setParsedHeader = (parsedHeader) => ({
  type: SET_PARSED_HEADER,
  payload: parsedHeader,
});

export const fetchReposBegin = () => ({ type: FETCH_REPOS_BEGIN });

export const fetchReposSuccess = (tableData) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: tableData,
});

export const fetchReposFailure = (error) => ({
  type: FETCH_REPOS_FAILURE,
  payload: error,
});

// export const fetchRepos = (userName, pageNum) => {};

export function fetchRepos(userName, pageNum) {
  let url = `https://api.github.com/users/${userName}/repos?per_page=10&page=${pageNum}`;
  console.log("FETCH REPOS");

  return (dispatch) => {
    dispatch(fetchReposBegin());
    console.log("FIRST DISPATCH");
    return fetch(url)
      .then((res) => {
        let headers = res.headers.get("link");
        if (headers !== null) {
          let { first, last, next, prev } = parse(headers);
          dispatch(
            setParsedHeader({
              first: +first?.page,
              last: +last?.page,
              next: +next?.page,
              prev: +prev?.page,
            })
          );
        }
        return res.json();
      })
      .then(
        (result) => {
          if (result.length === 0) {
            dispatch(
              fetchReposFailure(
                "Wrong username, or this user doesn't have any public repos"
              )
            );
            alert("Wrong username, or this user doesn't have any public repos");
          } else {
            dispatch(fetchReposSuccess(result));
          }
        },
        (error) => {
          dispatch(fetchReposFailure(error));
        }
      );
  };
}
