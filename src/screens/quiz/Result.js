import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, BackHandler, SafeAreaView, FlatList, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux'
import { Types } from '../../store/ducks/quiz/questions'
import { Colors, Typography } from '../../styles'
import { Bold } from '../../utils/ViewUtils'

export default function Result(props) {
    const questions = useSelector(state => state.quiz.questions)
    const numberOfRightQuestions = useSelector(state => state.quiz.numberOfRightQuestions)
    const numberOfQuestions = useSelector(state => state.quiz.numberOfQuestions)
    const nickName = useSelector(state => state.settings.nickName)
    const dispatch = useDispatch()

    const onBackPressed = () => {
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPressed)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPressed)
    }, [])

    const Item = ({ data }) => {
        return (
            <>
                <View style={styles.questionItemContainer}>
                    <Icon
                        name={data.isQuestionAnsweredRight ? 'plus' : 'minus'}
                        size={Platform.OS === 'ios' ? 25 : 20}
                        color={data.isQuestionAnsweredRight ? Colors.positive : Colors.negative} />

                    <Text style={styles.questionContainer}>{data.question}</Text>
                </View>
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}><Bold>your answer:</Bold> {`${data.answer}`}</Text>
                </View>

                <View style={styles.divider} />
            </>
        )
    }

    const renderItem = ({ item }) => {
        return <Item data={item} />
    }

    const playAgain = () => {
        dispatch({ type: Types.PLAY_AGAIN })
        props.navigation.navigate('Quiz')
    }

    const newGame = () => {
        dispatch({ type: Types.PLAY_AGAIN })
        props.navigation.reset({
            index: 0,
            routes: [ { name: 'StartGame' } ]
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text testID="scoreTitle" style={styles.scoreText}>{nickName}, You scored</Text>
                <Text testID="score" style={styles.scoreText}>{numberOfRightQuestions} / {numberOfQuestions}</Text>
            </View>

            <FlatList
                testID="resultList"
                style={styles.resultList}
                data={questions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity testID="plaAgainButton" style={styles.button} onPress={playAgain} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>PLAY AGAIN?</Text>
                </TouchableOpacity>
                <TouchableOpacity testID="newGameButton" style={styles.button} onPress={newGame} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>NEW GAME</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    answerContainer: {
        marginEnd: 16,
        marginStart:30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap'
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: Platform.OS === 'ios' ? 10 : 0
    },
    button: {
        width: Platform.OS === 'ios' ? '43%' : '45%',
        height: Platform.OS === 'ios' ? 44 : 35,
        margin: Platform.OS === 'ios' ? 15 : 10,
        backgroundColor: Colors.primary,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.white,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        fontSize: Typography.FONT_SIZE_16,
    },
    questionItemContainer: {
        flexDirection: 'row',
        margin: Platform.OS === 'ios' ? 30 : 20
    },
    questionContainer: {
        marginStart: 15,
        flexShrink: 1,
        fontSize: Typography.FONT_SIZE_16
    },
    answerText: {
        fontSize: Typography.FONT_SIZE_14
    },
    divider: {
        borderBottomColor: Colors.silver,
        borderBottomWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        margin: 16
    },
    resultList: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 120 : 70,
        bottom: Platform.OS === 'ios' ? 70 : 45
    },
    scoreContainer: {
        alignItems: 'center',
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    scoreText: {
        marginStart: 16,
        marginEnd: 16,
        flexShrink: 1,
        fontSize: Typography.FONT_SIZE_24,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    }
})