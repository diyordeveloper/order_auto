import React, { memo, useMemo } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { ArilaRegular } from './text/ArialRegular';
import { ArilaBold } from './text/ArialBold';
// import {useTheme} from '../../utils/theme/ThemeProvider';
// import {THEME} from '../../utils/theme/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const TitleViewComponent = ({
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    title,
    width,
    fontType,
    backgroundColor,
    // marginTop,
    // marginLeft,
    // marginRight,
    // marginButton,
    blockStyle,
    style
}) => {
    return (
        <View style={{
            borderRadius:borderRadius, 
            width: width,
            // marginTop:marginTop,
            // marginLeft:marginLeft,
            // marginRight:marginRight,
            // marginButton:marginButton,
            backgroundColor: backgroundColor, 
            paddingVertical:paddingVertical, 
            paddingHorizontal:paddingHorizontal,
            ...blockStyle
            }}>
            {
                fontType ? <ArilaRegular style={{ ...style }}>
                    {title}
                </ArilaRegular>
                    :
                    <ArilaBold style={{ ...style }}>
                        {title}
                    </ArilaBold>
            }

        </View>
    );
}

TitleViewComponent.propTypes = {
    backgroundColor: PropTypes.string,
    fontType: PropTypes.bool,
    paddingVertical: PropTypes.number,
    width: PropTypes.number,
    borderRadius: PropTypes.number,
    paddingHorizontal: PropTypes.number,
};

TitleViewComponent.defaultProps = {
    fontType: false,
    paddingHorizontal: 2,
    paddingVertical:2,
    borderRadius:0,
    width:windowWidth
};

// const styles = StyleSheet.create({
//     appButtonWrapper: {
//         flexDirection: 'row',
//         // paddingVertical: 4,
//         // minHeight: 30,
//         borderWidth: 1.
//     },
// });
