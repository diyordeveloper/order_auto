import React, {useEffect, useState} from 'react'
import { actionCars, actionCarLike } from '../utils/constant';
// import { useDispatch, useSelector } from 'react-redux';
import Api from './api';

export const CarQueryFunct = (data) => (dispatch) => {
    dispatch({ type:'QUERY_LIST_LOADING', payload:{ loading:true} })

    Api.carQuery(data).then(e=>{
        // console.log("e.data1111111111", e.data?.data);
        dispatch({ 
            type:'QUERY_LIST',
            payload: e?.data?.data
        })
    }).catch(err => {
        dispatch({ 
            type:'QUERY_LIST_LOADING',
            payload:{ loading:false, data:[] }
        })
    })
}
export const VideoShowList = (id) => (dispatch) => {
    dispatch({ 
        type:'VIDEO_API_REQUEST_SHOW',
        payload:{ showLoading:true }
    })
    Api.videoShow(id).then(e=>{
        // console.log("e.data1111111111", e.data?.data);
        dispatch({ 
            type:'VIDEO_API_REQUEST_SHOW',
            payload:{ showLoading:false, showData:e?.data?.data }
        })
    }).catch(err => {
        dispatch({ 
            type:'VIDEO_API_REQUEST_SHOW',
            payload:{ showLoading:false, showData:[] }
        })
    })
}
export const VideoAllList = (page) => (dispatch) => {
    dispatch({ type:'VIDEO_API_REQUEST', payload:{ page:page } })
    Api.videoApi(page).then(e=>{
        // console.log(1111111111, e?.data.car);
        if (e?.data?.car?.length > 0) {
            dispatch({
                type:'VIDEO_API_SUCCESS',
                payload:{data:e?.data?.car}
            })
        } else {
            // console.log("VIDEO_API_LIST_END");
            dispatch({ type: 'VIDEO_API_LIST_END' })
        }
    }).catch(err => {
        // console.log("VIDEO_API_FAILURE");
        dispatch({type: 'VIDEO_API_FAILURE'}) 
    })
}
export const MyAnonsList = (page, user_id) => (dispatch) => {
    dispatch({ type:'MY_ANONS_API_REQUEST', payload:{ page:page } })
    Api.carsApiFlatList(page, user_id).then(e=>{
        if (e?.data?.car?.length > 0) {
            dispatch({
                type:'MY_ANONS_API_SUCCESS',
                payload:e?.data?.car
            })
        } else {
            dispatch({ type: 'MY_ANONS_API_LIST_END' })
        }
    }).catch(err => {
        dispatch({type: 'MY_ANONS_API_FAILURE'}) 
    })
}
export const AllCarsApiList = (page) => (dispatch) => {
    // console.log(page, user_id);
    dispatch({ type:'ALL_CARS_API_REQUEST', payload:{ page:page } })
    Api.carsApiFlatList(page, "").then(e=>{
        if (e?.data?.car?.length > 0) {
            // console.log("e?.datar?.car?.length ",e?.data?.car);
            dispatch({
                type:'ALL_CARS_API_SUCCESS',
                payload:e?.data?.car
            })
        } else {
            dispatch({ type: 'ALL_CARS_API_LIST_END' })
        }
    }).catch(err => {
        dispatch({type: 'ALL_CARS_API_FAILURE'}) 
    })
}
export const CarFlatList = (page, user_id) => (dispatch) => {
    // console.log(page, user_id);
    Api.carsApiFlatList(page, user_id).then(e=>{
        if (e?.data?.car?.length > 0) {
            dispatch({
                type:'API_SUCCESS',
                payload:{data:e?.data?.car, total:e?.data?.pagination?.totol*10}
            })
        } else {
            dispatch({ type: 'API_LIST_END' })
        }
    }).catch(err => {
        dispatch({type: 'API_FAILURE'}) 
    })
}
export const CarShowData = (id) => (dispatch) => {

    dispatch({ type: 'ACTION_CAR_SHOW_STATUS' })
    Api.carsShow(id).then(e=>{
        if (e.data.data) {
            dispatch({
                type: 'ACTION_CAR_SHOW',
                payload: e.data.data
            }) 
        }
    }).catch(err => {
        dispatch({
            type: 'ACTION_CAR_SHOW',
            payload: []
        }) 
    })
}

export const CarsLikeCata = (userId) => (dispatch) => {

    dispatch({ type: actionCarLike.ACTION_CAR_SHOW_STATUS_LIKE })
    Api.likeAllList(userId).then(e=>{
            dispatch({
                type: actionCarLike.ACTION_CAR_LIKE,
                payload: e?.data?.car
            }) 
    }).catch(err => {
        dispatch({
            type: actionCarLike.ACTION_CAR_LIKE,
            payload: []
        }) 
    })
}
export const AddLikeCar = (id, userId) => (dispatch) => {
    Api.addLike(id, userId).then(e=>{})
}
export const DeletedLikeCar = (id) => (dispatch) => {
    // console.log(id);
    Api.deleteLike(id).then(e=>{})
}