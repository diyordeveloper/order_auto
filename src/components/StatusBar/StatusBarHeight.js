import React from 'react';
import {
    StatusBar, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { ArilaRegular } from '../text/ArialRegular';
import { ArilaBold } from '../text/ArialBold';
import { lightColors } from '../../utils/themeColors';

export const StatusBarHeight = ({
    height,
    style,
    backgroundColor,
}) => {
    return (
        <View style={{...style, height:height, backgroundColor:backgroundColor,}} />
    );
}

StatusBarHeight.propTypes = {
    style: PropTypes.object,
    // translucent: PropTypes.bool,
};

StatusBarHeight.defaultProps = {
    height:20,
    backgroundColor:lightColors.red
    // translucent: true,
    // backgroundColor: "transparent",
};