import { actionCars } from "../../utils/constant";

const initialState = {
    data:[],
    total:0,
    loading: false,
    firstLoading:true,
    viewData:[],
    showLoading:false,
};
export const carQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "QUERY_LIST":
      return {
        ...state,
        data:action.payload,
        loading: false,
      };
    case "QUERY_LIST_LOADING":
      return {
        ...state,
        ...action.payload
      };
  }
  return state;
};
