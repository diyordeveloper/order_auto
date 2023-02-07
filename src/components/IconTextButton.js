import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { ArilaRegular } from './text/ArialRegular';
import { ArilaBold } from './text/ArialBold';

export const IconTextButton = ({
    title,
    width,
    onPress,
    activeOpacity,
    fontType,
    backgroundColor,
    iconName,
    margin,
    padding,
    alignItems,
    justifyContent,
    borderWidth,
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    disabled,
    style,
    marginBottom,
    position,
    top,
    left,
    right,
    bottom
}) => {
    return (
        <TouchableOpacity 
            disabled={disabled}
            onPress={onPress} 
            activeOpacity={activeOpacity} 
            // style={{}}
            style={[styles.appButtonWrapper, 
                { 
                    width: width, 
                    margin:margin,
                    marginBottom:marginBottom,
                    borderRadius:borderRadius,
                    padding:padding,
                    borderWidth:borderWidth,
                    paddingVertical:paddingVertical,
                    paddingHorizontal:paddingHorizontal,
                    backgroundColor: backgroundColor, 
                    alignItems:alignItems, 
                    justifyContent:justifyContent,
                    position: position,
                    top: top,
                    bottom:bottom,
                    left: left,
                    right: right,
                }]}
        >
            {iconName}
            {
                fontType ? (
                        <ArilaRegular style={{ ...style }}>
                            {title}
                        </ArilaRegular>
                    ) : (
                        <ArilaBold style={{ ...style }}>
                            {title}
                        </ArilaBold>
                    )
            }
        </TouchableOpacity>
    );
}

IconTextButton.propTypes = {
    backgroundColor: PropTypes.string,
    fontType: PropTypes.bool,
    iconName: PropTypes.any,
    activeOpacity: PropTypes.number,
};

IconTextButton.defaultProps = {
    fontType: false,
    activeOpacity: 0.5,
};

const styles = StyleSheet.create({
    appButtonWrapper: {
        flexDirection: 'row',
        alignItems:"flex-end",
        paddingVertical: 4,
        minHeight: 30,
        
        // borderWidth: 1.
    },
});
