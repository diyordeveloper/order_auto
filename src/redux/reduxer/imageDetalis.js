import { actionCarLike } from "../../utils/constant";

const initialState = {
    images:[],
    type: "Photos",
    viewData:[],
    showLoading:false,
};
export const imageDetalisReducer = (state = initialState, action) => {

    switch (action.type) {
    case "IMAGE_DETALIS":
      return {
        ...state,
        images:action.payload.images,
        loading: false,
      };
    case "IMAGE_TYPE":
      return {
        ...state,
        type: action.payload.type,
      };
  }
  return state;
};
