import I18n from "i18n-js";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, View } from "react-native";
import { ArrowBackIcon, ChevronRightIcon, SearchIcon } from "../../components/icon";
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

export const Benefits =({navigation})=>{
    const {t} = React.useContext(LocalizationContext);
    const state = useSelector(state => state);
    // console.log(11111111111111, state.like.loading);
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(CarsLikeCata())
    // }, [])

    const onPress =()=>{
        navigation.goBack()
        // dispatch(CarShowData(id))
    }
    // if(state.like.loading){
    //     return(
    //         <SpeenLoader />
    //     )
    // }
    return (
        <View style={{flex:1, backgroundColorLk:lightColors.backgroundColor1}}>
            <StatusBarHeight backgroundColor={lightColors.red}/>
            <HeaderBlock 
                height={50}
                onPress={()=>navigation.goBack()}
                iconName={<ArrowBackIcon fill={lightColors.iconColor}/>}
                title={t("publications")}
                backgroundColor={lightColors.red} 
            />
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
