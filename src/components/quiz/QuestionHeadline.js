import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useSelector } from 'react-redux'
import { Typography } from '../../styles'

export default function DisplayQuestion(props) {
    const { category } = useSelector(state => state.quiz.question)

    return (
        <View style={props.style}>
            <Text testID={props.testID} style={styles.text}>{category}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    }
})