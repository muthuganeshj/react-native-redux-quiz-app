import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles'

export default function QuestionButton(props) {

    const styles = StyleSheet.create({
        button: {
            height: Platform.OS === 'ios' ? 44 : 35,
            backgroundColor: props.disabled ? Colors.disabled : Colors.primary,
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

    return (
        <TouchableOpacity testID={props.testID} style={styles.button} onPress={() => props.action()} disabled={props.disabled} activeOpacity={0.7}>
            <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
    )
}