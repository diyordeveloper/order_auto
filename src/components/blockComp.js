import I18n from "i18n-js";
import React, { memo } from "react";
import {View, Dimensions, StyleSheet} from 'react-native';
import { consStyle, windowWidth } from "../utils/constant";
import { lightColors } from "../utils/themeColors";
import { PlaceIcon, SpeedIcon, GasolineIcon, CircledAIcon, TransmissionIcon } from "./icon";
import { ArilaBold } from "./text/ArialBold";
import { ArilaRegular } from "./text/ArialRegular";

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
export const BlockComp=({
    speed, 
    point,
    fuel,
    transmission,
    width,
     })=>{
    return(
        <View style={[b.block, {width:width}]}>
            <View style={b.blockOne}>
                <SpeedIcon fill={lightColors.red}/>
                <ArilaBold style={{color:lightColors.textColor1, fontSize:14, marginLeft:2}}>
                     {speed} {I18n.t("road_km")}
                </ArilaBold>
            </View>
            <View style={b.blockOne}>
                <PlaceIcon fill={lightColors.red}/>
                <ArilaBold style={{color:lightColors.textColor1, fontSize:14, marginLeft:2}}>
                     {point?point:"-"}
                </ArilaBold>
            </View>
            <View style={b.blockOne}>
                <GasolineIcon width={18} height={18} fill={lightColors.red}/>
                <ArilaBold style={{color:lightColors.textColor1, fontSize:14, marginLeft:2}}>
                 {fuel}
                </ArilaBold>
            </View>
            <View style={b.blockOne}>
                <CircledAIcon fill={lightColors.red}/>
                <ArilaBold style={{color:lightColors.textColor1, fontSize:14, marginLeft:2}}>
                 {transmission}
                </ArilaBold>
            </View>
        </View>
    )
}
const b = StyleSheet.create({
    block:{
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",

    },
    blockOne:{
        marginTop:10,
        minWidth:windowWidth/2-30,
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    }
})