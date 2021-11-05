import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #000;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const View = styled.View`

    justify-content: center;
    align-items: center;
`;
export const Image = styled.Image`
    width: 200px;
    height: 260px;
`;
export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #0000CD;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    margin-left: 5px;
`;
