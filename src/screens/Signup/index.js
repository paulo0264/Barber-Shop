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
 import PersonIcon from '../../assets/person.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] =useState('');    
    const [emailField, setEmailField] =useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(nameField != '' && emailField != '' && passwordField != ''){

            let res = await Api.signUp(nameField, emailField, passwordField);
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

            }else{
                alert("Erro: "+res.error);
            }

        }else{
           alert("Preencha os Campos"); 
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <View>
                <Image source={require('../../assets/logo.png')} />
            </View>

            <InputArea>

                <SignInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu Nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />
                
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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui um conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}