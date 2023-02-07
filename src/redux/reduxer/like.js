import { actionCarLike } from "../../utils/constant";

const initialState = {
    data:[],
    loading: true,
    viewData:[],
    showLoading:false,
};
export const carsLikeReducer = (state = initialState, action) => {

    switch (action.type) {
    case actionCarLike.ACTION_CAR_LIKE:
      return {
        ...state,
        data:action.payload,
        loading: false,
      };
    case actionCarLike.ACTION_CAR_LOADING_LIKE:
      return {
        ...state,
        loading: true,
      };
    case actionCarLike.ACTION_CAR_SHOW_LIKE:
      return {
        ...state,
        viewData: action.payload,
        showLoading: false,
      };
    case actionCarLike.ACTION_CAR_SHOW_STATUS_LIKE:
    return {
      ...state,
      loading: true,
      // loggedIn: false,
    };
  }
  return state;
};
