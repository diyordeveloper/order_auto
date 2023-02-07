import React, {useState, useRef} from 'react';
import {View, Image, ActivityIndicator, ScrollView, Text} from 'react-native';
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

const Login = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [reg, setReg] = useState({
    phone: '',
    password: '',
  });

  const loginOk = () => {
    dispatch({type: actionUser.ACTION_REGISTER_LOADINGOTHER});
    let phone = reg.phone.replace(' ', '').replace(' ', '');
    // console.log(phone);
    Api.loginApi({password: reg.password, phone: phone})
      .then(e => {
        // console.log("333333333:", e);
        Api.getUser(e?.data?.data?._id)
          .then(async e => {
            // console.log("111111111111", e?.data?.data);
            await setUser(e?.data?.data);
            await setStoreToken(e?.data?.data?.token);
            dispatch({
              type: actionUser.ACTION_REGISTER,
              payload: e.data.data,
            });
            navigation.navigate('Home');
          })
          .catch(err => {
            // console.log("4444444", err);
            dispatch({type: actionUser.ACTION_REGISTER_LOADING});
          });
      })
      .catch(err => {
        dispatch({type: actionUser.ACTION_REGISTER_LOADING});
        // console.log(2222222, err);
      });
    dispatch({type: actionUser.ACTION_REGISTER_LOADING});
  };
  //   console.log("reg", reg);
  return (
    <View style={{flex: 1}}>
      <StatusBarHeight backgroundColor={lightColors.red} />
      <HeaderBlock
        title={'Авторизоваться'}
        height={50}
        onPress={() => navigation.navigate('Home')}
        iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
        backgroundColor={lightColors.red}
      />
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: windowHeight / 8}}>
          <Image
            style={{width: 150, height: 160}}
            source={require('../../../assets/image/ic_victory_launcher.png')}
          />
        </View>
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
            keyboardType="numeric"
            placeholder={'__ ___ __ __'}
            name={'phone'}
            value={phoneFormat(reg.phone)}
            onChangeText={e => setReg({...reg, phone: e})}
            style={{
              paddingLeft:45
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
          onPress={loginOk}
          iconName={
            auth.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : null
          }
          borderRadius={5}
          title={'Войти'}
          margin={12}
          paddingVertical={8}
          backgroundColor={lightColors.buttonColor1}
          justifyContent={'center'}
          alignItems={'center'}
          // style={{padding:4}}
        />

        <IconTextButton
          disabled={auth.loading}
          // width={windowWidth-20}
          onPress={() => navigation.navigate('Register')}
          iconName={
            auth.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : null
          }
          borderRadius={5}
          title={'Регистрация'}
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
export default Login;
