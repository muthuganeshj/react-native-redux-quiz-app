import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, BackHandler, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import DisplayQuestion from '../../components/quiz/DisplayQuestion'
import QuestionButton from '../../components/quiz/QuestionButton'
import QuestionHeadline from '../../components/quiz/QuestionHeadline'

import { useSelector, useDispatch } from 'react-redux'
import { Types } from '../../store/ducks/quiz/questions';
import QuestionCounter from '../../components/quiz/QuestionCounter'
import AnswerContainer from '../../components/quiz/AnswerContainer'
import RadioButton from '../../components/ui/RadioButton'

import { loadQuestions } from '../../services/quiz/questions.service'
import { gql, useMutation } from '@apollo/client'

import { isNetworkAvailable } from '../../utils/NetworkUtils'
import { Card } from 'react-native-paper'
import { Colors } from '../../styles'

export default function Quiz(props) {

    const displayResults = useSelector(state => state.quiz.displayResults)
    const nextButtonDisabled = useSelector(state => state.quiz.nextButtonDisabled)
    const options = useSelector(state => state.quiz.question.questionOptions)
    const numberOfRightQuestions = useSelector(state => state.quiz.numberOfRightQuestions)
    const numberOfQuestions = useSelector(state => state.quiz.numberOfQuestions)

    const NEW_GAME_MUTATION = gql`
        mutation History($data: HistoryInput!) {
            saveNewGame(data: $data) {
                id
                maxQuestion
                numberOfRightQuestions
                creation_at
            }
        }
    `

    const onBackPressed = () => {
        Alert.alert(
            'Quiz',
            'Do you really wanna leave?',
            [
                {
                    text: 'CANCEL', onPress: () => {}
                },
                {
                    text: 'LEAVE', onPress: () => {
                        props.navigation.goBack(null)
                        dispatch({ type: Types.PLAY_AGAIN })
                    }
                }
            ]
        )

        return true
    }

    const [ saveNewGame ] = useMutation(NEW_GAME_MUTATION)
    const dispatch = useDispatch()

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPressed)

        if (isNetworkAvailable()) {
            dispatch(loadQuestions)
        } else {
            Alert.alert(
                'Ops!',
                'Something went wrong. Try it again',
                [
                    {
                        text: 'OK', onPress: () => dispatch(loadQuestions)
                    }
                ])
        }
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPressed)
    }, [])

    useEffect(() => {
        if (displayResults) {

            saveNewGame({
                variables: {
                    data: {
                        maxQuestion: numberOfQuestions,
                        numberOfRightQuestions
                    }
                }
            })

            props.navigation.navigate('Result')
        }
    }, [ displayResults ])

    const questionAnswer = (value) => dispatch({ type: Types.ANSWER_QUESTION, value })
    const action = () => dispatch({ type: Types.NEXT_QUESTION })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <QuestionHeadline testID="headline" style={styles.headline} />
                <Card style={styles.question}>
                    <Card.Content>
                        <DisplayQuestion />
                        <AnswerContainer>
                            {
                                options &&
                                options.length > 0 ?
                                    <RadioButton options={options} action={questionAnswer} /> :
                                    <ActivityIndicator style={styles.loading} color={Colors.primary} size='large' />
                            }
                        </AnswerContainer>
                    </Card.Content>
                </Card>
                <QuestionCounter testID="questionCounter" />
            </ScrollView>

            <View style={styles.button}>
                <QuestionButton testID="nextButton" title='Next' action={action} disabled={nextButtonDisabled} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    headline: {
        marginBottom: 20,
        margin: 16
    },
    question: {
        minHeight: 300,
        marginBottom: 12,
        marginStart: 16,
        marginEnd: 16
    },
    button: {
        justifyContent: 'flex-end'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})