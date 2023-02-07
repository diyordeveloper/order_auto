import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {HeaderBlock} from '../../components/HeaderBlock';
import {IconTextButton} from '../../components/IconTextButton';
import InputComponent from '../../components/Input/InputTextComponent';
import {StatusBarHeight} from '../../components/StatusBar/StatusBarHeight';
import {parseToNumber, phoneFormat, windowWidth} from '../../utils/constant';
import {lightColors} from '../../utils/themeColors';
import {ImageIcon, VideoIcon} from '../../components/icon';
import {LocalizationContext} from '../../i18n/LocaleProvider';
import {getStoreToken, MainApi} from '../../service';
import {useIsFocused} from '@react-navigation/native';
import {SpeenLoader} from '../../components/SpeenLoader';
import {ModaleRadioInput} from '../../components/Input/ModaleRadioInput';
import {
  address,
  color,
  fuelType,
  kuzuv,
  marka,
  model,
  perevod,
  transmission,
  typeCuzov,
  yoqilgi,
} from '../../utils/date';
import InputTextAreaComponent from '../../components/Input/InputTextAreaComponent';
import {CarFlatList} from '../../service/apiFunction';

const UploadModal = ({modalShow, setModalShow, onPressModal}) => {
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(!modalShow);
      }}>
      <Pressable
        onPress={() => setModalShow(!modalShow)}
        style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              onPressModal('photo');
            }}
            activeOpacity={0.8}
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: '#727272',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageIcon fill={'#000'} size={32} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onPressModal('video');
            }}
            activeOpacity={0.8}
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: '#727272',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VideoIcon fill={'#000'} size={40} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export const AddCarrInput = ({navigation}) => {
  const dispatch = useDispatch();

  const {t} = React.useContext(LocalizationContext);
  const lang = t('long') === 'ru';
  const auth = useSelector(state => state.auth);
  const {_id} = auth;
  const [modalShow, setModalShow] = useState(false);
  const [imageAll, setImageAll] = useState([]);
  const [status, setStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(true);
  const [videoStatus, setVideoStatus] = useState(true);
  const [videoAll, setVideoAll] = useState([]);
  const [uploadType, setUploadType] = useState('photo');
  const [uploadTypeBolean, setUploadTypeBolean] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    type: '',
    cuzov: false,
    perevod: false,
    marka: false,
    color: false,
    madel: false,
    regions: false,
    yoqilgi: false,
    transmission: false,
  });

  const [create, setCreate] = useState({
    userId: _id,
    // photo: [],
    color: '',
    colorru: '',
    divigitel: '',
    kuzuv: '',
    kuzuvru: '',
    madel: '',
    marka: '',
    narxi: '',
    opisaniya: '',
    opisaniyaru: '',
    perevod: '',
    perevodru: '',
    transmission: '',
    transmissionru: '',
    yili: null,
    yoqilgi: '',
    yoqilgiru: '',
    credit: '',
    yurgani: null,
  });

  const changeImages = type => {
    ImagePicker.openPicker({
      // width: windowWidth,
      // height: 300,
      multiple: true,
      cropping: true,
      maxFiles: 10,
      mediaType: 'photo',
    })
      .then(image => {
        setImageAll(image);
        setImageStatus(false);
      })
      .catch(err => {
        setImageAll([]);
        setImageStatus(true);
      });
  };
  const focus = useIsFocused();
  useEffect(() => {
    setCreate({
      userId: _id,
      photo: '',
      color: '',
      colorru: '',
      divigitel: '',
      kuzuv: '',
      kuzuvru: '',
      madel: '',
      marka: '',
      narxi: '',
      opisaniya: '',
      opisaniyaru: '',
      perevod: '',
      perevodru: '',
      transmission: '',
      transmissionru: '',
      yili: null,
      yoqilgi: '',
      yoqilgiru: '',
      credit: '',
      yurgani: null,
    });
    if (!auth.auth) {
      navigation.navigate('Login');
    } else {
      // requestCameraPermission()
    }
  }, [focus]);

  const onOpenAndCloseModal = type => {
    if (type == 'perevod') {
      setModalVisible({...modalVisible, perevod: !modalVisible.perevod});
    }
    if (type == 'cuzov') {
      setModalVisible({...modalVisible, cuzov: !modalVisible.cuzov});
    }
    if (type == 'madel') {
      setModalVisible({...modalVisible, madel: !modalVisible.madel});
    }
    if (type == 'marka') {
      setModalVisible({...modalVisible, marka: !modalVisible.marka});
    }
    if (type == 'regions') {
      setModalVisible({...modalVisible, regions: !modalVisible.regions});
    }
    if (type == 'color') {
      setModalVisible({...modalVisible, color: !modalVisible.color});
    }
    if (type == 'transmission') {
      setModalVisible({
        ...modalVisible,
        transmission: !modalVisible.transmission,
      });
    }
    if (type == 'yoqilgi') {
      setModalVisible({...modalVisible, yoqilgi: !modalVisible.yoqilgi});
    }
  };

  useEffect(() => {
    if (create.photo && create.photo.length >= 0) {
      setImageStatus(false);
    } else {
      setImageStatus(true);
    }
  }, [create.photo]);
  useEffect(() => {
    if (imageAll.length >= 11) {
      // Alert();
      console.log('Maximum 10');
      Alert.alert('', "Rasmlar soni maximum 10 ta bo'lishi kerak", [
        {text: 'OK', onPress: () => changeImages('photo')},
      ]);
      setImageAll([]);
    }
  }, [imageAll]);

  const createCars = async () => {
    let formData = new FormData();
    setStatus(true);
    imageAll.forEach((item, i) => {
      let filename = item.path.split('/').pop();
      console.log('filename', item.mime);
      formData.append('photo', {
        uri: item.path,
        type: item.mime,
        name: filename,
      });
    });
    // console.log(formData);
    let cost = parseToNumber(create.narxi).replace(/(.{3})/g, '$1');
    let number = create?.number?.replace(' ', '').replace(' ', '');
    console.log(number);
    formData.append('userId', create.userId);
    formData.append('madel', create.madel);
    formData.append('madelru', create.madel);
    formData.append('marka', create.marka);
    formData.append('markaru', create.marka);
    formData.append('color', create.color);
    formData.append('colorru', create.colorru);
    formData.append('yili', create.yili * 1);
    // formData.append('divigitelru', create.divigitel);
    formData.append('divigitel', create.divigitel * 1);
    formData.append('yoqilgiru', create.yoqilgiru);
    formData.append('yoqilgi', create.yoqilgi);
    formData.append('transmissionru', create.transmissionru);
    formData.append('transmission', create.transmission);
    formData.append('kuzuvru', create.kuzuvru);
    formData.append('kuzuv', create.kuzuv);
    formData.append('perevodru', create.perevodru);
    formData.append('perevod', create.perevod);
    formData.append('yurgani', create.yurgani * 1);
    formData.append('narxi', cost);
    formData.append('opisaniya', create.opisaniya);
    formData.append('opisaniyaru', create.opisaniyaru);
    formData.append('region', create.region);
    formData.append('country', '');
    formData.append('number', number * 1);
    const token = await getStoreToken();
    console.log('formData', formData);
    // console.log("uploadType", uploadTypeBolean);
    // let url = uploadTypeBolean ? '/video/add' : '/car/add'
    // // console.log("url", url);
    fetch(`http://185.196.214.145:5000/car/add`, {
      method: 'post',
      headers: {
        // Accept: 'application/json, text/plain, */*',
        Accept: 'application/json, text/plain, */*',
        ContentType: 'multipart/form-data',
        Authorization: token,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        setStatus(false);
        // dispatch({
        //   type: "ACTION_CARS_IMAGE",
        //   payload: res?.data
        // })
        // console.log("res", res);
        setImageAll([]);
        setImageStatus(false);
        setCreate({
          userId: _id,
          photo: '',
          color: '',
          colorru: '',
          divigitel: '',
          kuzuv: '',
          kuzuvru: '',
          madel: '',
          marka: '',
          narxi: '',
          opisaniya: '',
          opisaniyaru: '',
          perevod: '',
          perevodru: '',
          transmission: '',
          transmissionru: '',
          yili: null,
          yoqilgi: '',
          yoqilgiru: '',
          credit: '',
          yurgani: null,
        });
      })
      .catch(err => {
        setStatus(false);
        setImageAll([]);
        setImageStatus(false);
        // console.error("error uploading images: ", err);
      });
  };
  if (!auth.auth) {
    return <SpeenLoader />;
  }

  return (
    <View style={{flex: 1}}>
      <StatusBarHeight />
      <HeaderBlock
        title={t('sell')}
        height={50}
        backgroundColor={lightColors.red}
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            margin: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <TouchableOpacity
            onPress={() => changeImages('photo')}
            activeOpacity={0.8}
            style={{
              width: imageAll.length > 0 ? 110 : '100%',
              height: 110,
              borderWidth: 1,
              borderColor: '#727272',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <ImageIcon
              fill={imageAll.length > 0 ? '#000' : lightColors.red}
              size={42}
            />
            {imageAll.length > 0 ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '800',
                }}>
                {imageAll.length}
              </Text>
            ) : (
              <Text> max:10</Text>
            )}
          </TouchableOpacity>
          {imageAll.length > 0
            ? imageAll.map(img => (
                <TouchableOpacity
                  key={img.path.length}
                  activeOpacity={0.8}
                  style={{
                    width: 110,
                    height: 110,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    source={{uri: img.path}}
                  />
                </TouchableOpacity>
              ))
            : null}
        </View>
        <ModaleRadioInput
          translation={false}
          title={'address'}
          onPress={e => {
            setCreate({...create, region: e.name_uz}),
              onOpenAndCloseModal('regions');
          }}
          data={address}
          value={create.region}
          modalVisible={modalVisible?.regions}
          onClose={() => onOpenAndCloseModal('regions')}
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
          <InputComponent
            keyboardType="numeric"
            placeholder={'__ ___ __ __'}
            name={'number'}
            value={phoneFormat(create?.number)}
            onChangeText={e => setCreate({...create, number: e})}
            style={{
              paddingLeft: 45,
            }}
          />
        </View>
        <ModaleRadioInput
          translation={false}
          title={'mark'}
          onPress={e => {
            setCreate({...create, marka: e.name_uz}),
              onOpenAndCloseModal('marka');
          }}
          data={marka}
          value={create.marka}
          modalVisible={modalVisible?.marka}
          onClose={() => onOpenAndCloseModal('marka')}
        />
        <ModaleRadioInput
          translation={false}
          title={'madel'}
          onPress={e => {
            setCreate({...create, madel: e.name_uz}),
              onOpenAndCloseModal('madel');
          }}
          data={model}
          value={create.madel}
          modalVisible={modalVisible?.madel}
          onClose={() => onOpenAndCloseModal('madel')}
        />
        <ModaleRadioInput
          translation={false}
          title={'color'}
          onPress={e => {
            setCreate({...create, color: e.name_uz, colorru: e.name_ru}),
              onOpenAndCloseModal('color');
          }}
          data={color}
          value={lang ? create.colorru : create.color}
          modalVisible={modalVisible?.color}
          onClose={() => onOpenAndCloseModal('color')}
        />
        <InputComponent
          placeholder={t('year')}
          name={'yili'}
          keyboardType="numeric"
          value={create.yili}
          onChangeText={e => setCreate({...create, yili: e})}
        />
        <InputComponent
          placeholder={t('divegatel_type')}
          name={'divigitel'}
          keyboardType="numeric"
          value={create.divigitel}
          onChangeText={e => setCreate({...create, divigitel: e})}
        />
        <ModaleRadioInput
          translation={false}
          title={'fuel_type'}
          onPress={e => {
            setCreate({...create, yoqilgi: e.name_uz, yoqilgiru: e.name_ru}),
              onOpenAndCloseModal('yoqilgi');
          }}
          data={yoqilgi}
          value={lang ? create.yoqilgiru : create.yoqilgi}
          modalVisible={modalVisible?.yoqilgi}
          onClose={() => onOpenAndCloseModal('yoqilgi')}
        />
        <ModaleRadioInput
          translation={false}
          title={'transmission_type'}
          onPress={e => {
            setCreate({
              ...create,
              transmission: e.name_uz,
              transmissionru: e.name_ru,
            }),
              onOpenAndCloseModal('transmission');
          }}
          data={transmission}
          value={lang ? create.transmissionru : create.transmission}
          modalVisible={modalVisible?.transmission}
          onClose={() => onOpenAndCloseModal('transmission')}
        />
        <ModaleRadioInput
          title={'kuzov_type'}
          translation={false}
          onPress={e => {
            setCreate({...create, kuzuv: e.name_uz, kuzuvru: e.name_ru}),
              onOpenAndCloseModal('cuzov');
          }}
          data={kuzuv}
          value={lang ? create.kuzuvru : create.kuzuv}
          modalVisible={modalVisible?.cuzov}
          onClose={() => onOpenAndCloseModal('cuzov')}
        />
        <ModaleRadioInput
          title={'perevod'}
          translation={false}
          onPress={e => {
            setCreate({...create, perevod: e.name_uz, perevodru: e.name_ru}),
              onOpenAndCloseModal('perevod');
          }}
          data={perevod}
          value={lang ? create.perevodru : create.perevod}
          modalVisible={modalVisible?.perevod}
          onClose={() => onOpenAndCloseModal('perevod')}
        />
        <InputComponent
          keyboardType="numeric"
          placeholder={t('cost')}
          name={'narxi'}
          value={create.narxi}
          onChangeText={e =>
            setCreate({
              ...create,
              narxi: parseToNumber(e).replace(/(.{3})/g, '$1 '),
            })
          }
        />
        <InputComponent
          placeholder={t('km_mileage')}
          name={'yurgani'}
          keyboardType="numeric"
          value={create.yurgani}
          onChangeText={e => setCreate({...create, yurgani: e})}
        />

        <InputTextAreaComponent
          placeholder={t('opisaniya')}
          name={'opisaniya'}
          multiline={true}
          numberOfLines={4}
          value={create.opisaniya}
          onChangeText={e =>
            setCreate({...create, opisaniya: e, opisaniyaru: e})
          }
        />
        <IconTextButton
          disabled={status || imageStatus}
          onPress={createCars}
          iconName={
            status ? <ActivityIndicator size="small" color="#fff" /> : null
          }
          borderRadius={5}
          paddingVertical={8}
          title={t('send')}
          margin={12}
          marginBottom={windowWidth / 2 + 10}
          backgroundColor={lightColors.buttonColor1}
          justifyContent={'center'}
          alignItems={'center'}
        />
      </ScrollView>
    </View>
  );
};
const s = StyleSheet.create({
  imgBlock: {
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.textColor4,
    width: windowWidth,
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    justifyContent: 'space-between',

    alignItems: 'center',
    shadowColor: '#000',
    flexDirection: 'row',
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
    textAlign: 'center',
  },
});
