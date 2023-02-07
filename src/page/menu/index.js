import I18n from 'i18n-js';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  ChevronRightIcon,
  LikeIcon,
  SearchIcon,
  SettingsIcon,
  PlusIcon,
  AnnouncementIcon,
  LogoutIcon,
  ClearIcon,
} from '../../components/icon';
import {IconTextIconButtom} from '../../components/IconTextIconButtom';
import {ArilaBold} from '../../components/text/ArialBold';
import {windowWidth} from '../../utils/constant';
import {lightColors} from '../../utils/themeColors';
import {ArilaRegular} from '../../components/text/ArialRegular';
import {LocalizationContext} from '../../i18n/LocaleProvider';
import {userLogouts} from '../../service';

export const Menu = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const {t} = React.useContext(LocalizationContext);

  const userLogout = async () => {
    await userLogouts();
    dispatch({type: 'lOGOUT'});
    navigation.navigate('Home');
  };
  return (
    <View style={{flex: 1, backgroundColor: lightColors.backgroundColor1}}>
      {/* <StatusBarComponent barStyle="dark-content"/> */}
      <View style={s.imgBlock}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            maxWidth: 350,
          }}>
          <Image
            style={{width: 70, height: 70, borderRadius: 100}}
            source={require('../../../assets/image/user.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems:'flex-start'
            }}>
            <View>
              <ArilaBold style={{color: lightColors.textDark, marginLeft: 10}}>
                {user?.name ? (
                  user?.name
                ) : (
                  <>
                    <IconTextIconButtom
                      style={{marginTop: 5}}
                      title={'Войти'}
                      paddingHorizontal={10}
                      height={50}
                      textSize={18}
                      onPress={() => navigation.navigate('Login')}
                      activeOpacity={1}
                      textColor={lightColors.textDark}
                      backgroundColor={lightColors.backgroundColor}
                    />
                  </>
                )}
              </ArilaBold>
              {user?.phone && (
                <ArilaRegular
                  style={{
                    fontSize: 12,
                    color: lightColors.textColor4,
                    marginLeft: 10,
                  }}>
                  {user?.phone}
                </ArilaRegular>
              )}
            </View>
            {user?.name ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 30,
                }}>
                <Image
                  //   style={{maxWidth: '100%'}}
                  source={require('../../../assets/icons/address.png')}
                />
                <Text style={{color: lightColors.textDark, marginLeft: 5}}>
                  {user?.region == '' ? user?.region : '...'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        <IconTextIconButtom
          style={{marginTop: 5}}
          title={t('search')}
          paddingHorizontal={10}
          // paddingVertical={10}
          height={50}
          onPress={() => navigation.navigate('Search')}
          iconName={<SearchIcon fill={lightColors.menuColor} />}
          iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
          activeOpacity={1}
          textColor={lightColors.textDark}
          backgroundColor={lightColors.backgroundColor}
        />

        <IconTextIconButtom
          style={{marginTop: 5}}
          title={t('sell')}
          paddingHorizontal={10}
          // paddingVertical={10}
          height={50}
          onPress={() => navigation.navigate('Add')}
          iconName={<PlusIcon fill={lightColors.menuColor} />}
          iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
          activeOpacity={1}
          textColor={lightColors.textDark}
          backgroundColor={lightColors.backgroundColor}
        />
        {/* <IconTextIconButtom
                    style={{marginTop:5}}
                    title={t("publications")} 
                    paddingHorizontal={10}
                    // paddingVertical={10}
                    height={50}
                    onPress={()=>navigation.navigate("Benefits")}
                    iconName={<BookmarkAddedIcon fill={lightColors.menuColor}/>}
                    iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
                    activeOpacity={1}
                    textColor={lightColors.textDark}
                    backgroundColor={lightColors.backgroundColor}
                /> */}
        <IconTextIconButtom
          style={{marginTop: 5}}
          title={t('my_ads')}
          paddingHorizontal={10}
          // paddingVertical={10}
          height={50}
          onPress={() => navigation.navigate('Advertisement')}
          iconName={<AnnouncementIcon fill={lightColors.menuColor} />}
          iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
          activeOpacity={1}
          textColor={lightColors.textDark}
          backgroundColor={lightColors.backgroundColor}
        />
        <IconTextIconButtom
          style={{marginTop: 5}}
          title={t('brane')}
          paddingHorizontal={10}
          // paddingVertical={10}
          height={50}
          onPress={() => navigation.navigate('Favorite')}
          iconName={<LikeIcon fill={lightColors.menuColor} />}
          iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
          activeOpacity={1}
          textColor={lightColors.textDark}
          backgroundColor={lightColors.backgroundColor}
        />
        <IconTextIconButtom
          style={{marginTop: 5}}
          title={t('settings')}
          paddingHorizontal={10}
          height={50}
          // navigation={navigation}
          onPress={() => navigation.navigate('Setting')}
          iconName={<SettingsIcon fill={lightColors.menuColor} />}
          iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
          activeOpacity={1}
          textColor={lightColors.textDark}
          backgroundColor={lightColors.backgroundColor}
        />
        {user.auth && (
          <IconTextIconButtom
            style={{marginTop: 5}}
            title={t('logout')}
            paddingHorizontal={10}
            height={50}
            // navigation={navigation}
            onPress={() => userLogout()}
            iconName={<LogoutIcon fill={lightColors.red} />}
            iconName1={<ChevronRightIcon fill={lightColors.textColor4} />}
            activeOpacity={1}
            textColor={lightColors.red}
            backgroundColor={lightColors.backgroundColor}
          />
        )}
      </View>
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
