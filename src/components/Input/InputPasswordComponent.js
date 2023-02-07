import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {lightColors} from '../../utils/themeColors';

const InputPasswordComponent = ({
  name,
  placeholder,
  inputRef,
  onChangeText,
  keyboardType,
  secureTextEntry,
  placeholderTextColor,
  style,
}) => {
  const [changeEye, setChangeEye] = useState(false);

  return (
    <View style={{position: 'relative'}}>
      <TextInput
        ref={inputRef}
        onChangeText={onChangeText}
        name={name}
        keyboardType={keyboardType}
        secureTextEntry={changeEye ? false : secureTextEntry}
        style={{
          borderWidth: 1,
          borderColor: '#727272',
          height: 40,
          paddingTop: 10,
          paddingLeft: 10,
          paddingBottom: 10,
          paddingRight: 40,
          color: lightColors.textColor1,
          borderRadius: 5,
          margin: 12,
          ...style,
        }}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
      />
      <TouchableOpacity
        onPress={() => setChangeEye(p => !p)}
        style={{
          position: 'absolute',
          top: 20,
          right: 22,
        }}>
        {changeEye ? (
          <Image source={require('../../../assets/icons/show.png')} />
        ) : (
          <Image source={require('../../../assets/icons/hide.png')} />
        )}
      </TouchableOpacity>
    </View>
  );
};

// InputPasswordComponent.propTypes = {
//     // secureTextEntry:false
//     // backgroundColor: PropTypes.string,
//     // fontType: PropTypes.bool,
//     // iconName: PropTypes.any,
//     // activeOpacity: PropTypes.number,
// };

InputPasswordComponent.defaultProps = {
  placeholderTextColor: '#727272',
};

export default InputPasswordComponent;
