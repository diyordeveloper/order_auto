import I18n from "i18n-js";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { ArrowBackIcon, ChevronRightIcon, SearchIcon } from "../../components/icon";
import { IconTextIconButtom } from "../../components/IconTextIconButtom";
import { StatusBarComponent } from "../../components/StatusBar/StatusBarComponent";
import { ArilaBold } from "../../components/text/ArialBold";
import qr from "query-string";
import { Capitalize, windowWidth } from "../../utils/constant";
import { lightColors } from "../../utils/themeColors";
import { CarQueryFunct, CarShowData, CarsLikeCata } from "../../service/apiFunction";
import { HeaderBlock } from "../../components/HeaderBlock";
import { StatusBarHeight } from "../../components/StatusBar/StatusBarHeight";
import { SpeenLoader } from "../../components/SpeenLoader";
import VerticalSliderLike from "../../components/slider/VerticalSliderLike";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import InputComponent from "../../components/Input/InputTextComponent";
import { ArilaRegular } from "../../components/text/ArialRegular";
import { ModaleRadioInput } from "../../components/Input/ModaleRadioInput";
import { marka } from "../../utils/date";
import { IconTextButton } from "../../components/IconTextButton";
import VerticalSlider from "../../components/slider/VerticalSlider";
import { getSearch, setSearch } from "../../service";

export const Search =({navigation})=>{
    const {t} = React.useContext(LocalizationContext);
    const query = useSelector(state => state.query);

    const [modalVisible, setModalVisible] = useState(false)
    const [create, setCreate ] = useState({
        marka:"",
        yili_dan:null,
        yili_ga:null,
        narxi_dan:null,
        narxi_ga:null,
        yurgani_dan:null,
        yurgani_ga:null,
    })
    const dispatch = useDispatch()
    const onShowPage = (id) => {
        navigation.navigate("HomeShow")
        dispatch(CarShowData(id))
    }
    useEffect(()=>{
        dispatch({
            type:"QUERY_LIST",
            payload:[]
        })
    },[])
    const onPress = async ()=>{
        // console.log(qr.stringify(create));
        await setSearch(create)
        dispatch(CarQueryFunct(qr.stringify(create)))
    }
    const onOpenAndCloseModal =()=> {
        setModalVisible(!modalVisible)
    }
    return (
        <View style={{flex:1, backgroundColor:lightColors.backgroundColor1}}>
            <StatusBarHeight />
            <HeaderBlock 
                height={55}
                onPress={()=>navigation.goBack()}
                iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
                title={t("search")}
                backgroundColor={lightColors.red} 
            />
            <ScrollView>
                <View style={{ minHeight:300, borderWidthBottom:1}}>
                    <View style={{height:110, marginTop:5, backgroundColor:lightColors.backgroundColor}} >
                        <ArilaRegular style={{ color:lightColors.textColor1, width: windowWidth,  paddingTop:10, paddingLeft:10  }} >
                            {Capitalize(t("mark"))}
                        </ArilaRegular>

                        <ModaleRadioInput
                            translation={false}
                            title={"mark"} 
                            onPress={e => {setCreate({...create, marka: e.name_uz}), onOpenAndCloseModal()}} 
                            data={marka} value={create.marka} 
                            modalVisible={modalVisible} 
                            onClose={()=>onOpenAndCloseModal()} 
                        />
                    </View>
                    <View style={{ flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap",height:110, marginTop:5,backgroundColor:lightColors.backgroundColor}} >
                        <ArilaRegular style={{ color:lightColors.textColor1, width: windowWidth,  paddingTop:10, paddingLeft:10  }} >
                            {Capitalize(t("cost"))}
                        </ArilaRegular>
                        <InputComponent
                            keyboardType="numeric"
                            placeholder={t("from")}
                            name={"narxi_dan"}
                            style={{ width:windowWidth/2-40 }}
                            value={create.narxi_dan}
                            onChangeText={e => setCreate({...create, narxi_dan: e})}
                        />
                        <InputComponent
                            keyboardType="numeric"
                            placeholder={t("to")}
                            style={{ width:windowWidth/2-40 }}
                            name={"narxi_ga"}
                            value={create.narxi_ga}
                            onChangeText={e => setCreate({...create, narxi_ga: e})}
                        />
                    </View>
                    <View style={{ flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap",height:110, marginTop:5,backgroundColor:lightColors.backgroundColor}} >
                        <ArilaRegular style={{ color:lightColors.textColor1, width: windowWidth,  paddingTop:10, paddingLeft:10  }} >
                            {Capitalize(t("year_f"))}
                        </ArilaRegular>
                        <InputComponent
                            keyboardType="numeric"
                            placeholder={t("from")}
                            name={"yili_dan"}
                            style={{ width:windowWidth/2-40 }}
                            value={create.yili_dan}
                            onChangeText={e => setCreate({...create, yili_dan: e})}
                        />
                        <InputComponent
                            keyboardType="numeric"
                            placeholder={t("to")}
                            style={{ width:windowWidth/2-40 }}
                            name={"yili_ga"}
                            value={create.yili_ga}
                            onChangeText={e => setCreate({...create, yili_ga: e})}
                        />
                    </View>
                    
                    <View style={{ flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap",height:110, marginTop:5,marginBottom:10, backgroundColor:lightColors.backgroundColor}} >
                        <ArilaRegular style={{ color:lightColors.textColor1, width: windowWidth,  paddingTop:10, paddingLeft:10  }} >
                            {Capitalize(t("km_mileage"))}
                        </ArilaRegular>
                        <InputComponent
                            keyboardType="numeric"
                            placeholder={t("from")}
                            name={"yurgani_dan"}
                            style={{ width:windowWidth/2-40 }}
                            value={create.yurgani_dan}
                            onChangeText={e => setCreate({...create, yurgani_dan: e})}
                        />
                        <InputComponent
                            keyboardType="numeric"
                            placeholder={t("to")}
                            style={{ width:windowWidth/2-40 }}
                            name={"yurgani_ga"}
                            value={create.yurgani_ga}
                            onChangeText={e => setCreate({...create, yurgani_ga: e})}
                        />
                    </View>
                </View>
                {
                    query.loading? <View style={{ height:200, justifyContent:"center", alignItems:"center" }} ><SpeenLoader /></View> :
                    <View style={{ marginTop:-2 }}>
                        {
                            query?.data?.map((e, index) =>{
                                return <VerticalSlider key={index} onPress={onShowPage} data={e} />
                            })
                        }
                    </View>
                }
                
            </ScrollView>
            <IconTextButton
                width={ windowWidth-20 }
                disabled={query.loading}
                onPress={()=>onPress()}
                activeOpacity={1}
                borderRadius={5} 
                bottom={10}
                paddingVertical={8}
                title={t("search")}
                position={"absolute"}
                margin={12}
                backgroundColor={lightColors.buttonColor1}
                justifyContent={"center"}
                alignItems={"center"} />
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
