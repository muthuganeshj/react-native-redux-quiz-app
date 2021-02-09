import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'
import { Typography } from '../../styles'

export default function DisplayQuestion() {
    const { question } = useSelector(state => state.quiz.question)

    return (
        <Text style={styles.text}>{question}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
})