import React from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native'
import { lightColors } from '../../utils/themeColors';
import { PlayIcon } from '../icon';
import { arial_bold, arial_regular } from '../../utils/fontName';
import { ArilaRegular } from '../text/ArialRegular';
import { ArilaBold } from '../text/ArialBold';
import { LocalizationContext } from '../../i18n/LocaleProvider';
import { ImageComponent } from '../ImageComponent';
import { commaSeparateNumber } from '../../utils/constant';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HorizantalScroll = ({ data, width, height, onPress }) => {
    // console.log("data", data?.video?.length);
    const {t} = React.useContext(LocalizationContext);
    const long = t("long") === "en"

    const imageFunc=(video)=>{
        if (video?.length>=2) {
            let type = ["png", "jpg"]
            let img1 = video[1].split(".")
            let img0 = video[0].split(".")
            if (type.indexOf(img1[img1.length-1])) {
                return video[1]
            } else if(type.indexOf(img0[img0.length-1])>=0) {
                return video[0]
            }
        }
        return undefined
    }
    return (
            <TouchableOpacity onPress={() => onPress(data._id)} activeOpacity={1} key={data._id}
                style={[horizantalScrollStyleSheet.context, { width: width, height: height }]}
            >
                <ImageComponent src={imageFunc(data?.video)} width={width} height={height} borderRadius={5} />
                <View style={[horizantalScrollStyleSheet.textContentPlay]}>
                    <PlayIcon fill={lightColors.sectionBg} style={horizantalScrollStyleSheet.textContent} />
                </View>
                <View style={horizantalScrollStyleSheet.textContent}>
                    <ArilaRegular style={{ color: lightColors.sectionBg }}>
                        {data.marka} {long?data.madel:data.madelru} {long?data.color:data.colorru}
                    </ArilaRegular>
                    <ArilaBold style={{ color: lightColors.sectionBg }}>
                        {commaSeparateNumber(data.narxi)} {t("cost")}
                    </ArilaBold>
                </View>
            </TouchableOpacity>
    )
}

const horizantalScrollStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // borderWidth:1,
    },
    context: {
        margin: 5,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1566a4",
    },
    tinyLogo: {
        borderRadius: 5,
    },
    textContent: {
        zIndex: 1111,
        position: "absolute",
        bottom: 0,
        left: 0,
        display: 'flex',
        padding: 5,

    },
    textContentPlay: {
        position: "absolute",
        width: 42,
        height: 42,
        borderRadius: 50,
        display: "flex",
        backgroundColor: lightColors.red,
        justifyContent: "center",
        alignItems: 'center'
    },
    linearGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '100%',
        height: 50,
        opacity: 0.4
    }
});

export default HorizantalScroll