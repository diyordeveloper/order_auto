import I18n from "i18n-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { ArrowBackIcon } from "../../components/icon";
import qr from "query-string";
import { windowWidth } from "../../utils/constant";
import { lightColors } from "../../utils/themeColors";
import { CarQueryFunct, CarShowData, CarsLikeCata } from "../../service/apiFunction";
import { HeaderBlock } from "../../components/HeaderBlock";
import { StatusBarHeight } from "../../components/StatusBar/StatusBarHeight";
import { SpeenLoader } from "../../components/SpeenLoader";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import VerticalSlider from "../../components/slider/VerticalSlider";
import { getSearch } from "../../service";
import { ArilaRegular } from "../../components/text/ArialRegular";

export const SearchLast = ({ navigation }) => {
    const { t } = React.useContext(LocalizationContext);
    const query = useSelector(state => state.query);

    const dispatch = useDispatch()
    const onShowPage = (id) => {
        navigation.navigate("HomeShow")
        dispatch(CarShowData(id))
    }
    useEffect(() => {
        dispatch({
            type: "QUERY_LIST",
            payload: []
        })
        getSearch().then(e => {
            //   console.log("search11111: ", e);
            dispatch(CarQueryFunct(qr.stringify(e)))
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: lightColors.backgroundColor1 }}>
            <StatusBarHeight />
            <HeaderBlock
                height={55}
                onPress={() => navigation.goBack()}
                iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
                title={t("latest_searches")}
                backgroundColor={lightColors.red}
            />
            <ScrollView>
                {query.loading ? <View style={{ height: 200, justifyContent: "center", alignItems: "center" }} ><SpeenLoader /></View>
                    : <>
                        {query?.data.length > 0 ? <View style={{ marginTop: -2 }}>
                            {
                                query?.data?.map((e, index) => {
                                    return <VerticalSlider key={index} onPress={onShowPage} data={e} />
                                })
                            }
                        </View> : <View style={{ justifyContent: "center", alignItems: "center", height: 60 }} >
                            <ArilaRegular color={"#000"}>
                                {t("last_search")}
                            </ArilaRegular>
                        </View>}
                    </>
                }

            </ScrollView>
        </View>
    )
}
const s = StyleSheet.create({
    imgBlock: {
        height: 150,
        borderBottomWidth: 1,
        borderBottomColor: lightColors.textColor4,
        width: windowWidth,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: lightColors.backgroundColor

    }
})
