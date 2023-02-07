import React from 'react';
import {
    StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { ArilaRegular } from '../text/ArialRegular';
import { ArilaBold } from '../text/ArialBold';

export const StatusBarComponent = ({
    translucent,
    backgroundColor,
    barStyle
}) => {
    return (
        <StatusBar barStyle={barStyle} translucent={translucent} backgroundColor={backgroundColor} />
    );
}
// 'light-content' : 'dark-content'
StatusBarComponent.propTypes = {
    backgroundColor: PropTypes.string,
    translucent: PropTypes.bool,
};

StatusBarComponent.defaultProps = {
    translucent: true,
    barStyle: 'light-content',
    backgroundColor: "transparent",
};