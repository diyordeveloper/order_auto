import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from "react-native";
import { windowWidth } from "../../utils/constant";
import { lightColors } from "../../utils/themeColors";
import { AllCarsApiList, CarShowData, MyAnonsList } from "../../service/apiFunction";
import { HeaderBlock } from "../../components/HeaderBlock";
import { StatusBarHeight } from "../../components/StatusBar/StatusBarHeight";
import { SpeenLoader } from "../../components/SpeenLoader";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import { useIsFocused } from "@react-navigation/native"; 
import { MyAnonsFlatListComponent } from "../../components/FlatList/MyAnonsFlatListComponent";
import { ArrowBackIcon } from "../../components/icon";
import { AllCarsList } from "../../components/FlatList/AllCarsList";

export const AllCars =({navigation})=>{
    const {t} = React.useContext(LocalizationContext);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const focus = useIsFocused();  // useIsFocused as shown          
    useEffect(() => {
        dispatch(AllCarsApiList(1, ""))
    }, [focus])
    
    // console.log("state.auth._id", state.auth._id);
    const onOk =(id)=>{
        navigation.navigate("HomeShow")
        dispatch(CarShowData(id))
    }

    if (!focus || !state.auth.auth || state.allCars.loaging) {
        return(
            <SpeenLoader />
        )
    }
    if (state.allCars.loaging) {
        return(
            <SpeenLoader />
        )
    }
    return (
        <View style={{flex:1, backgroundColorLk:lightColors.backgroundColor1}}>
            <StatusBarHeight backgroundColor={lightColors.red}/>
            <HeaderBlock 
                height={50}
                onPress={()=>navigation.goBack()}
                iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
                title={t("finded")}
                backgroundColor={lightColors.red} 
            />
            <AllCarsList userId={false} navigation={navigation} onPress={e=>onOk(e)}/>
            {/* <MyAnonsFlatListComponent userId={false} navigation={navigation} onPress={e=>onOk(e)}/> */}
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
