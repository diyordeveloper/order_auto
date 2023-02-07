import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MyAnonsVerticalSlider from "../slider/MyAnonsVerticalSlider";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import { lightColors } from "../../utils/themeColors";
import { CarFlatList, MyAnonsList } from "../../service/apiFunction";
import { ArilaRegular } from "../text/ArialRegular";
import { SpeenLoader } from "../SpeenLoader";

export const MyAnonsFlatListComponent =({onPress, navigation, userId})=>{
    const {t} = React.useContext(LocalizationContext);
    const [page, setPage] = useState(1);
    const [ status, setStatus ] = useState(true)
    const dispatch = useDispatch()
    const cars = useSelector(state => state.myAnons);
    const auth = useSelector(state => state.auth);

    const requestAPI = (page) => {
        dispatch({
            type:"MY_ANONS_API_REQUEST",
            payload:{ page:page }
        })
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!cars.loading) {
                setStatus(false)
            }
          }, 1000);
          return () => clearTimeout(timer);
    }, [cars]);

    useEffect(() => {
        if(page===1){
            requestAPI(page);
        }
        else{
            requestAPI(page);
            let user_id = userId?auth._id:""
            dispatch(MyAnonsList(page, user_id))
        }
    }, [page])

    const fetchMoreData = () => {
        if (!cars.isListEnd && !cars.moreLoading) {
            setPage(page + 1)
        }
    }

    const renderHeader = () => (
        <Text style={styles.title}>RN News</Text>
    )
    const renderFooter = () => (
        <View style={styles.footerText}>
            {cars.moreLoading && <ActivityIndicator />}
            {!status && cars.isListEnd && <ArilaRegular style={{color:lightColors.textDark}} >{t("no_data")} </ArilaRegular>}
        </View>
    )

    const renderEmpty = () => (
        <View style={[styles.emptyText,{ flex:status?1:0 }]}>
            {status && <SpeenLoader /> } 
        </View>
    )

    return (
            <FlatList
                contentContainerStyle={{flexGrow: 1}}
                data={cars?.data}
                renderItem={({ item }) => (
                    <MyAnonsVerticalSlider data={item} navigation={navigation} onPress={onPress}/>
                )}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={1}
                ListEmptyComponent={renderEmpty}
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
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})