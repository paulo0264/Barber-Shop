import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Preload from '../screens/Preload';
import SignIn from '../screens/Signin';
import SignUp from '../screens/Signup';
import MainTab from '../stacks/MainTab';


const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
    initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTab" component={MainTab} />
     </Stack.Navigator>
);