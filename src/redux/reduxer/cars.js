import { actionCars } from "../../utils/constant";

const initialState = {
    data:[],
    total:0,
    loading: false,
    firstLoading:true,
    viewData:[],
    showLoading:false,
};
export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionCars.ACTION_CARS:
      return {
        ...state,
        data:action.payload,
        loading: true,
      };
    case "ACTION_CARS_IMAGE":
      return {
        ...state,
        data:[action.payload, ...state.data],
        loading: true,
      };
    case actionCars.ACTION_CAR_LOADING:
      return {
        ...state,
        loading: false,
        firstLoading:false,
      };
    case actionCars.ACTION_CAR_SHOW:
      return {
        ...state,
        viewData: action.payload,
        showLoading: false,
        // loggedIn: false,
      };
    case actionCars.ACTION_CAR_SHOW_STATUS:
    return {
      ...state,
      showLoading: true,
      // loggedIn: false,
    };
  }
  return state;
};
