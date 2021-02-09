import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Game from './Game'
import About from './About'
import History from './History'
import { Colors } from '../../styles'
import { Platform } from 'react-native'

const Tab = createBottomTabNavigator();

export default function Settings() {

    const gameTabBarIcon = ({ focused, color, size }) => {
        const iconName = focused ? 'home' : 'home-outline'
        return <Ionicons name={iconName} size={size} color={color} />
    }

    const tabBarOptions = {
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.black,
        labelStyle: {
            fontSize: Platform.OS === 'ios' ? 15 : 12,
        }
    }

    const historyTabBarIcon = ({ focused, color, size }) => {
        const iconName = focused ? 'analytics' : 'analytics-outline'
        return <Ionicons name={iconName} size={size} color={color} />
    }

    const aboutTabBarIcon = ({ focused, color, size }) => {
        const iconName = focused ? 'information-circle' : 'information-circle-outline'
        return <Ionicons name={iconName} size={size} color={color} />
    }

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen options={{ tabBarIcon: gameTabBarIcon }} name="Game" component={Game} />
            <Tab.Screen options={{ tabBarIcon: historyTabBarIcon }} name="History" component={History} />
            <Tab.Screen options={{ tabBarIcon: aboutTabBarIcon }} name="About" component={About} />
        </Tab.Navigator>
    )
}