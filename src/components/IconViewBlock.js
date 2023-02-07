import React, { memo, useMemo } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { ArilaRegular } from './text/ArialRegular';
import { ArilaBold } from './text/ArialBold';
// import {useTheme} from '../../utils/theme/ThemeProvider';
// import {THEME} from '../../utils/theme/theme';

export const IconViewBlock = ({
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    justifyContent,
    title,
    width,
    fontType,
    borderWidth,
    backgroundColor,
    iconName,
    style,
    opacity,
    position,
    top,
    left,
    right,
    bottom,
    blockStyle
    
}) => {
    return (
        <View style={{ 
                width: width, 
                borderWidth:borderWidth, 
                flexDirection: 'row',
                justifyContent:justifyContent, 
                alignItems:"center", 
                opacity:opacity,
                borderRadius:borderRadius,
                backgroundColor: backgroundColor, 
                paddingVertical:paddingVertical, 
                paddingHorizontal:paddingHorizontal, 
                position:position, top:top, left:left, right:right, bottom:bottom, 
                ...blockStyle 
            }}>
            {iconName}
            {
                fontType ? (<ArilaRegular style={{ ...style }}>
                    {title}
                </ArilaRegular>)
                    :(
                    <ArilaBold style={{ ...style }}>
                        {title}
                    </ArilaBold>
                )
            }

        </View>
    );
}

IconViewBlock.propTypes = {
    blockStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    fontType: PropTypes.bool,
    paddingVertical: PropTypes.number,
    borderRadius: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    iconName: PropTypes.any,
    position: PropTypes.string,
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    button: PropTypes.number,
};

IconViewBlock.defaultProps = {
    fontType: false,
    paddingHorizontal: 2,
    paddingVertical:2,
    borderRadius:0,
};

// const styles = StyleSheet.create({
//     appButtonWrapper: {
//         flexDirection: 'row',
//         // paddingVertical: 4,
//         // minHeight: 30,
//         borderWidth: 1.
//     },
// });
