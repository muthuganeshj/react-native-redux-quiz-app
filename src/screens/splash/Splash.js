import React, { useEffect } from 'react'
import { SafeAreaView, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native';

import { useDispatch } from 'react-redux'
import { loadSettingsState } from '../../services/settings/settings.service'
import { loadBasicInformation } from '../../services/home/home.service'

import { loadRemoteConfig } from '../../services/config/remote.config.service'
import '../../error/GlobalErrorHandling'

export default function Splash(props) {

    const dispatch = useDispatch()

    const prepareApp = () => {
        Promise.all([
            dispatch(loadRemoteConfig),
            dispatch(loadSettingsState),
            dispatch(loadBasicInformation)
        ]).then(_ => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [ {
                        name: 'StartGame'
                    },
                    ] })
            )
        }).catch(err => {
            Alert.alert(
                'Ops!',
                'Something went wrong. Try it again',
                [
                    {
                        text: 'OK', onPress: () => prepareApp()
                    }
                ])
            console.log(err)
        })
    }
    useEffect(() => {
        prepareApp()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                testID="logoSplash"
                source={require('../../assets/imgs/splash_trivia.png')} />
            <ActivityIndicator testID="loadingSplash" color="#25AEDE" size="large" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})