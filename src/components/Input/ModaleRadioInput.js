import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {LocalizationContext} from '../../i18n/LocaleProvider';
import {Capitalize, windowHeight, windowWidth} from '../../utils/constant';
import {fontType, lightColors} from '../../utils/themeColors';
import {IconTextButton} from '../IconTextButton';
import {ArilaRegular} from '../text/ArialRegular';

export const ModaleRadioInput = ({
  data,
  value,
  onPress,
  modalVisible,
  setModalVisible,
  title,
  onClose,
  translation,
}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = t('long') === 'ru';
  const ModalShow = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => console.log('close window')}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ArilaRegular
                style={{
                  color: lightColors.textDark,
                  fontSize: fontType.text_20,
                  padding: 10,
                }}>
                {t(title)}
              </ArilaRegular>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingLeft: 20,
                paddingRight: 10,
                height: windowWidth - 160,
              }}>
              {data?.map(res => {
                let v = lang ? res?.name_ru : res?.name_uz;
                return (
                  <TouchableOpacity
                    key={res.name_uz}
                    style={styles.container}
                    onPress={() => onPress(res)}
                    activeOpacity={1}>
                    <View style={styles.radioCircle}>
                      {value === v && <View style={styles.selectedRb} />}
                    </View>
                    {translation ? (
                      <ArilaRegular
                        style={{color: lightColors.textDark, paddingLeft: 15}}>
                        {v}
                      </ArilaRegular>
                    ) : (
                      <ArilaRegular
                        style={{color: lightColors.textDark, paddingLeft: 15}}>
                        {v}
                      </ArilaRegular>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                margin: 20,
              }}>
              <IconTextButton
                onPress={() => onClose()}
                backgroundColor={lightColors.buttonColor}
                paddingVertical={10}
                paddingHorizontal={20}
                title={t('close')}
                fontType={true}
                style={{color: lightColors.textDark}}
                borderRadius={10}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onClose()}
      style={{
        height: 40,
        borderRadius: 5,
        borderColor: '#727272',
        justifyContent: 'center',
        margin: 12,
        borderWidth: 1,
      }}>
      <ModalShow />
      <ArilaRegular
        style={{
          color: value == '' ? '#727272' : lightColors.textColor1,
          padding: 10,
          fontSize: fontType.text_14,
          fontWeight: '600',
        }}>
        {translation
          ? t(value == '' ? title : value)
          : value == ''
          ? t(title)
          : value}
      </ArilaRegular>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
  },
  modalView: {
    backgroundColor: 'white',
    width: windowWidth - 40,
    height: windowHeight - 60,
    // borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
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
    fontWeight: '700',
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
