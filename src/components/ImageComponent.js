import React from 'react';
import {
    Image,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
const windowWidth = Dimensions.get('window').width;
export const ImageComponent = ({
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
    );
}

ImageComponent.propTypes = {
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

ImageComponent.defaultProps = {
    width: windowWidth,
    height: 300,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 0,
};