import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import { CarFlatList, VideoAllList, VideoShowList } from "../../service/apiFunction";
import HorizantalScroll from "../slider/HorizontalScrollComponent";
import { SpeenLoader } from "../SpeenLoader";
import { VideoNotFoundIcon } from "../icon";
import { lightColors } from "../../utils/themeColors";

export const VideoFlatList =({onPress})=>{
    const {t} = React.useContext(LocalizationContext);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const video = useSelector(state => state.video);
    // console.log("video", video);
    const requestAPI = (page) => {
        dispatch({
            type:"VIDEO_API_REQUEST",
            payload:{ page:page }
        })
    }
    // const onPressShow=(id)=>{
    //     console.log(id);
    //     dispatch(VideoShowList(id))
    // }
    useEffect(() => {
        if(page===1){
            requestAPI(page);
        }
        else{
            requestAPI(page);
            dispatch(VideoAllList(page))
        }
    }, [page])
    const fetchMoreData = () => {
        if (!video.isListEnd && !video.moreLoading) {
            setPage(page + 1)
        }
    }

    const renderHeader = () => (
        <Text style={styles.title}>RN News</Text>
    )
    const renderFooter = () => (
        <View style={styles.footerText}>
            {video.moreLoading && <SpeenLoader />}
        </View>
    )
    const renderEmpty = () => (
        <View style={styles.emptyText}>
            {!video.loading?<TouchableOpacity activeOpacity={1} onPress ={()=>dispatch(VideoAllList(1))} style={{ height:70, width:70, borderRadius:50, padding:10, backgroundColor:lightColors.red }}>
                <VideoNotFoundIcon fill={"#fff"} size={50} />
            </TouchableOpacity>:<SpeenLoader />}
        </View>
    )

    return (
        <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                data={video?.data}
                // showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                    <HorizantalScroll width={150} height={250} data={item} onPress={onPress}/>
                )}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                // onEndReachedThreshold={0.5}
                numColumns={1}
                alwaysBounceVertical={true}
                bounces={false}
                disableVirtualization={false}
                onEndReached={fetchMoreData}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        marginVertical: 15,
        marginHorizontal: 10
    },
    loading: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})