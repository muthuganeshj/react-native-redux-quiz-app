import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, SafeAreaView, Platform } from 'react-native'
import { Typography, Colors } from '../../styles'

import { useSelector } from 'react-redux'

export default function StartGame(props) {

    const intoductionText = useSelector(state => state.home.intoductionText)
    const startGame = () => props.navigation.navigate('Quiz')
    const settings = () => props.navigation.navigate('Settings')

    return (
        <SafeAreaView style={styles.container}>
            <Text testID="welcomeMessage" style={styles.welcomeGame}>Welcome to the Trivia Challenge!</Text>
            <Text style={styles.gameDescription}>{intoductionText}</Text>
            <Text style={styles.gameChallengeQuestion}>Can you score 100%?</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startGame} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>BEGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={settings} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>SETTINGS</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    welcomeGame: {
        flex: 1,
        width: '50%',
        fontSize: Typography.FONT_SIZE_24,
        lineHeight: Typography.LINE_HEIGHT_30,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        margin: 12
    },
    gameDescription: {
        flex: 1,
        width: '60%',
        fontSize: Typography.FONT_SIZE_24,
    },
    gameChallengeQuestion: {
        flex: 1,
        width: '60%',
        fontSize: Typography.FONT_SIZE_24,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        width: '45%',
        height: Platform.OS === 'ios' ? 44 : 35,
        margin: 10,
        backgroundColor: Colors.primary,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.white,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        fontSize: Typography.FONT_SIZE_16,
    }
})