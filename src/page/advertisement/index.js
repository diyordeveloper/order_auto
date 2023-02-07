import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from "react-native";
import { windowWidth } from "../../utils/constant";
import { lightColors } from "../../utils/themeColors";
import { CarShowData, MyAnonsList } from "../../service/apiFunction";
import { HeaderBlock } from "../../components/HeaderBlock";
import { StatusBarHeight } from "../../components/StatusBar/StatusBarHeight";
import { SpeenLoader } from "../../components/SpeenLoader";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import { useIsFocused } from "@react-navigation/native"; 
import { MyAnonsFlatListComponent } from "../../components/FlatList/MyAnonsFlatListComponent";

export const Advertisement =({navigation}) => {
    const {t} = React.useContext(LocalizationContext);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const focus = useIsFocused();  // useIsFocused as shown          
    useEffect(() => {
        if (focus) {
            dispatch({ type:'MY_ANONS_API_REQUEST', payload:{ page:1 } })
            dispatch(MyAnonsList(1, state.auth._id))
        }
    }, [focus])

    const onOk =(id)=>{
        navigation.navigate("HomeShow")
        dispatch(CarShowData(id))
    }

    useEffect(() => {
        if(!state.auth.auth){
            navigation.navigate("Login")
        }
    }, [focus]);

    if (!state.auth.auth) {
        return(
            <SpeenLoader />
        )
    }

    return (
        <View style={{flex:1, backgroundColorLk:lightColors.backgroundColor1}}>
            <StatusBarHeight backgroundColor={lightColors.red}/>
            <HeaderBlock 
                height={50}
                // onPress={()=>navigation.goBack()}
                // iconName={<ArrowBackIcon />}
                title={t("my_ads")}
                backgroundColor={lightColors.red} 
            />
            <MyAnonsFlatListComponent userId={true} navigation={navigation} onPress={e=>onOk(e)}/>
        </View>
    )
}
const s = StyleSheet.create({
    imgBlock:{
       height:150,
       borderBottomWidth:1,
       borderBottomColor:lightColors.textColor4,
       width:windowWidth,
       flexDirection:"row",
       alignItems:"flex-end",
       backgroundColor:lightColors.backgroundColor

    }
})
