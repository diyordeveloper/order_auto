import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderBlock} from '../../components/HeaderBlock';
import {ArrowBackIcon} from '../../components/icon';
import {StatusBarHeight} from '../../components/StatusBar/StatusBarHeight';
import {setStoreToken, setUser} from '../../service';
import Api from '../../service/api';
import {
  actionUser,
  phoneFormat,
  smsFormat,
  windowHeight,
  windowWidth,
} from '../../utils/constant';
import {fontType, lightColors} from '../../utils/themeColors';
import InputTextComponent from '../../components/Input/InputTextComponent';
import {ArilaRegular} from '../../components/text/ArialRegular';
import {IconTextButton} from '../../components/IconTextButton';
import {t} from 'i18n-js';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
const inputs = Array(6).fill('');
let newInputIndex = 0;
const isObjValid = obj => {
  return Object.values(obj).every(val => val.trim());
};
const Verify = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [dt, setDt] = useState(new Date().toLocaleString());
  const [count, setCount] = useState(0);
  const [countStatus, setCountStatus] = useState(false);

  const inputRef = useRef();
  const [OTP, setOTP] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  });
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const handleChangeText = (text, index) => {
    const newOTP = {...OTP};
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, [nextInputIndex]);

  //   const [reg, setReg] = useState({
  //     code: '',
  //     key: '',
  //   });

  // console.log("auth: ", auth)
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
      if (count == 58 && !countStatus) {
        setCount(0);
        setCountStatus(true);
      } else if (count != 58 && !countStatus) {
        setCountStatus(false);
        setCount(count + 1);
      }
    }, 100);

    return () => clearInterval(secTimer);
  }, [dt]);
  const Restart = () => {
    // setReg({
    //   code: '',
    //   key: '',
    // });
    setOTP({0: '', 1: '', 2: '', 3: '', 4: '', 5: ''});

    setCount(0);
    setCountStatus(false);
    Api.registerApi({
      name: auth.name,
      email: auth.email,
      password: auth.password,
      phone: auth.phone,
    })
      .then(async e => {
        // console.log("e?.data: ", e?.data?.data.key)
        dispatch({
          type: 'SMS_SEND',
          payload: {
            key: e?.data?.data?.key,
            name: auth.name,
            email: auth.email,
            password: auth.password,
            phone: auth.phone,
          },
        });
        // navigation.navigate("Verify")
      })
      .catch(err => {
        // console.log(err);
        dispatch({type: actionUser.ACTION_REGISTER_LOADING});
      });
  };

  async function ChechCode() {
    if (
      OTP[0] != '' &&
      OTP[1] != '' &&
      OTP[2] != '' &&
      OTP[3] != '' &&
      OTP[4] != '' &&
      OTP[5] != ''
    ) {
      if (isObjValid(OTP)) {
        var code = Object.values(OTP).join('');
      }
      await registerOk({code: code, key: auth.key});
    } else {
      Alert.alert(t('error_phone'), t('error_phone2'), [{text: 'OK'}]);
    }
  }
  useEffect(() => {
    if (isObjValid(OTP)) {
      var code = Object.values(OTP).join('');
      console.log(code.length == 6);
      if (code.length == 6) {
        registerOk({code: code.trim(), key: auth.key});
      }
    }
  }, [OTP[0], OTP[1], OTP[2], OTP[3], OTP[4], OTP[5]]);

  const registerOk = data => {
    console.log('registerOk', data);
    dispatch({type: actionUser.ACTION_REGISTER_LOADINGOTHER});
    Api.verfyApi(data)
      .then(async e => {
        // console.log("e?.data?.data: ", e?.data?.data)
        await setUser(e?.data?.data);
        await setStoreToken(e?.data?.data?.token);
        dispatch({
          type: actionUser.ACTION_REGISTER,
          payload: e.data.data,
        });
        console.log(e.data);
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('+++++++++++++++++++');
        console.log(err);
        dispatch({type: actionUser.ACTION_REGISTER_LOADING});
      });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBarHeight backgroundColor={lightColors.red} />
      <HeaderBlock
        title={'SMS'}
        height={50}
        onPress={() => navigation.navigate('Register')}
        iconName={<ArrowBackIcon fill={lightColors.iconColor} />}
        backgroundColor={lightColors.red}
      />
      <View
        style={{
          flex: 0.7,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <InputTextComponent
          placeholder={'смс код...'}
          keyboardType="numeric"
          style={{
            width: 150,
            height: 65,
            fontSize: 24,
            padding: 15,
          }}
          name={'sms'}
          //   value={smsFormat(reg.code)}
          //   onChangeText={e => setReg({...reg, code: e})}
        /> */}
        <Text
          style={{
            color: '#000',
            fontWeight: '500',
            fontSize: 20,
          }}>
          {'+998 '}
          {auth.phone} {t('view_phone')}
        </Text>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignContent: 'center',
            width: '100%',
          }}>
          {inputs.map((inp, index) => (
            <TextInput
              key={index.toString()}
              value={OTP[index]}
              onChangeText={text => handleChangeText(text, index)}
              name={'sms'}
              placeholder={'0'}
              keyboardType="numeric"
              maxLength={1}
              style={styles.inputCode}
              ref={nextInputIndex === index ? inputRef : null}
            />
          ))}
        </View>
        {countStatus ? (
          <IconTextButton
            // width={windowWidth-20}
            onPress={() => Restart()}
            // iconName={auth.loading?<ActivityIndicator size="small" color="#fff"/>:null}
            borderRadius={5}
            title={'Рестарт'}
            margin={12}
            // backgroundColor={lightColors.buttonColor}
            justifyContent={'center'}
            alignItems={'center'}
            style={{color: lightColors.buttonColor}}
          />
        ) : (
          <ArilaRegular
            style={{
              color: lightColors.textDark,
              fontSize: fontType.text_20,
              padding: 10,
            }}>
            {59 - count}
          </ArilaRegular>
        )}
      </View>
      {/*<IconTextButton*/}
      {/*    disabled={auth.loading}*/}
      {/*    // onPress={registerOk}*/}
      {/*    // iconName={auth.loading?<ActivityIndicator size="small" color="#fff"/>:null}*/}
      {/*    borderRadius={5}*/}
      {/*    paddingVertical={8}*/}
      {/*    title={"Войти"}*/}
      {/*    margin={12}*/}
      {/*    backgroundColor={lightColors.buttonColor1}*/}
      {/*    justifyContent={"center"}*/}
      {/*    alignItems={"center"}*/}
      {/*/>*/}
      {/*<ScrollView  showsVerticalScrollIndicator={false}>*/}
      {/*    /!* <StatusBarComponent barStyle={"dark-content"}/> *!/*/}
      {/*    <View style={{alignItems:"center", marginTop:windowHeight/8}}>*/}
      {/*        <Image style={{width:150,height:160}} source={require('../../../assets/image/ic_victory_launcher.png')}/>*/}
      {/*    </View>*/}
      {/*    <InputTextComponent*/}
      {/*        // input={inputName}*/}
      {/*        placeholder={"Имя пользователя..."}*/}
      {/*        name={"name"}*/}
      {/*        value={reg.name}*/}
      {/*        onChangeText={e => setReg({...reg, name: e})}*/}
      {/*    />*/}
      {/*    <InputTextComponent*/}
      {/*        // input={inputName}*/}
      {/*        placeholder={"Эл. адрес..."}*/}
      {/*        name={"email"}*/}
      {/*        value={reg.email}*/}
      {/*        onChangeText={e => setReg({...reg, email: e})}*/}
      {/*    />*/}
      {/*    <InputTextComponent*/}
      {/*        // input={inputName}*/}
      {/*        keyboardType="numeric"*/}
      {/*        placeholder={"Телефон..."}*/}
      {/*        name={"phone"}*/}
      {/*        value={phoneFormat(reg.phone)}*/}
      {/*        onChangeText={e => setReg({...reg, phone: e.split(' ').join('')})}*/}
      {/*    />*/}
      {/*    <InputPasswordComponent*/}
      {/*        placeholder={"Пароль..."}*/}
      {/*        name={"password"}*/}
      {/*        secureTextEntry={true}*/}
      {/*        value={reg.password}*/}
      {/*        onChangeText={e => setReg({...reg, password: e})}*/}
      {/*    />*/}
      {/*    <IconTextButton*/}
      {/*        disabled={auth.loading}*/}
      {/*        onPress={registerOk}*/}
      {/*        iconName={auth.loading?<ActivityIndicator size="small" color="#fff"/>:null}*/}
      {/*        borderRadius={5}*/}
      {/*        paddingVertical={8}*/}
      {/*        title={"Войти"}*/}
      {/*        margin={12}*/}
      {/*        backgroundColor={lightColors.buttonColor1}*/}
      {/*        justifyContent={"center"}*/}
      {/*        alignItems={"center"}*/}
      {/*    />*/}
      {/*    <IconTextButton*/}
      {/*        // width={windowWidth-20} */}
      {/*        onPress={()=>navigation.navigate("Login")}*/}
      {/*        // iconName={auth.loading?<ActivityIndicator size="small" color="#fff"/>:null}*/}
      {/*        borderRadius={5}*/}
      {/*        title={"Авторизоваться"}*/}
      {/*        margin={12}*/}
      {/*        // backgroundColor={lightColors.buttonColor}*/}
      {/*        justifyContent={"center"}*/}
      {/*        alignItems={"center"}*/}
      {/*        style={{color:lightColors.buttonColor}}*/}
      {/*    />*/}
      {/*</ScrollView>*/}
    </View>
  );
};
export default Verify;
const styles = StyleSheet.create({
  inputCode: {
    backgroundColor: '#f5f4f2',
    fontWeight: '600',
    alignSelf: 'center',
    margin: 5,
    padding: 10,
    fontSize: 20,
    height: 55,
    width: '10%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    textAlign: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
