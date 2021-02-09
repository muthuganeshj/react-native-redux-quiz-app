import { createActions, createReducer } from 'reduxsauce'
import { decode } from 'html-entities'

const INITIAL_STATE = {
    index: 0,
    currentQuestion: 1,
    numberOfQuestions: 0,
    displayResults: false,
    questionChanged: 0,
    nextButtonDisabled: true,
    questionOptions: [],
    question: {},
    questions: [],
    numberOfRightQuestions: 0,
    originalQuestions: [],
}

export const { Types, Creators } = createActions({
    answerQuestion: [ 'value' ],
    handleLoadedQuestions: [ 'questions' ],
    nextQuestion: [],
    playAgain: []
})

export const transformQuestions = (questions) => {
    const questionTransformation = questions.map((question, index) => {
        const options = question.incorrect_answers.concat(question.correct_answer)
        const questionOptions = options
            .map(option => {
                return {
                    key: option.toLowerCase(),
                    text: option
                }
            })

        return {
            id: index,
            category: question.category,
            question: decode(question.question),
            correctAnswer: question.correct_answer.toLowerCase(),
            isQuestionAnsweredRight: false,
            answer: null,
            questionOptions
        }
    })

    return questionTransformation
}
const handleLoadedQuestions = (state, action) => {
    const { questions } = action
    const questionTransformation = transformQuestions(questions)
    const validQuestions = questionTransformation && questionTransformation.length > 0

    return {
        ...state,
        questions: questionTransformation,
        originalQuestions: questionTransformation,
        question: validQuestions ? questionTransformation[0] : {},
        numberOfQuestions: validQuestions ? questionTransformation.length : 0
    }
}

export const isRightQuestion = (value, question) => {
    return `${value}` === question.correctAnswer
}

export const updateNumberOfRightQuestions = (questions) => {
    let rightQuestionCounter = 0

    questions && questions.map(question => {
        const rightQuestion = isRightQuestion(question.answer, question)
        rightQuestionCounter = rightQuestion ? rightQuestionCounter + 1 : rightQuestionCounter
    })

    return rightQuestionCounter
}

export const updateQuestionAnswer = (index, value, questions) => {
    const newQuestions = questions && index >= 0 && index < questions.length ?
        questions.map(question => {
            if (question.id === questions[index].id) {
                question.answer = value
                question.isQuestionAnsweredRight = isRightQuestion(value, questions[index])
            }

            return question
        }) : []

    return newQuestions
}

const answerQuestion = (state, action) => {
    const newQuestions = updateQuestionAnswer(state.index, action.value, state.questions)
    const rightQuestionCounter = updateNumberOfRightQuestions(newQuestions)

    return {
        ...state,
        questions: newQuestions,
        nextButtonDisabled: false,
        numberOfRightQuestions: rightQuestionCounter
    }
}
const playAgain = (state, action) => {
    return {
        ...state,
        index: 0,
        currentQuestion: 1,
        displayResults: false,
        questionChanged: 0,
        nextButtonDisabled: true,
        questions: state.originalQuestions,
        question: state.originalQuestions[0],
        numberOfRightQuestions: 0
    }
}

const nextQuestion = (state, action) => {
    const index = state.index + 1
    const validIndex = index <= state.numberOfQuestions
    const indexOutOfRange = index >= state.numberOfQuestions

    const nextQuestion = validIndex && index < state.numberOfQuestions ?
        state.questions[index] :
        state.questions[state.index]

    const newCurrentQuestion = validIndex && index < state.numberOfQuestions ?
        state.currentQuestion + 1 :
        state.currentQuestion

    return {
        ...state,
        nextButtonDisabled: true,
        question: nextQuestion,
        currentQuestion: newCurrentQuestion,
        index: validIndex ? index : state.index,
        questionChanged: validIndex ? index : state.questionChanged,
        displayResults: indexOutOfRange ? true : false
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.ANSWER_QUESTION]: answerQuestion,
    [Types.HANDLE_LOADED_QUESTIONS]: handleLoadedQuestions,
    [Types.NEXT_QUESTION]: nextQuestion,
    [Types.PLAY_AGAIN]: playAgain,
})