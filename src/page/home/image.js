import I18n from 'i18n-js'
import React, {useEffect} from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderBlock } from '../../components/HeaderBlock'
import { ArrowBackIcon, DoneIcon, ImageIcon, LikeIcon, PointIcon } from '../../components/icon'
import { IconTextButton } from '../../components/IconTextButton'
import { IconViewBlock } from '../../components/IconViewBlock'
import { ImageComponent } from '../../components/ImageComponent'
import { SpeenLoader } from '../../components/SpeenLoader'
import { StatusBarComponent } from '../../components/StatusBar/StatusBarComponent'
import { StatusBarHeight } from '../../components/StatusBar/StatusBarHeight'
import { ArilaBold } from '../../components/text/ArialBold'
import { ArilaRegular } from '../../components/text/ArialRegular'
import { windowWidth } from '../../utils/constant'
import { lightColors, fontType } from '../../utils/themeColors'
import moment from 'moment';
import { TextViewComponent } from '../../components/TextViewComponent'
import { LocalizationContext } from '../../i18n/LocaleProvider'

const ImageHome=({navigation})=>{
    const {t} = React.useContext(LocalizationContext);
    const cars = useSelector(state => state.cars);
    const car = cars.viewData;

    const long = t("long") === "en"
    // console.log(long);
    return(
        <View style={{flex:1, backgroundColor:lightColors.backgroundColor1}}>
            <StatusBarHeight backgroundColor={lightColors.red}/>
            <HeaderBlock 
                title={t("foto_gallery")}
                height={50}
                onPress={()=>navigation.goBack()}
                // onPress1={()=>console.log("onPress1")}
                iconName={<ArrowBackIcon fill={lightColors.iconColor}/>}
                // iconName1={<LikeIcon fill={lightColors.iconColor}/>}
                backgroundColor={lightColors.red}
            />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                horizontal={false}
            > 
                {
                    car?.photo?.map((v,i)=>{
                        return <ImageComponent key={i} style={{marginBottom:8}} height={250} src={v}/>
                    })
                }
            </ScrollView>
            {/* <IconViewBlock 
                title={"User number kerak showda"}
                fontType={true}
                paddingHorizontal={5}
                paddingVertical={8}
                position={"absolute"} 
                bottom={30} left={10} 
                borderRadius={5}
                justifyContent={"center"} 
                backgroundColor={lightColors.buttonColor1}
                width={windowWidth-20}  
            /> */}

        </View>
    )
}
const s=StyleSheet.create({
    arilaRegular:{
        color:lightColors.textDark, 
        marginLeft:5, 
        fontSize:fontType.text_12, 
        marginLeft:25
    },
    view:{
        marginTop:10
    }
})
export default ImageHome