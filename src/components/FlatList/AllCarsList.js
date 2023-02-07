import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MyAnonsVerticalSlider from "../slider/MyAnonsVerticalSlider";
import { LocalizationContext } from "../../i18n/LocaleProvider";
import { lightColors } from "../../utils/themeColors";
import { CarFlatList, AllCarsApiList } from "../../service/apiFunction";
import { ArilaRegular } from "../text/ArialRegular";
import AllCarList from "../slider/AllCarList";

export const AllCarsList =({onPress, navigation, userId})=>{
    const {t} = React.useContext(LocalizationContext);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const cars = useSelector(state => state.allCars);
    const auth = useSelector(state => state.auth);
    // console.log(cars);
    const requestAPI = (page) => {
        dispatch({
            type:"ALL_CARS_API_REQUEST",
            payload:{ page:page }
        })
    }

    useEffect(() => {
        if(page===1){
            requestAPI(page);
        }
        else{
            requestAPI(page);
            dispatch(AllCarsApiList(page, ""))
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
            {cars.isListEnd && <ArilaRegular style={{color:lightColors.textDark}} >{t("no_data")} </ArilaRegular>}
        </View>
    )

    const renderEmpty = () => (
        <View style={styles.emptyText}>
            <Text>Empty</Text>
        </View>
    )

    return (
            <FlatList
                contentContainerStyle={{flexGrow: 1}}
                data={cars?.data}
                renderItem={({ item }) => (
                    <AllCarList data={item} navigation={navigation} onPress={onPress}/>
                )}
                ListFooterComponent={renderFooter}
                // ListEmptyComponent={renderEmpty}
                onEndReachedThreshold={1}
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