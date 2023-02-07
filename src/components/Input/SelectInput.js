import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

const SelectInput = ({array, height, width, value, onChangeFun, style}) => {
  return (
      <Picker
        selectedValue={value}
        style={{ height: height, width: width, ...style }}
        onValueChange={(e) => onChangeFun(e)}
      >
        {array?.map(e=>{
            return(
                <Picker.Item label={e.label} value={e.value} />
            )
        })}
      </Picker>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    // alignItems: "center"
  }
});

export default SelectInput;