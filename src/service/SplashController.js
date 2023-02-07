import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {appIsReady} from '../redux/actions/auth';
import SplashScreen from 'react-native-splash-screen';

export const SplashController = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    useEffect(() => {
        if (auth) {
            SplashScreen.hide();
        }
    }, [auth]);

    return null;
};
