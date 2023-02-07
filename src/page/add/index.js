import React,{useEffect,useState} from 'react';
import { View,Image,PermissionsAndroid,ScrollView, TouchableOpacity } from 'react-native';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { StatusBarComponent } from '../../components/StatusBar/StatusBarComponent';
import { StatusBarHeight } from '../../components/StatusBar/StatusBarHeight';
import { HeaderBlock } from '../../components/HeaderBlock';
import { ArrowBackIcon, DoneIcon, LikeIcon } from '../../components/icon';
import { lightColors } from '../../utils/themeColors';
import I18n from 'i18n-js';
import { windowWidth } from '../../utils/constant';
import { LocalizationContext } from '../../i18n/LocaleProvider';

export const ChangeImage =({navigation})=>{
  const {t} = React.useContext(LocalizationContext);
  const [state, setState] = useState()
  const [groupNames, setGroupNames] = useState("All")
  const [imageFirst, setImageFirst] = useState(undefined)
  const [index,setIndex] = useState(10)

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  const _handleButtonPress = async() => {
    // if (hasAndroidPermission())CameraRoll.getPhotos({
    //     first: 1000,
    //     assetType: 'Photos',
    //     // groupName: groupNames,
    //     groupTypes: "All",
    //   })
    //   .then(r => {
    //     // console.log(11111111, r.edges[0].node.image.uri);
    //     setImageFirst(r.edges[0].node.image.uri);
    //     setState({ photos: r.edges });
    //   })
    //   .catch((err) => {
    //     setState()
    //     setImageFirst()
    //   });
    };
    useEffect(() => {
      _handleButtonPress()
    }, [groupNames])

    useEffect(() => {
      setGroupNames("Pictures")
    }, [])

    const onChangeFun=(e)=>{
      setGroupNames(e);
    }
    const ImageFirst=(e)=>{
      setImageFirst(e);
    }
    // console.log(imageFirst);
  return (
    <View style={{flex:1,borderWidth:1}}>
      {/* <StatusBarComponent barStyle={'dark-content'}/> */}
      <StatusBarHeight backgroundColor={lightColors.red}/>
          <HeaderBlock 
              title={t("sell")}
              height={50}
              // onPress={()=>navigation.goBack()}
              onPress1={()=>navigation.navigate("AddCarrInput")}
              // iconName={<ArrowBackIcon fill={lightColors.iconColor}/>}
              iconName1={<DoneIcon fill={lightColors.iconColor}/>}
              backgroundColor={lightColors.red}
          />
          {/* <ImageComponent height={windowHeight/2-80} src={imageFirst} resizeMode={"cover"}/>
            <View style={{  
                width:windowWidth,
                height:50,
                backgroundColor:lightColors.red, 
                justifyContent:"center"}}>

              <SelectInput style={{color:"#fff", fontFamly:arial_bold}} onChangeFun={onChangeFun} value={groupNames} array={photoName}/>
            </View> */}
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{ flex:1,flexDirection:"row",flexWrap:"wrap", justifyContent:"flex-start"}}>
              {state&&state.photos.map((p, i) => {
                  return (
                    <TouchableOpacity onPress={(e)=>ImageFirst(p.node.image.uri)}>
                      <Image
                        key={i}
                        style={{
                          width: (windowWidth/3)-1,
                          height: (windowWidth/3)-1,
                          // margin:1,
                        }}
                        source={{ uri: p.node.image.uri }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
    </View>
  );
}

// const AddPage = StyleSheet.create({
//   content:{
//     borderWidth:1,
//     flex:1,
//     // flexDirection:"column",
//   },
//   topBarContent:{
//     // height:"40%",
//     flex:0.06,
//     width:windowWidth,
//     // borderWidth:1,   
//     flexDirection:"row",
//     justifyContent:"space-between",
//     paddingLeft:15,
//     paddingRight:15,
//     alignItems:"center"
//   },
//   nextPage:{
//     // borderWidth:1,
//     width:40,
//     borderRadius:100,
//     height:40,
//     padding:2,
//   },
//   titleText:{
//     fontFamily:"Roboto-Bold",
//     fontSize:20,
//     fontWeight:"500"
//   },
//   imageContent:{
//     // height:"40%",
//     flex:0.44,
//     width:windowWidth,
//     borderWidth:1,
    
//   },
//   topMidlleImg:{
//     width:windowWidth,
//     height:"100%"
//   },
//   galleryContent:{
//     // height:"60%",
//     flex:0.5,
//     width:windowHeight,
//     borderWidth:1,
//   },
//   galleryContentTop:{
//     width:windowHeight,
//     height:50,
//     borderWidth:1,
//   }

// })
// export default ChangeImage