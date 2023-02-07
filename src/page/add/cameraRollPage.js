import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View,Image,PermissionsAndroid,ScrollView,Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { StatusBarHeight } from '../../components/StatusBar/StatusBarHeight';
import { HeaderBlock } from '../../components/HeaderBlock';
import { ArrowBackIcon, DoneIcon, LikeIcon } from '../../components/icon';
import { lightColors } from '../../utils/themeColors';
import { windowWidth } from '../../utils/constant';
import { LocalizationContext } from '../../i18n/LocaleProvider';

export const CameraRollPage =({navigation})=>{
  const imageDetalis = useSelector(state => state.imageDetalis);
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();

  const [state, setState] = useState([])
  const [changeImage, setChangeImage] = useState(imageDetalis.images)
  const [imageFirst, setImageFirst] = useState(undefined)
  const [index,setIndex] = useState(10)
  console.log("imageDetalis", imageDetalis);
async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function savePicture() {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.getPhotos({
    first: 100,
    assetType: imageDetalis.type,
  })
  .then(r => {
    // console.log(r.edges);
    setState(r.edges);
  })
  .catch((err) => {
  });
};
useEffect(() => {
  savePicture()
}, [])

const onChangeImage =(image)=> {
  // console.log(image.split('/').pop());
  if(changeImage.length<5)
  {
    if(changeImage.length === 0){
      setChangeImage([image])
    }
    else if(!changeImage.includes(image)){
      setChangeImage([...changeImage, image])
    }
    else if(changeImage.includes(image)){
      var index = changeImage.indexOf(image); // Let's say it's Bob.
      changeImage.splice(index, 1);
      setChangeImage(changeImage)
    }
  }
  else if(changeImage.includes(image)){
    var index = changeImage.indexOf(image); // Let's say it's Bob.
    changeImage.splice(index, 1);
    setChangeImage(changeImage)
  }
}
// console.log("changeImage", changeImage);
const onChangeDone = () =>{
  dispatch({
    type:"IMAGE_DETALIS",
    payload: { images:changeImage }
  })
  navigation.navigate("Add")
}
// console.log("changeImage", changeImage);
  return (
    <View style={{flex:1,borderWidth:1}}>
      {/* <StatusBarComponent barStyle={'dark-content'}/> */}
      <StatusBarHeight backgroundColor={lightColors.red}/>
          <HeaderBlock 
              title={"Image"}
              height={50}
              onPress={()=>navigation.goBack()}
              onPress1={()=>onChangeDone()}
              iconName={<ArrowBackIcon fill={lightColors.iconColor}/>}
              iconName1={<DoneIcon fill={lightColors.iconColor}/>}
              backgroundColor={lightColors.red}
          />
         <ScrollView
            showsVerticalScrollIndicator={false}
         >
          <View style={src.content}>
          {state?.map((p, i) => {
            
                return (
                  <TouchableOpacity style={src.imgCheck} activeOpacity={0.8} onPress={()=>onChangeImage(p.node.image.uri)}>
                    <Image
                      key={i}
                      style={src.contentImage}
                      source={{ uri: p.node.image.uri }}
                    />
                    {
                      changeImage.includes(p.node.image.uri) && <View style={[src.contentImageBlock]}>
    
                      </View>
                    }
                  </TouchableOpacity>
                  );
            })}
          </View>
        </ScrollView>
    </View>
  );
}

const src = StyleSheet.create({
  content:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap"
  },
  contentImage:{
    margin:2,
    width:windowWidth/3-5,
    height:windowWidth/3-5,
  },
  contentImageBlock:{
    margin:2,
    width:windowWidth/3-5,
    height:windowWidth/3-5,
    borderWidth:1, 
    position:"absolute", 
    backgroundColor:lightColors.backgroundColorDark,
    opacity:0.8
  },
  imgCheck:{
    position:"relative"
  }
})