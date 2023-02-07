import { combineReducers } from "redux";
import { allCarsListReduxer } from "./reduxer/allCarsList";
import { authReducer } from "./reduxer/auth";
import { carQueryReducer } from "./reduxer/carQuery";
import { carsReducer } from "./reduxer/cars";
import { carsFlatListReduxer } from "./reduxer/carsFlatList";
import { imageDetalisReducer } from "./reduxer/imageDetalis";
import { carsLikeReducer } from "./reduxer/like";
import { carsMyAnonsReduxer } from "./reduxer/myAnons";
import { videoReduxer } from "./reduxer/video";

const RootReducer = combineReducers({
    auth:authReducer,
    cars:carsReducer,
    like:carsLikeReducer,
    carFlatList:carsFlatListReduxer,
    myAnons:carsMyAnonsReduxer,
    allCars:allCarsListReduxer,
    imageDetalis:imageDetalisReducer,
    video:videoReduxer,
    query:carQueryReducer,
});


export default RootReducer;