import React from 'react';
import {
    Image,
    Dimensions,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { lightColors } from '../utils/themeColors';
const windowWidth = Dimensions.get('window').width;
export const ImageComponentCheck = ({
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    src,
    width,
    height,
    style,
    position,
    top,
    left,
    right,
    resizeMode
    // button,

}) => {
    return (
        <View>
            <View style={{ 
                width:width,
                height:height,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                backgroundColor:lightColors.backgroundColor3,
                opacity:0.5,
                // borderWidth:1, 
                position:"absolute", 
                zIndex:122, 
                // borderRadius:10 
            }} ></View>
            <Image
            source={
                src === undefined
                    ? require('../../assets/image/ic_victory_launcher.png')
                    : {
                        uri:
                            src.length === 0
                                ? src
                                : src,
                        cache: 'only-if-cached',
                    }
            }
            resizeMode={resizeMode}
            style={{
                borderRadius: borderRadius,
                width:width,
                height:height,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                position: position,
                top: top,
                left: left,
                right: right,
                ...style
            }} />
        </View>
    );
}

ImageComponentCheck.propTypes = {
    paddingVertical: PropTypes.number,
    borderRadius: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    position: PropTypes.string,
    src: PropTypes.string,
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    // button: PropTypes.number,
};

ImageComponentCheck.defaultProps = {
    width: windowWidth,
    height: 200,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 0,
};