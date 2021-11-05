import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'expo-permissions';
import * as Permissions from 'expo-permissions';
//import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api';

import { 
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea,

} from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    // ########### PERMISSÃO PARA USAR LOCALIZAÇÃO #############

    const handleLocationFinder = async () => {
        setCoords(null);
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            //return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            setLoading(true);
            setLoadingText('');
            setList([]);
            
                //getBarbers();

        } else {
            throw new Error('Location permission not granted');
        }
        getBarbers();
        
        /*setCoords(null);
        let result = await request(
            
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if(result == 'granted') {

            setLoading(true);
            setLoadingText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();
            });

        }*/
    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let log = null;
        if(coords){
            lat = coords.latitude;
            log = coords.longitude;
        }

        let res = await Api.getBarbers(lat, log, locationText);
        //console.log(res);
        if(res.error == ''){
            if(res.loc){
                setLocationText(res.loc);
            }
            setList(res.data);
        }else{
            alert("Erro: "+res.error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }

    return (
        <Container>
            <Scroller RefreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o Seu Cabeleleiro Favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#fff" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?"
                        placeholderTextColor="#000"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#000" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
        
    );
}