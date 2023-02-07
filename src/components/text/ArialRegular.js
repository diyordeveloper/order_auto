import React, { memo } from "react";
import {Text} from 'react-native';
import { arial_regular } from "../../utils/fontName";
import { lightColors } from "../../utils/themeColors";

export const ArilaRegular = memo(props => {
  return (
    <Text
      style={{
        color: props.color?props.color:lightColors.textColor,
        fontFamily: arial_regular,
        fontSize: props.size ? props.size:16,
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
});