import React, {useEffect} from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native'
import { fontType, lightColors } from '../../utils/themeColors';
import { CarIcon, ClearIcon, HomeIcon, HourIcon, LikeIcon, PlayIcon, PointIcon } from '../icon';
import LinearGradient from 'react-native-linear-gradient';
import { ArilaRegular } from '../text/ArialRegular';
import { ArilaBold } from '../text/ArialBold';
import { BlockComp } from '../blockComp';
import { commaSeparateNumber, consStyle } from '../../utils/constant';
import { IconViewBlock } from '../IconViewBlock';
import { IconTextButton } from '../IconTextButton';
import { ImageComponent } from '../ImageComponent';
import { TitleViewComponent } from '../TitleViewComponent';
import { TextViewComponent } from '../TextViewComponent';
import moment from 'moment';
import I18n from 'i18n-js';
import { LocalizationContext } from '../../i18n/LocaleProvider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VerticalSliderLike=({data, onPress})=>{
    const { t } = React.useContext(LocalizationContext);
    if(data.length<=0){
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: 60 }} >
                <ArilaRegular color={"#000"}>
                    {t("like_my")}
                </ArilaRegular>
            </View>
        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={verticalScrollStyleSheet.container}>
            {data?.map((v,i)=>{
                return (
                    <TouchableOpacity key={v._id} activeOpacity={1} onPress={()=>onPress(v?.likes?._id)} style={verticalScrollStyleSheet.context}>
                        <View style={verticalScrollStyleSheet.block1}>
                            <ImageComponent src={v?.likes?.photo[0]}/>
                        </View>
                        <View style={{padding:10}}>
                            <ArilaRegular style={{fontSize:fontType.text_18,color:lightColors.textDark}}>
                                {v?.likes?.madel} {v?.likes?.marka} {v?.likes?.yili} {v?.likes?.color}
                            </ArilaRegular>
                            <View style={[{marginTop:5}, consStyle.dis_flexcenter]}>
                                <ArilaBold style={{fontSize:fontType.text_24, color:lightColors.MAIN_GREEN_DARK}}>
                                    {commaSeparateNumber(v?.likes?.narxi)} {I18n.t("cost")}
                                </ArilaBold>
                                {/* <IconViewBlock 
                                    iconName = {<PointIcon size={20} fill={"#727272"}/>}
                                    title={v?.likes?.yurgani+' '+I18n.t("road_km")}
                                    fontType={true}
                                    style={{color:lightColors.textDark}}
                                /> */}
                            </View>
                            <BlockComp width={"100%"} speed={v?.likes?.yurgani} point={v?.likes?.region} fuel={v?.likes?.yoqilgi} transmission={v?.likes?.transmission}/>
                        </View>
                        <View style={{paddingLeft:5, flexDirection: 'row', flexWrap:"wrap"}}>
                            {v?.likes?.opisaniya?<TextViewComponent
                                marginLeft={10}
                                marginTop={5}
                                title={v?.likes?.opisaniya.replace(/<p>/g, "").replace(/<\/p>/g, "")}
                                paddingVertical={3}
                                paddingHorizontal={3}
                                borderRadius={5}
                                backgroundColor={lightColors.backgroundColor1}
                                style={{color:lightColors.textDark, fontSize:12}} 
                            />:null}
                        </View>
                        
                        <View style={[{margin:10},consStyle.dis_flexACJBW]}>
                            <IconViewBlock 
                                iconName={<HourIcon fill={lightColors.red}/>}
                                title={moment(v.date).format("YYYY-MM-DD")}
                                fontType={true}
                                style={{color:lightColors.textDark, marginLeft:5}}
                            />
                            {/* <IconTextButton iconName={<LikeIcon fill={lightColors.menuColor}/>}/> */}
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

const verticalScrollStyleSheet = StyleSheet.create({
    container: {
        flex:1,
        // marginTop:10,
        backgroundColor:"#fff",
    },
    context: {
        // minHeight:300,
        // marginTop:10,
        minHeight:200,
        backgroundColor:lightColors.backgroundColor,
        // borderBottomWidth:1,
        borderTopWidth:1,
    },
    block1:{
        // marginTop:5,
        // minHeight:40,
        // borderWidth:1,
        // // padding:10,
        // paddingLeft:10,
        // justifyContent:"space-between",
    },
    block2:{
        minHeight:150,
        paddingTop:5,
        paddingLeft:20,
        paddingRight:20,
    },
    // CloseIcon:{
    //     width:30,
    //     height:30,
    //     borderWidth:1,
    //     position:"absolute",
    //     top:0,
    //     right:0,
    //     backgroundColor:lightColors.MAIN_GRAY6,
    //     opacity:0.8,
    //     display:"flex",
    //     alignItems:"center",
    //     justifyContent:"center"
    // },
    block1View:{
        
        position:"absolute", top:10, left:10,
    }
});
export default VerticalSliderLike