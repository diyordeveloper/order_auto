import React, { useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { CarIcon, HourIcon, LikeIcon } from '../icon';
import LinearGradient from 'react-native-linear-gradient';
import { ArilaRegular } from '../text/ArialRegular';
import { ArilaBold } from '../text/ArialBold';
import { BlockComp } from '../blockComp';
import { commaSeparateNumber, consStyle } from '../../utils/constant';
import { IconViewBlock } from '../IconViewBlock';
import { IconTextButton } from '../IconTextButton';
import { ImageComponent } from '../ImageComponent';
import { TextViewComponent } from '../TextViewComponent';
import moment from 'moment';
import I18n from 'i18n-js';
import { AddLikeCar } from '../../service/apiFunction';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyAnonsVerticalSlider = ({ data, onPress, navigation }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const addCarrLike = (id) => {
        if (!state.auth.auth) {
            navigation.navigate("Login")
        }
        else {
            dispatch(AddLikeCar(id, state.auth._id))
        }
    }
    return (
        <View style={verticalScrollStyleSheet.container}>
            <TouchableOpacity key={data._id} activeOpacity={1} onPress={() => onPress(data._id)} style={verticalScrollStyleSheet.context}>
                <View style={verticalScrollStyleSheet.block1}>
                    <ImageComponent src={data?.photo[0]} />
                </View>
                <View style={{ padding: 10 }}>
                    <ArilaRegular style={{ fontSize: fontType.text_18, color: lightColors.textDark }}>
                        {data.madel} {data.marka} {data.yili} {data.color}
                    </ArilaRegular>
                    <View style={[{ marginTop: 5 }, consStyle.dis_flexcenter]}>
                        <ArilaBold style={{ fontSize: fontType.text_24, color: lightColors.MAIN_GREEN_DARK }}>
                            {commaSeparateNumber(data.narxi)} {I18n.t("cost")}
                        </ArilaBold>
                    </View>
                    <BlockComp width={"100%"} speed={data.yurgani} point={data.region} fuel={data.yoqilgi} transmission={data.transmission} />
                </View>
                <View style={{ paddingLeft: 5, flexDirection: 'row', flexWrap: "wrap" }}>
                    {data.opisaniya ? <TextViewComponent
                        marginLeft={10}
                        marginTop={5}
                        title={data.opisaniya.replace(/<p>/g, "").replace(/<\/p>/g, "")}
                        paddingVertical={3}
                        paddingHorizontal={3}
                        borderRadius={5}
                        backgroundColor={lightColors.backgroundColor1}
                        style={{ color: lightColors.textDark, fontSize: 14 }}
                    /> : null}
                </View>

                <View style={[{ margin: 10 }, consStyle.dis_flexACJBW]}>
                    <IconViewBlock
                        iconName={<HourIcon fill={lightColors.red} />}
                        title={moment(data.date).format("YYYY-MM-DD")}
                        fontType={true}
                        style={{ color: lightColors.textDark, marginLeft: 5 }}
                    />
                    {/* <IconTextButton onPress={() => addCarrLike(data._id)} iconName={<LikeIcon fill={lightColors.menuColor} />} /> */}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const verticalScrollStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    context: {
        minHeight: 200,
        backgroundColor: lightColors.backgroundColor,
        borderTopWidth: 1,
    },
    block1: {
        // marginTop:5,
        // minHeight:40,
        // borderWidth:1,
        // // padding:10,
        // paddingLeft:10,
        // justifyContent:"space-between",
    },
    block2: {
        minHeight: 150,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    block1View: {

        position: "absolute", top: 10, left: 10,
    }
});
export default MyAnonsVerticalSlider