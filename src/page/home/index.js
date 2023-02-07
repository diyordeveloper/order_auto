import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FlatListComponent} from '../../components/FlatList/FlatListComponent';
import {CameraIcon, ChevronRightIcon, SearchIcon} from '../../components/icon';
import {IconViewBlock} from '../../components/IconViewBlock';
import HorizantalScroll from '../../components/slider/HorizontalScrollComponent';
import {ArilaBold} from '../../components/text/ArialBold';
import {ArilaRegular} from '../../components/text/ArialRegular';
import {TitleViewComponent} from '../../components/TitleViewComponent';
import {LocalizationContext} from '../../i18n/LocaleProvider';
import {
  CarFlatList,
  CarShowData,
  VideoAllList,
  VideoShowList,
} from '../../service/apiFunction';
import {dataSlider} from '../../utils/date';
import {useIsFocused} from '@react-navigation/native';
import {fontType, lightColors} from '../../utils/themeColors';
import {SpeenLoader} from '../../components/SpeenLoader';
import {VideoFlatList} from '../../components/FlatList/VideoFlatList';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const state = useSelector(state => state);
  const cars = useSelector(state => state.carFlatList);
  console.log(cars.data.length);
  // console.log(cars.data[5].photo);
  const {carFlatList} = state;
  const dispatch = useDispatch();
  const focus = useIsFocused(); // useIsFocused as shown
  useEffect(() => {
    dispatch(CarFlatList(1, ''));
    dispatch(VideoAllList(1));
  }, []);
  const onOk = id => {
    navigation.navigate('HomeShow');
    dispatch(CarShowData(id));
  };
  const videoShowPage = id => {
    navigation.navigate('VideoPageLink');
    dispatch(VideoShowList(id));
  };
  return (
    <ImageBackground
      source={require('./../../../assets/image/bg_main_screen.jpg')}
      resizeMode="cover"
      style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={homeStyleSheet.container}>
        <View style={homeStyleSheet.containerTop}>
          <Image
            style={{marginTop: 50, width: 150, height: 150}}
            source={require('./../../../assets/image/ic_victory_launcher.png')}
          />
          <View style={homeStyleSheet.containerContent}>
            <TouchableOpacity
              style={homeStyleSheet.containerTopButton}
              activeOpacity={1}
              onPress={() => navigation.navigate('Search')}>
              <SearchIcon size={28} fill={'#fff'} />
              <ArilaRegular style={{marginTop: 3}}>
                {t('search_car')}
              </ArilaRegular>
            </TouchableOpacity>
            <View style={homeStyleSheet.containerTopBlock}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('SearchLast')}
                style={homeStyleSheet.containerTopBCT1}>
                <ArilaRegular style={{color: lightColors.textColor1}}>
                  {t('latest_searches')}
                </ArilaRegular>
                <ChevronRightIcon size={32} fill={lightColors.buttonColor} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('AllCars')}
                style={[homeStyleSheet.containerTopBCT2, {marginBottom: 10}]}>
                <ArilaRegular style={{color: lightColors.buttonColor}}>
                  {t('cars')}
                </ArilaRegular>
                {carFlatList.total > 0 && (
                  <View style={homeStyleSheet.containerTopBCT2Block}>
                    <ArilaBold
                      style={{fontSize: 14, paddingLeft: 4, paddingRight: 5}}>
                      {cars.data.length <= 99 ? `+${cars.data.length}` : `+99`}
                    </ArilaBold>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={homeStyleSheet.containerMiddle}>
                    <View style={homeStyleSheet.containerMiddleTop}>
                            <IconViewBlock 
                                backgroundColor={lightColors.red}
                                borderRadius={5}
                                paddingVertical={4}
                                paddingHorizontal={4}
                                iconName={<CameraIcon size={16} fill={"#fff"}/>}
                                title={t("video_message")}
                                fontType={true}
                                style={{color:lightColors.textColor, marginLeft:5, fontSize:12}}
                            />
                        <ArilaRegular style={{color:lightColors.textDark,fontSize:14, marginLeft:4}}>
                            {t("cars_online")} 
                        </ArilaRegular>
                    </View>
                    <VideoFlatList onPress={videoShowPage}/> */}
        {/* <HorizantalScroll data={dataSlider} width={150} height={250}/> */}

        {/* </View> */}
        <View style={homeStyleSheet.containerButton}>
          <TitleViewComponent
            fontType={true}
            blockStyle={{height: 50, justifyContent: 'center'}}
            paddingHorizontal={10}
            style={{color: lightColors.MAIN_GRAY5}}
            title={t('auto_title')}
          />
          <FlatListComponent navigation={navigation} onPress={e => onOk(e)} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const homeStyleSheet = StyleSheet.create({
  container: {
    // flex:1,
    // borderWidth:1
  },
  containerTop: {
    height: windowHeight / 2 - 20,
    display: 'flex',
    alignItems: 'center',
  },
  containerTopBlock: {
    width: windowWidth - 10,
    marginTop: 10,
    minHeight: 60,
    backgroundColor: lightColors.MAIN_WHITE,
  },
  containerTopBCT1: {
    width: windowWidth - 20,
    margin: 5,
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: lightColors.textColor1,
  },
  containerTopBCT2: {
    width: windowWidth - 20,
    height: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
  },
  containerTopBCT2Block: {
    height: 22,
    minWidth: 40,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: lightColors.red,
  },
  containerContent: {
    minHeight: 120,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    // borderWidth:1,
  },
  containerTopButton: {
    width: windowWidth - 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: lightColors.buttonColor,
    borderRadius: 5,
  },
  containerTopText: {
    marginTop: 2,
    fontSize: fontType.text_16,
    color: lightColors.textColor,
  },
  containerMiddle: {
    minHeight: 300,
    backgroundColor: lightColors.backgroundColor,
  },
  containerMiddleTop: {
    minHeight: 40,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    alignItems: 'center',
  },
  containerButton: {
    backgroundColor: lightColors.backgroundColor,
    minHeight: 150,
  },
  containerMiddleBlock: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 2,
    marginRight: 5,
    backgroundColor: lightColors.red,
  },
});

export default Home;
