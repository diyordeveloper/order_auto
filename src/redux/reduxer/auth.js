// import {actionUser} from '../../contants';

import { actionUser } from "../../utils/constant";

const initialState = {
    lang:"ru",
    name:null,
    email:null,
    password:null,
    phone:null,
    region:null,
    roles:null,
    id:null,
    auth:false,
    token:null,
    loggedIn: true,
    splash: false,
    loading: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SMS_SEND":
      return {
          ...state,
          ...action.payload,
          loggedIn: false,
          loading: false,
          // auth: true,
      };
    case actionUser.ACTION_REGISTER:
      return {
        ...state,
        ...action.payload,
        loggedIn: false,
        loading: false,
        auth: true,
      };
    case actionUser.ACTION_REGISTER_LOADING:
      return {
        loading: false,
        auth: false,
        loggedIn: false,
      };
    case actionUser.ACTION_REGISTER_LOADINGOTHER:
      return {
        loading: true,
      };
    case actionUser.ACTION_REGISTER_SPLASH:
      return {
        ...state,
        splash: true,
        loggedIn: false,
      };
      case actionUser.ACTION_AUTH_LANG:
        return {
          ...state,
          lang: action.payload,
        };
      case "lOGOUT":
        return {
          ...state,
          name:null,
          email:null,
          password:null,
          phone:null,
          id:null,
          auth:false,
          token:null,
      };
  }
  return state;
};
