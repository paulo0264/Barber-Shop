import React, {useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';

import { 
    Container,
    Image,
    View,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
 } from './styles';

 import Api from '../../Api';

 import SignInput from '../../components/Signinput';

 import EmailIcon from '../../assets/email.svg';
 import LockIcon from '../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    const [emailField, setEmailField] =useState('');
    const [passwordField, setPasswordField] =useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){

            let json = await Api.signIn(emailField, passwordField);
            //console.log(json);
            if(json.token){
                await AsyncStorage.setItem('token', json.token);

                //Salvar no context
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });

            }else{
                alert("Email ou Senha errados!");
            }

        }else{
            alert("Preencha os Campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }

    return (
        <Container>
            <View>
                <Image source={require('../../assets/logo.png')} />
            </View>

            <InputArea>
                
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu Email"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />

                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua Senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui um conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}