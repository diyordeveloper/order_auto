import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

export const SpeenLoader = ({
    style,
    color,
    size
}) => {
    return (
        <View style={[styles.p,{...style}]}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

SpeenLoader.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
};

SpeenLoader.defaultProps = {
    color: "#00ff00",
    size:"large"
};

const styles = StyleSheet.create({
    p: {
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center" ,      
    },
});
