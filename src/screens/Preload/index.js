import React, { useEffect, useContext } from 'react';
import { Image } from 'react-native';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token){
               let res = await Api.checkToken(token);
               if(res.token){
                await AsyncStorage.setItem('token', res.token);
                
                //Salvar no context
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });

               } else{
                    navigation.navigate('SignIn'); 
               }
            }else{
                    navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <Image source={require('../../assets/logo.png')} />
            <LoadingIcon size="large" color="white" />
        </Container>
    );
}