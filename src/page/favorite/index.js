import I18n from "i18n-js";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, View } from "react-native";
import { ChevronRightIcon, SearchIcon } from "../../components/icon";
import { IconTextIconButtom } from "../../components/IconTextIconButtom";
import { StatusBarComponent } from "../../components/StatusBar/StatusBarComponent";
import { ArilaBold } from "../../components/text/ArialBold";
import Api from "../../service/api";
import { windowWidth } from "../../utils/constant";
import { lightColors } from "../../utils/themeColors";
import { CarShowData, CarsLikeCata } from "../../service/apiFunction";
import { HeaderBlock } from "../../components/HeaderBlock";
import { StatusBarHeight } from "../../components/StatusBar/StatusBarHeight";
import { SpeenLoader } from "../../components/SpeenLoader";
import VerticalSliderLike from "../../components/slider/VerticalSliderLike";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import { useIsFocused } from "@react-navigation/native"; 
import Login from "../login/Login";

export const Favorite =({navigation})=>{
    const {t} = React.useContext(LocalizationContext);
    const state = useSelector(state => state);
    const focus = useIsFocused();  // useIsFocused as shown        

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CarsLikeCata(state.auth._id))
    }, [focus])
    useEffect(() => {
        if(!state.auth.auth){
            navigation.navigate("Login")
        }
    }, [focus]);

    const onPress =(id)=>{
        navigation.navigate("FovoriteShow")
        dispatch(CarShowData(id))
    }

    if(!focus || !state.auth.auth || state.like.loading){
        return(
            <SpeenLoader />
        )
    }
    // if (!state.auth.auth) {
    //     return(
    //         <SpeenLoader />
    //     )
    // }
    return (
        <View style={{flex:1}}>
            <StatusBarHeight backgroundColor={lightColors.red}/>
            <HeaderBlock
                title={t("brane")}
                backgroundColor={lightColors.red} 
            />
            <VerticalSliderLike data={state.like?.data} onPress={(e)=>onPress(e)}/>
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
