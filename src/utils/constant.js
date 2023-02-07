import React, { memo } from "react";
import {View, Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const consStyle ={
    dis_flexcenter:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    dis_flexAC:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    dis_flexACJBW:{
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        // alignItems:"center"
    },
    marginRL:{
        marginLeft:5,
        marginRight:5,
    }

}

export const actionUser = {
    ACTION_REGISTER: 'ACTION_REGISTER',
    ACTION_LOGIN_USER: 'ACTION_LOGIN_USER',
    ACTION_REGISTER_SPLASH: 'ACTION_REGISTER_SPLASH',
    ACTION_REGISTER_LOADING: 'ACTION_REGISTER_LOADING',
    ACTION_REGISTER_LOADINGOTHER: 'ACTION_REGISTER_LOADINGOTHER',
    ACTION_AUTH_LANG: 'ACTION_AUTH_LANG',
};
  export const actionCars = {
    ACTION_CARS: 'ACTION_CARS',
    ACTION_CAR_SHOW: 'ACTION_CAR_SHOW',
    ACTION_CAR_LOADING: 'ACTION_CAR_LOADING',
    ACTION_CAR_SHOW_STATUS: 'ACTION_CAR_SHOW_STATUS',
    // ACTION_REGISTER_LOADING: 'ACTION_REGISTER_LOADING',
  };

  export const actionCarLike = {
    ACTION_CAR_LIKE: 'ACTION_CAR_LIKE',
    ACTION_CAR_SHOW_LIKE: 'ACTION_CAR_SHOW_LIKE',
    ACTION_CAR_LOADING_LIKE: 'ACTION_CAR_LOADING_LIKE',
    ACTION_CAR_SHOW_STATUS_LIKE: 'ACTION_CAR_SHOW_STATUS_LIKE',
    // ACTION_REGISTER_LOADING: 'ACTION_REGISTER_LOADING',
  };

  export function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  export function phoneFormat(v) {
    let r = v?.replace(/\D/g, '');
    if (r?.length > 5) {
      r = r?.replace(/^(\d\d)(\d{3})(\d{0,4}).*/, '$1 $2 $3');
      return r;
    } else if (r?.length > 2) {
      r = r?.replace(/^(\d\d)(\d{0,2})/, '$1 $2');
    } else {
      r = r?.replace(/^(\d*)/, '$1');
    }
    return r;
  }

  export const parseToNumber = (value) => {
    const numberRegex = /^[0-9\b]+$/;
  
    if (numberRegex.test(value)) {
      return value;
    } else {
      return value.replace(/\D/g, "");
    }
  };

export function smsFormat(v) {
    let r = v?.replace(/\D/g, '');

    if (r.length > 5) {
        r = r?.replace(/^(\d)(\d)(\d)(\d)(\d)(\d).*/, '$1$2$3$4$5$6');
    } else if (r.length > 5) {
        r = r?.replace(/^(\d)(\d)(\d)(\d)(\d)(\d).*/, '$1$2$3$4$5$6');
    } else if (r.length > 4) {
        r = r?.replace(/^(\d)(\d)(\d)(\d)(\d).*/, '$1$2$3$4$5');
    } else if (r.length > 3) {
        r = r?.replace(/^(\d)(\d)(\d)(\d).*/, '$1$2$3$4');
    } else if (r.length > 2) {
        r = r?.replace(/^(\d)(\d)(\d).*/, '$1$2$3');
    } else if (r.length > 1) {
        r = r?.replace(/^(\d)(\d).*/, '$1$2');
    } else {
        r = r?.replace(/^(\d*)/, '$1');
    }
    return r;
}
// r = r.replace(/^(\d)(\d)(\d)(\d)(\d)(\d).*/, '$1 $2 $3 $4 $5 $6');

export function commaSeparateNumber(val) {
  // remove sign if negative
  var sign = 1;
  if (val < 0) {
    sign = -1;
    val = -val;
  }

  // trim the number decimal point if it exists
  let num = val?.toString()?.includes('.') ? val?.toString()?.split('.')[0] : val?.toString();

  while (/(\d+)(\d{3})/.test(num?.toString())) {
    // insert comma to 4th last position to the match number
    num = num?.toString().replace(/(\d+)(\d{3})/, '$1' + ' ' + '$2');
  }

  // add number after decimal point
  if (val?.toString()?.includes('.')) {
    num = num + '.' + val?.toString()?.split('.')[1];
  }

  // return result with - sign if negative
  return sign < 0 ? '-' + num : num;
}