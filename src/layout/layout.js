import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Api from '../service/api';
// import Api from 'module'
export const CarsFirstData = () => {
    // console.log("CarsFirstData");
    const dispatch = useDispatch()
        Api.carsApi().then(e=>{
            // console.log(e);
        }).catch(err=>{
            // console.log("err", err);
        })
}