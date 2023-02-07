import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {lightColors} from '../../utils/themeColors';
import {Capitalize} from '../../utils/constant';

const InputComponent = ({
  name,
  placeholder,
  inputRef,
  onChangeText,
  value,
  keyboardType,
  placeholderTextColor,
  style,
}) => {
  return (
    <TextInput
      ref={inputRef}
      onChangeText={onChangeText}
      name={name}
      keyboardType={keyboardType}
      value={value}
      style={{
        borderWidth: 1,
        borderColor: '#727272',
        height: 40,
        padding: 10,
        color: lightColors.textColor1,
        borderRadius: 5,
        margin: 12,
        ...style,
      }}
      placeholderTextColor={placeholderTextColor}
      placeholder={Capitalize(placeholder)}
    />
  );
};

InputComponent.propTypes = {
  // backgroundColor: PropTypes.string,
  // fontType: PropTypes.bool,
  // iconName: PropTypes.any,
  // activeOpacity: PropTypes.number,
};

InputComponent.defaultProps = {
  placeholderTextColor: '#727272',
};

export default InputComponent;
