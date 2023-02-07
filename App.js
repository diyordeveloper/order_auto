// import * as React from 'react';
import React, {useEffect, useState} from "react";
import {View, Text, Button} from 'react-native';
import RouterGlobal from "./src/page/RouterGlobal";
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {LocaleProvider} from './src/i18n/LocaleProvider';
import store from './src/redux/index'
import { getStoreToken, setStoreToken } from "./src/service";
// import {getLanguage, setLanguage} from "./src/service";
// import {PortalProvider} from "@gorhom/portal";

function App() {
    const [token, setToken] = useState("")
    getStoreToken().then(r=>{
        setToken(r)
    })
    return (
        // <PortalProvider>
            <Provider store = {store}>
                <NavigationContainer>
                    <RouterGlobal token={token}/>
                </NavigationContainer>
            </Provider>
    );
}

export default App;

