import React, { memo } from "react";
import {Text} from 'react-native';
import { arial_bold } from "../../utils/fontName";
import { lightColors } from "../../utils/themeColors";

export const ArilaBold = memo(props => {
  return (
    <Text
      style={{
        color: props.color?props.color:lightColors.textColor,
        fontFamily: arial_bold,
        fontSize: props.size ? props.size:16,
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
});