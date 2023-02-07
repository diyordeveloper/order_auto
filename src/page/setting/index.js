import i18n from 'i18n-js';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderBlock} from '../../components/HeaderBlock';
import {
  ArrowBackIcon,
  ChevronRightIcon,
  LanguageIcon,
  SearchIcon,
} from '../../components/icon';
import {IconTextButton} from '../../components/IconTextButton';
import {IconTextIconButtom} from '../../components/IconTextIconButtom';
import {RadioButton} from '../../components/RadioButton';
import {StatusBarComponent} from '../../components/StatusBar/StatusBarComponent';
import {StatusBarHeight} from '../../components/StatusBar/StatusBarHeight';
import {ArilaBold} from '../../components/text/ArialBold';
import {ArilaRegular} from '../../components/text/ArialRegular';
import {LocalizationContext} from '../../i18n/LocaleProvider';
import {setLanguage} from '../../service';
import {actionUser, windowWidth} from '../../utils/constant';
import {fontType, lightColors} from '../../utils/themeColors';

const PROP = [
  {
    key: 'en',
    text: 'O’zbekcha',
  },
  {
    key: 'ru',
    text: 'Русский',
  },
];

export const ModalComponent = ({
  modalVisible,
  setModalVisible,
  onPress,
  lang,
}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => console.log('close window')}>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.centeredView}>
        <View style={styles.modalView}>
          <ArilaRegular
            style={{
              color: lightColors.textDark,
              fontSize: fontType.text_20,
              padding: 10,
            }}>
            {t('language')}
          </ArilaRegular>
          <RadioButton
            PROP={PROP}
            value={lang ? lang : 'ru'}
            onPress={e => onPress(e)}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export const Setting = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const {t, local, setLocale} = React.useContext(LocalizationContext);
  const onOkValue = async v => {
    setLocale(v);
    setModalVisible(false);
    await setLanguage(v);
    dispatch({
      type: actionUser.ACTION_AUTH_LANG,
      payload: v,
    });
  };
  // console.log(lang);
  return (
    <View style={{flex: 1, backgroundColor: lightColors.backgroundColor1}}>
      <ModalComponent
        lang={auth.lang}
        onPress={e => onOkValue(e)}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      {/* <StatusBarComponent barStyle="dark-content"/> */}
      <StatusBarHeight backgroundColor={lightColors.red} />
      <HeaderBlock
        title={t('settings')}
        height={55}
        onPress={() => navigation.goBack()}
        iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
        backgroundColor={lightColors.red}
      />
      <IconTextButton
        paddingVertical={15}
        activeOpacity={1}
        onPress={() => setModalVisible(true)}
        paddingHorizontal={10}
        backgroundColor={lightColors.backgroundColor}
        iconName={<LanguageIcon fill={lightColors.menuColor} />}
        fontType={true}
        style={{color: lightColors.textDark, paddingLeft: 10}}
        title={t('language')}
      />
    </View>
  );
};
const s = StyleSheet.create({
  imgBlock: {
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.textColor4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: lightColors.backgroundColor,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //   marginTop: 22,
    // borderWidth:1,
  },
  modalView: {
    //   margin: 20,
    backgroundColor: 'white',
    width: windowWidth - 40,
    borderRadius: 5,
    //   padding: 35,
    //   alignItems: "center",
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    //   textAlign: "center"
  },
});
