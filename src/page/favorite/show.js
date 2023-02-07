import I18n from 'i18n-js'
import React, { useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderBlock } from '../../components/HeaderBlock'
import { ArrowBackIcon, DoneIcon, ImageIcon, LikeIcon, LikeMinusIcon, PointIcon } from '../../components/icon'
import { IconTextButton } from '../../components/IconTextButton'
import { IconViewBlock } from '../../components/IconViewBlock'
import { ImageComponent } from '../../components/ImageComponent'
import { SpeenLoader } from '../../components/SpeenLoader'
import { StatusBarComponent } from '../../components/StatusBar/StatusBarComponent'
import { StatusBarHeight } from '../../components/StatusBar/StatusBarHeight'
import { ArilaBold } from '../../components/text/ArialBold'
import { ArilaRegular } from '../../components/text/ArialRegular'
import { commaSeparateNumber, windowWidth } from '../../utils/constant'
import { lightColors, fontType } from '../../utils/themeColors'
import moment from 'moment';
import { TextViewComponent } from '../../components/TextViewComponent'
import { LocalizationContext } from '../../i18n/LocaleProvider'
import { DeletedLikeCar } from '../../service/apiFunction'

const FovoriteShow = ({ navigation }) => {
    const dispatch = useDispatch();
    const { t } = React.useContext(LocalizationContext);
    const cars = useSelector(state => state.cars);
    const carFlatList = useSelector(state => state.carFlatList);
    const car = cars.viewData;
    if (cars.showLoading) {
        return <SpeenLoader />
    }
    const long = t("long") === "en"
    const addCarrLike = (id) => {
        if (carFlatList.like_id.includes(id)) {
            let index = carFlatList.like_id.indexOf(id)
            carFlatList.like_id.splice(index, 1)
            dispatch({
                type: "actionCarLikeID",
                payload: { ids: [...carFlatList.like_id] }
            })
            dispatch(DeletedLikeCar(id))
        } else {
            dispatch(DeletedLikeCar(id))
        }
        navigation.navigate("Favorite")
    }
    // console.log(long);
    return (
        <View style={{ flex: 1 }}>
            <StatusBarHeight backgroundColor={lightColors.red} />
            <HeaderBlock
                title={t("back")}
                height={50}
                onPress={() => navigation.goBack()}
                onPress1={() => addCarrLike(car._id)}
                iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
                iconName1={<LikeMinusIcon fill={lightColors.iconColor} />}
                backgroundColor={lightColors.red}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={false}
            >
                <ImageComponent height={250} src={car?.photo?.length >= 1 ? car?.photo[0] : undefined} />

                {car?.photo?.length > 1 ? <IconTextButton
                    title={`1/${car?.photo?.length}`}
                    fontType={true}
                    onPress={() => navigation.navigate("ImageHome")}
                    activeOpacity={0.8}
                    width={60}
                    paddingHorizontal={5}
                    paddingVertical={4}
                    borderRadius={5}
                    justifyContent={"center"}
                    alignItems={"center"}
                    backgroundColor={lightColors.backgroundColor3}
                    iconName={<ImageIcon size={16} fill={lightColors.sectionBg} />}
                    position={"absolute"}
                    top={210} left={10}
                /> : null}
                <View style={{ padding: 10 }}>
                    <ArilaRegular style={{ color: lightColors.textDark, marginTop: 5 }}>
                        {car.madel} {car.marka} {car.yili}
                    </ArilaRegular>
                    <ArilaBold style={{ fontSize: fontType.text_24, color: lightColors.MAIN_GREEN_DARK, marginTop: 10 }}>
                        {commaSeparateNumber(car.narxi)} {t("cost")}
                    </ArilaBold>
                    <ArilaBold style={{ color: lightColors.textDark, marginTop: 10 }}>
                        {car.yurgani ? car.yurgani : "0"} {t("km_mileage")}
                    </ArilaBold>
                    <IconViewBlock
                        blockStyle={{ marginTop: 10 }}
                        iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                        fontType={true}
                        style={{ color: lightColors.textDark, marginLeft: 5 }}
                        title={car.country + ' ' + car.region}
                    />
                    <TextViewComponent
                        marginLeft={10}
                        marginTop={5}
                        title={long ? car.opisaniya.replace(/<p>/g, "").replace(/<\/p>/g, "") : car.opisaniyaru.replace(/<p>/g, "").replace(/<\/p>/g, "")}
                        paddingVertical={3}
                        paddingHorizontal={3}
                        borderRadius={5}
                        backgroundColor={lightColors.backgroundColor1}
                        style={{ color: lightColors.textDark, fontSize: 14 }}
                    />
                </View>
                <View
                    style={{
                        marginLeft: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        width: windowWidth - 20,
                        minHeight: 30,
                        borderColor: lightColors.menuColor,
                        padding: 10,
                        marginBottom: 80
                    }}
                >
                    <View >
                        <IconViewBlock
                            // blockStyle={{marginTop:10}}
                            iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                            fontType={true}
                            style={{ color: lightColors.textColor4, marginLeft: 5, fontSize: fontType.text_12 }}
                            title={`${t("mark_model_yil")}`}
                        />
                        <ArilaRegular style={s.arilaRegular}>
                            {car.marka} {car.madel} {car.yili}
                        </ArilaRegular>
                    </View>
                    <View style={s.view}>
                        <IconViewBlock
                            // blockStyle={{marginTop:10}}
                            iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                            fontType={true}
                            style={{ color: lightColors.textColor4, marginLeft: 5, fontSize: fontType.text_12 }}
                            title={`${t("divegatel")}`}
                        />
                        <ArilaRegular style={s.arilaRegular}>
                            {car.divigitel} {t("litr")} - {long ? car.yoqilgi : car.yoqilgiru}
                        </ArilaRegular>
                    </View>
                    <View style={s.view}>
                        <IconViewBlock
                            iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                            fontType={true}
                            style={{ color: lightColors.textColor4, marginLeft: 5, fontSize: fontType.text_12 }}
                            title={`${t("color")}`}
                        />
                        <ArilaRegular style={s.arilaRegular}>
                            {long ? car.color : car.colorru}
                        </ArilaRegular>
                    </View>
                    <View style={s.view}>
                        <IconViewBlock
                            iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                            fontType={true}
                            style={{ color: lightColors.textColor4, marginLeft: 5, fontSize: fontType.text_12 }}
                            title={`${t("last_operation")}`}
                        />
                        <ArilaRegular style={s.arilaRegular}>
                            {moment(car.date).format("YYYY-MM-DD")}
                        </ArilaRegular>
                    </View>
                    <View style={s.view}>
                        <IconViewBlock
                            iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                            fontType={true}
                            style={{ color: lightColors.textColor4, marginLeft: 5, fontSize: fontType.text_12 }}
                            title={`${t("drive")}`}
                        />
                        <ArilaRegular style={s.arilaRegular}>
                            {long ? car.perevod : car.perevodru}
                        </ArilaRegular>
                    </View>
                    <View style={s.view}>
                        <IconViewBlock
                            iconName={<DoneIcon size={18} fill={lightColors.MAIN_GREEN_DARK} />}
                            fontType={true}
                            style={{ color: lightColors.textColor4, marginLeft: 5, fontSize: fontType.text_12 }}
                            title={`${t("transmission")}`}
                        />
                        <ArilaRegular style={s.arilaRegular}>
                            {long ? car.transmission : car.transmissionru}
                        </ArilaRegular>
                    </View>
                </View>

            </ScrollView>
            {car.number && <IconViewBlock
                title={car.number}
                fontType={true}
                paddingHorizontal={5}
                paddingVertical={8}
                position={"absolute"}
                bottom={30} left={10}
                borderRadius={5}
                justifyContent={"center"}
                backgroundColor={lightColors.buttonColor1}
                width={windowWidth - 20}
            />}

        </View>
    )
}
const s = StyleSheet.create({
    arilaRegular: {
        color: lightColors.textDark,
        marginLeft: 5,
        fontSize: fontType.text_12,
        marginLeft: 25
    },
    view: {
        marginTop: 10
    }
})
export default FovoriteShow