import I18n from "i18n-js";
import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ArrowBackIcon, ChevronRightIcon, ClearIcon, HourIcon, SearchIcon, VideoNotFoundIcon } from "../../components/icon";
import { IconTextIconButtom } from "../../components/IconTextIconButtom";
import { StatusBarComponent } from "../../components/StatusBar/StatusBarComponent";
import { ArilaBold } from "../../components/text/ArialBold";
import moment from 'moment';
import { commaSeparateNumber, windowHeight, windowWidth } from "../../utils/constant";
import { lightColors } from "../../utils/themeColors";
import { SpeenLoader } from "../../components/SpeenLoader";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import Video from 'react-native-video';
import { ArilaRegular } from "../../components/text/ArialRegular";
import { IconViewBlock } from "../../components/IconViewBlock";

export const VideoPage =({navigation})=>{
    const {t} = React.useContext(LocalizationContext);
    const video = useSelector(state => state.video);
    const {showLoading, showData} = video
    const [ videoWidth, setVideoWidth ] = useState(0)
    const long = t("long") === "en"
    const onGoBack = () =>{
        navigation.goBack()
    }
    const onVideoWidth = (e) =>{
        setVideoWidth((windowWidth-30)/e.seekableDuration * e.currentTime)
    }
    const viceoFunc=(video)=>{
        
        if (video?.length>=1) {
            let type = ["mp4"]
            let img = video[0].split(".")
            if (type.indexOf(img[img.length-1])>=0) {
                return video[0]
            }
        }
        return undefined
    }
    let videoss = viceoFunc(showData?.video)
    if(showLoading){
        return(
            <SpeenLoader />
        )
    }
    return (
        <View style={{flex:1, justifyContent:"space-between",  backgroundColor:lightColors.textDark}}>
            <StatusBarComponent translucent={false} backgroundColor={lightColors.textDark}/>
            <View style={{ height:80, padding:15, justifyContent:"center", }}>
                <View style={{ height:2,marginBottom:5, backgroundColor:lightColors.background, width:videoWidth }} >
                </View>
                <ArilaRegular>
                    {showData.marka} {long?showData.madel:showData.madelru} {long?showData.color:showData.colorru}
                </ArilaRegular>
                <ArilaRegular style={{ marginTop:5 }}>
                    {commaSeparateNumber(showData.narxi)} {t("cost")}
                </ArilaRegular>
            </View>
                {videoss != undefined ? <Video source={{uri:videoss}}   // Can be a URL or a local file.
                    // ref={(ref) => {
                    //     // this.player = ref
                    //     // console.log("ref", ref);
                    // }}  
                    resizeMode="contain"                                     // Store reference
                    // onLoadStart={()=>console.log("onLoadStart")}                // Callback when remote video is buffering
                    // onSeek={(e)=>console.log(44444444444,e)}                // Callback when remote video is buffering
                    // onLoad={(e)=>console.log(33333333333333,e)}  
                    onProgress={(e)=>onVideoWidth(e)}  
                    onEnd={()=>navigation.goBack()}             // Callback when video cannot be loaded
                    style={styles.backgroundVideo} />:
                    <View style={{justifyContent:"center", alignItems:"center", marginBottom:60}}>
                        <View style={{ height:70, width:70, borderWidth:1,borderRadius:50, padding:10, backgroundColor:"#fff" }}>
                            <VideoNotFoundIcon fill={"#000"} size={50} />
                        </View>
                    </View>}
            <View style={{ height:50, justifyContent:"center", padding:10}}>
            <IconViewBlock 
                        iconName={<HourIcon fill={lightColors.textColor}/>}
                        title={moment(showData.date).format("YYYY-MM-DD")}
                        fontType={true}
                        style={{color:lightColors.textColor, marginLeft:5}}
                    />
            </View>
            <TouchableOpacity onPress={()=>onGoBack()} style={{ position:"absolute", top:20, right:20 }}>
                <ClearIcon fill={lightColors.background} />
            </TouchableOpacity>
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
var styles = StyleSheet.create({
    backgroundVideo: {
        flex:1,
        width:windowWidth,
        height:windowHeight
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
    },
  });