import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/client';

import { client } from '../services/config/game.service'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import store from '../store'

import StartGame from '../screens/home/StartGame'
import Quiz from '../screens/quiz/Quiz';
import Result from '../screens/quiz/Result';
import Settings from '../screens/settings/Settings';
import Splash from '../screens/splash/Splash';

const Stack = createStackNavigator();

AppRegistry.registerComponent('TriviaGame', () => Navigation);
export default function Navigation() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Splash" component={Splash} />
                        <Stack.Screen name="StartGame" component={StartGame} />
                        <Stack.Screen name="Quiz" component={Quiz}/>
                        <Stack.Screen name="Result" component={Result}/>
                        <Stack.Screen name="Settings" component={Settings}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ApolloProvider>
        </Provider>
    )
}