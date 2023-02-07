import React, {Component, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { lightColors } from '../utils/themeColors';
import { ArilaRegular } from './text/ArialRegular';

export const RadioButton = ({PROP, value, onPress}) => {

    // const [value, onPress] = useState(null)
    return (
        <View style={{padding:10}}>
            {PROP?.map(res => {
                return (
                    <TouchableOpacity
                        key={res.key}
                        style={styles.container}
                        onPress={() => onPress(res.key)}
                        activeOpacity={0.8}
                    >
                        <View
                            style={styles.radioCircle}
                        >
                            {value === res.key && <View style={styles.selectedRb}/>}
                        </View>
                        <ArilaRegular style={{color:lightColors.textDark, paddingLeft:15}}>{res.text}</ArilaRegular>
                    </TouchableOpacity>
                );
            })}
            {/*<Text> Selected: {value} </Text>*/}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});