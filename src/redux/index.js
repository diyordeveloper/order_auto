import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./root.reduxer";

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(thunk))
//   )
const store = createStore(reducer, applyMiddleware(thunk));

export default store;