import React from 'react';
import {
    View, StyleSheet, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { ArilaRegular } from './text/ArialRegular';
import { ArilaBold } from './text/ArialBold';
import { arial_bold, arial_regular } from '../utils/fontName';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
export const TextViewComponent = ({
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    title,
    fontType,
    backgroundColor,
    margin,
    marginTop,
    marginLeft,
    marginRight,
    // marginButton,
    style
}) => {
    return (
        <Text style={[
            styles.badge,
            {
                fontFamily:fontType? arial_bold : arial_regular,
                backgroundColor:backgroundColor,
                paddingVertical:paddingVertical,
                paddingHorizontal:paddingHorizontal,
                borderRadius:borderRadius,
                marginTop:marginTop,
                marginLeft:marginLeft,
                marginRight:marginRight,
                // marginButton:marginButton,
                alignSelf: 'flex-start', 
                ...style,
            }]}
            >{title}</Text>
    );
}

TextViewComponent.propTypes = {
    backgroundColor: PropTypes.string,
    fontType: PropTypes.bool,
    paddingVertical: PropTypes.number,
    minWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    paddingHorizontal: PropTypes.number,
};

TextViewComponent.defaultProps = {
    fontType: false,
    paddingHorizontal: 5,
    paddingVertical:5,
    borderRadius:0,
    minWidth:20,
    marginLeft:10,
    marginRight:10
};
const styles = StyleSheet.create({
    badge: { 
      backgroundColor: '#f16622',
      color: '#fff',
    //   padding: 5, 
    //   marginRight: 5, 
      alignSelf: 'flex-start', 
    //   borderRadius: 4 
    }
  });