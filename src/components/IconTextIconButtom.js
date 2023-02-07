import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { arial_bold, arial_regular } from '../utils/fontName';
import { lightColors } from '../utils/themeColors';

export const IconTextIconButtom = ({
    title,
    height,
    paddingVertical,
    paddingHorizontal,
    onPress,
    activeOpacity,
    fontType,
    iconName,
    iconName1,
    textSize,
    textColor,
    backgroundColor,
    style
}) => {
    return (
        <TouchableOpacity
            onPress={onPress} activeOpacity={activeOpacity}
            style={[
                styles.appButtonWrapper,
                { 
                    height:height,
                    alignItems:"center",
                    justifyContent:"space-between",
                    // paddingLeft:10,
                    // paddingRight:10,
                    backgroundColor: backgroundColor,
                    paddingVertical:paddingVertical,
                    paddingHorizontal:paddingHorizontal,
                    ...style,
                }]}
        >
            <View style={{flexDirection:"row", alignItems:"center",}}>
                {iconName}
                <Text style={{
                        paddingLeft:10,
                        // marginTop:3,
                        fontFamily:fontType?arial_bold:arial_regular, 
                        fontSize:textSize, 
                        color:textColor
                }}>
                    {title}
                </Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center",}}>
                {iconName1 != undefined?iconName1 :null}
            </View>
        </TouchableOpacity>
    );
}

IconTextIconButtom.propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    fontType: PropTypes.bool,
    addStatusBar: PropTypes.bool,
    iconName: PropTypes.any,
    textSize: PropTypes.number,
    activeOpacity: PropTypes.number,
    height: PropTypes.number,
};

IconTextIconButtom.defaultProps = {
    addStatusBar: true,
    fontType: false,
    activeOpacity: 0.5,
    height: 45,
    textSize:16,
    textColor:lightColors.textColor
};

const styles = StyleSheet.create({
    appButtonWrapper: {
        flexDirection: 'row',
        // borderWidth: 1
    },
});
