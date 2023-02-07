import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderBlock} from '../../components/HeaderBlock';
import {ArrowBackIcon} from '../../components/icon';
import {IconTextButton} from '../../components/IconTextButton';
import InputPasswordComponent from '../../components/Input/InputPasswordComponent';
import InputTextComponent from '../../components/Input/InputTextComponent';
import {StatusBarComponent} from '../../components/StatusBar/StatusBarComponent';
import {StatusBarHeight} from '../../components/StatusBar/StatusBarHeight';
import {setStoreToken, setUser} from '../../service';
import Api from '../../service/api';
import {
  actionUser,
  phoneFormat,
  windowHeight,
  windowWidth,
} from '../../utils/constant';
import {lightColors} from '../../utils/themeColors';

const Register = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [reg, setReg] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  useEffect(() => {
    if (
      reg.phone.length >= 8 &&
      reg.email.length >= 8 &&
      reg.password.length >= 4 &&
      reg.name.length >= 4
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [reg.phone, reg.email, reg.password, reg.name]);
  const registerOk = () => {
    dispatch({type: actionUser.ACTION_REGISTER_LOADINGOTHER});
    Api.registerApi(reg)
      .then(async e => {
        // console.log("e?.data: ", e?.data?.data)
        // dispatch({ type: actionUser.ACTION_REGISTER_LOADING})
        // await setUser(e?.data?.data)
        // await setStoreToken(e?.data?.data?.token)
        dispatch({
          type: 'SMS_SEND',
          payload: {key: e?.data?.data?.key, ...reg},
        });
        navigation.navigate('Verify');
      })
      .catch(err => {
        // console.log(err);
        dispatch({type: actionUser.ACTION_REGISTER_LOADING});
      });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBarHeight backgroundColor={lightColors.red} />
      <HeaderBlock
        title={'Регистрация'}
        height={50}
        onPress={() => navigation.navigate('Home')}
        iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
        backgroundColor={lightColors.red}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <StatusBarComponent barStyle={"dark-content"}/> */}
        <View style={{alignItems: 'center', marginTop: windowHeight / 8}}>
          <Image
            style={{width: 150, height: 160}}
            source={require('../../../assets/image/ic_victory_launcher.png')}
          />
        </View>
        <InputTextComponent
          // inputRef={inputName}
          placeholder={'Имя пользователя...'}
          name={'name'}
          value={reg.name}
          onChangeText={e => setReg({...reg, name: e})}
        />
        <InputTextComponent
          // inputRef={inputName}
          placeholder={'Эл. адрес...'}
          name={'email'}
          value={reg.email}
          onChangeText={e => setReg({...reg, email: e})}
        />
        <View style={{position: 'relative'}}>
          <Text
            style={{
              position: 'absolute',
              top: 22,
              left: 22,
              color: lightColors.textColor1,
            }}>
            +998
          </Text>
          <InputTextComponent
            // inputRef={inputName}
            keyboardType="numeric"
            placeholder={'__ ___ __ __'}
            name={'phone'}
            value={phoneFormat(reg.phone)}
            onChangeText={e => setReg({...reg, phone: e.split(' ').join('')})}
            style={{
              paddingLeft: 45,
            }}
          />
        </View>
        <InputPasswordComponent
          placeholder={'Пароль...'}
          name={'password'}
          secureTextEntry={true}
          value={reg.password}
          onChangeText={e => setReg({...reg, password: e})}
        />
        <IconTextButton
          disabled={auth.loading}
          onPress={registerOk}
          iconName={
            auth.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : null
          }
          borderRadius={5}
          paddingVertical={8}
          title={'Войти'}
          margin={12}
          backgroundColor={lightColors.buttonColor1}
          justifyContent={'center'}
          alignItems={'center'}
        />
        <IconTextButton
          // width={windowWidth-20}
          onPress={() => {
            navigation.navigate('Login'), console.log(reg);
          }}
          // iconName={auth.loading?<ActivityIndicator size="small" color="#fff"/>:null}
          borderRadius={5}
          title={'Авторизоваться'}
          margin={12}
          // backgroundColor={lightColors.buttonColor}
          justifyContent={'center'}
          alignItems={'center'}
          style={{color: lightColors.buttonColor}}
        />
      </ScrollView>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
