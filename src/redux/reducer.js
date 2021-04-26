import {
  SET_IS_LOADED,
  SET_TABLE_DATA,
  SET_PARSED_HEADER,
  FETCH_REPOS_BEGIN,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from "./types";

const initialState = {
  isLoading: false,
  isLoaded: false,
  tableData: null,
  parsedHeader: null,
  error: null,
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADED:
      return { ...state, isLoaded: action.payload };
    case SET_TABLE_DATA:
      return { ...state, tableData: action.payload };
    case SET_PARSED_HEADER:
      return { ...state, parsedHeader: action.payload };
    case FETCH_REPOS_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        tableData: action.payload,
      };
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload,
        tableData: null,
      };
    default:
      return state;
  }
};
