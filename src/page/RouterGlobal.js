import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AnnouncementIcon,
  HomeIcon,
  LikeIcon,
  MenuIcon,
  PlusIcon,
} from '../components/icon';
import {menuColor, menuColorOFF} from '../utils/themeColors';
import Home from './home';
import HomeShow from './home/show';
import {StatusBarComponent} from '../components/StatusBar/StatusBarComponent';
import Register from './login/Register';
import Login from './login/Login';
import {getLanguage, getUser} from '../service';
import {actionUser} from '../utils/constant';
import {SplashController} from '../service/SplashController';
import Api from '../service/api';
import {SpeenLoader} from '../components/SpeenLoader';
import ImageHome from './home/image';
import {Menu} from './menu';
import {Favorite} from './favorite';
import {Setting} from './setting';
import {ChangeImage} from './add';
import {AddCarrInput} from './add/addcars';
import FovoriteShow from './favorite/show';
import {LocaleProvider, LocalizationContext} from '../i18n/LocaleProvider';
import {FlatListComponent} from '../components/FlatList/FlatListComponent';
import {Benefits} from './benefits';
import {Advertisement} from './advertisement';
import {Search} from './search';
import {ModaleRadioInput} from '../components/Input/ModaleRadioInput';
import {typeCuzov} from '../utils/date';
import SelectInput from '../components/Input/SelectInput';
import {AllCars} from './home/allCars';
import {CameraRollPage} from './add/cameraRollPage';
import {VideoPage} from './video';
import Verify from './login/Verify';
import {SearchLast} from './search/searchLast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
// const CarsFirstData = () => {
//     const dispatch = useDispatch()
//     Api.carsApi().then(e=>{
//         dispatch({
//             type:actionCars.ACTION_CARS,
//             payload:e?.data?.data
//         })
//         console.log(e?.data?.data);
//     }).catch(err=>{
//         console.log("err", err);
//     })
// }
const defaultNavOptions = {
  animation: 'none',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? 'white' : '',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  // headerTitleStyle: {
  //     fontWeight: '400',
  // },
  // contentContainerStyle: {
  //     backgroundColor: '#fff',
  // },
  // gestureEnabled: true,
  // headerTintColor: Platform.OS === 'android' ? '#222' : "#222",
  //
  // animationEnabled: false,
  // transitionConfig : () => ({
  //     transitionSpec: {
  //         duration: 0,
  //         timing: 0,
  //     },
  //     screenInterpolator: () => {},
  // }),
};
const noHeaderOption = {
  headerShown: false,
  // header: () => null,
};
const Tab = createBottomTabNavigator();
const MainStackNavigator = createNativeStackNavigator();

const MainStack = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MainStackNavigator.Screen
        name="Tap"
        component={BottomMenuNew}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="HomeShow"
        component={HomeShow}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="ImageHome"
        component={ImageHome}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Setting"
        component={Setting}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="FovoriteShow"
        component={FovoriteShow}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="ChangeImage"
        component={ChangeImage}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Benefits"
        component={Benefits}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="AllCars"
        component={AllCars}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="CameraRoll"
        component={CameraRollPage}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Search"
        component={Search}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="SearchLast"
        component={SearchLast}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="VideoPageLink"
        component={VideoPage}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Login"
        component={Login}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Register"
        component={Register}
        options={noHeaderOption}
      />
      <MainStackNavigator.Screen
        name="Verify"
        component={Verify}
        options={noHeaderOption}
      />
    </MainStackNavigator.Navigator>
  );
};

const BotomHeight = 50;
const BottomMenuNew = () => {
  // const [rout,setRout] = useState(false)
  const {t} = useContext(LocalizationContext);
  return (
    <Tab.Navigator
      // initialRouteName="Analytics"

      backBehavior={'initialRoute'}
      //  tabBar={()=>null}
      screenOptions={{
        labelStyle: {
          // height:45,
          // borderWidth:1,
          // fontSize:16,
        },
        style: {backgroundColor: '#fff', height: BotomHeight},
        activeTintColor: 'red',
        inactiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: e => {
            let h_color = e.focused ? menuColor : menuColorOFF;
            return (
              <>
                <View style={LayoutStyle.tabBarLabel}>
                  <HomeIcon fill={h_color} />
                  <Text style={{color: h_color, fontSize: 12}}>
                    {t('home')}
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarLabel: e => {
            let h_color = e.focused ? menuColor : menuColorOFF;
            return (
              <>
                <View style={LayoutStyle.tabBarLabel}>
                  <LikeIcon fill={h_color} />
                  <Text style={{color: h_color, fontSize: 12}}>
                    {t('brane')}
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddCarrInput}
        options={{
          headerShown: false,
          tabBarLabel: e => {
            let h_color = e.focused ? menuColor : menuColorOFF;
            // setRout(e.focused)
            return (
              <>
                <View style={[LayoutStyle.tabBarLabel, {marginBottom: 1}]}>
                  <View
                    style={[LayoutStyle.addNavigation, {borderColor: h_color}]}>
                    <PlusIcon fill={h_color} />
                  </View>
                  <Text style={{color: h_color, fontSize: 12}}>
                    {t('sell')}
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Advertisement"
        component={Advertisement}
        options={{
          headerShown: false,
          tabBarLabel: e => {
            let h_color = e.focused ? menuColor : menuColorOFF;
            return (
              <>
                <View style={LayoutStyle.tabBarLabel}>
                  <AnnouncementIcon fill={h_color} />
                  <Text style={{color: h_color, fontSize: 12}}>
                    {t('my_ads').substring(0, 10)}
                    {t('my_ads').length > 12 ? '...' : null}
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Menu}
        options={{
          headerShown: false,
          tabBarLabel: e => {
            let h_color = e.focused ? menuColor : menuColorOFF;
            return (
              <>
                <View style={LayoutStyle.tabBarLabel}>
                  <MenuIcon fill={h_color} />
                  <Text style={{color: h_color, fontSize: 12}}>
                    {t('menu')}
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ScreenSpidder = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
const RouterGlobal = ({token, navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // console.log("auth.lang: ", auth.lang);
  // const {t, local, setLocale} = useContext(LocalizationContext);

  useEffect(() => {
    getUser()
      .then(e => {
        if (e) {
          dispatch({
            type: actionUser.ACTION_REGISTER,
            payload: e,
          });
        }
        dispatch({type: actionUser.ACTION_REGISTER_SPLASH});
      })
      .then(err => {
        // console.log("err", err);
        dispatch({type: actionUser.ACTION_REGISTER_SPLASH});
      });

    getLanguage().then(e => {
      dispatch({
        type: actionUser.ACTION_AUTH_LANG,
        payload: e,
      });
    });
  }, []);
  return (
    <View style={{height: windowHeight + 35, width: windowWidth}}>
      <LocaleProvider>
        <SplashController />
        <StatusBarComponent barStyle="dark-content" />
        {/*<Register />*/}
        {/*<Verify />*/}
        {auth.loggedIn ? <ScreenSpidder /> : <MainStack />}
      </LocaleProvider>
    </View>
  );
};

// const Heights = windowHeight-71
const LayoutStyle = StyleSheet.create({
  container: {
    flex: 6,
    minHeight: windowHeight,
    // height:windowHeight,
    // height:windowHeight,
    // borderWidth:5,
    // borderWidth:2,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: BotomHeight,
    // borderWidth:2,
    alignItems: 'center',
  },
  // top: {
  //   flex: 0.4,
  //   borderBottomWidth:0.5,
  //   borderTopWidth:0.5,
  //   borderColor:Theme.yellow,
  //   backgroundColor: Theme.white,
  // },
  middle: {
    flex: 5.55,
    backgroundColor: 'white',
  },
  // bottom: {
  // //   flex: 0.45,
  // //   width:"100%",
  // //   borderTopWidth:0.5,
  // //   borderColor:'yellow',
  // //   backgroundColor: 'white',
  // //   justifyContent: "space-evenly",
  // //   flexDirection:"row",
  // //   alignSelf:"center"
  // },
  // buttonNavigation:{
  //   paddingTop:15,
  // },
  addNavigation: {
    // paddingTop:3,
    // paddingLeft:7.5,
    // borderColor:"#fff",
    width: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});
export default RouterGlobal;
