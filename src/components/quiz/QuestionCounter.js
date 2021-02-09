import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'
import { Typography } from '../../styles'

export default function QuestionCounter(props) {
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)
    const numberOfQuestions = useSelector(state => state.quiz.numberOfQuestions)

    return (
        <View style={styles.container}>
            <Text testID={props.testID} style={styles.text}>{currentQuestion} of {numberOfQuestions}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    }
})