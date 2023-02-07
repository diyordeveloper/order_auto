import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { lightColors } from "../../utils/themeColors";
import { Capitalize } from "../../utils/constant";

const InputTextAreaComponent = ({
        name,
        placeholder,
        inputRef,
        onChangeText,
        value,
        keyboardType,
        placeholderTextColor,
        style
    }) => {

        return (
                <TextInput 
                    onChangeText={onChangeText}
                    name={name}
                    keyboardType={keyboardType}
                    value={value}
                    editable
                    multiline
                    numberOfLines={4}
                    // maxLength={40}
                    style={{ 
                        justifyContent:"flex-start",
                        alignItems:"flex-start",
                        borderWidth:1, 
                        borderColor:'#727272', 
                        // height:40,
                        padding: 10,
                        color:lightColors.textColor1,
                        borderRadius: 5,
                        margin:12,
                        ...style

                    }}
                    placeholderTextColor={placeholderTextColor}
                    placeholder={Capitalize(placeholder)}
                />
        )
}

InputTextAreaComponent.propTypes = {
    // backgroundColor: PropTypes.string,
    // fontType: PropTypes.bool,
    // iconName: PropTypes.any,
    // activeOpacity: PropTypes.number,
};

InputTextAreaComponent.defaultProps = {
    placeholderTextColor: "#727272",
};

export default InputTextAreaComponent