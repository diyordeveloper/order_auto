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

export const HeaderBlock = ({
    title,
    height,
    paddingVertical,
    paddingHorizontal,
    onPress,
    onPress1,
    onPress2,
    activeOpacity,
    fontType,
    iconName,
    iconName1,
    iconName2,
    textSize,
    textColor,
    backgroundColor,
    style
}) => {
    return (
        <View
            style={[
                styles.appButtonWrapper,
                { 
                    height:height,
                    alignItems:"center",
                    justifyContent:"space-between",
                    paddingLeft:10,
                    paddingRight:10,
                    backgroundColor: backgroundColor,
                    paddingVertical:paddingVertical,
                    paddingHorizontal:paddingHorizontal,
                    ...style,
                }]}
        >
            <View style={{flexDirection:"row", alignItems:"center",}}>
                {iconName&&<TouchableOpacity style={{padding:5}} onPress={onPress} activeOpacity={activeOpacity}>
                    {iconName}
                </TouchableOpacity>}
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
                {iconName1 != undefined?(
                    <TouchableOpacity style={{padding:5}} onPress={onPress1} activeOpacity={activeOpacity}>
                    {iconName1}
                    </TouchableOpacity>
                ) :null}
                {iconName2 != undefined?(
                    <TouchableOpacity style={{padding:5}} onPress={onPress2} activeOpacity={activeOpacity}>
                    {iconName2}
                    </TouchableOpacity>
                ) :null}
            </View>
        </View>
    );
}

HeaderBlock.propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    fontType: PropTypes.bool,
    addStatusBar: PropTypes.bool,
    iconName: PropTypes.any,
    textSize: PropTypes.number,
    activeOpacity: PropTypes.number,
    height: PropTypes.number,
};

HeaderBlock.defaultProps = {
    addStatusBar: true,
    fontType: false,
    activeOpacity: 0.5,
    height: 50,
    textSize:20,
    textColor:lightColors.textColor
};

const styles = StyleSheet.create({
    appButtonWrapper: {
        flexDirection: 'row',
        // borderWidth: 1
    },
});
