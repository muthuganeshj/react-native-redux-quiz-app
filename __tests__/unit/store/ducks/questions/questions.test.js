import reducer, { Types, transformQuestions, isRightQuestion, updateQuestionAnswer, updateNumberOfRightQuestions } from '../../../../../src/store/ducks/quiz/questions'

const questionTrueFalseOptions = [
    {
        key: 'true',
        text: 'True'
    },
    {
        key: 'false',
        text: 'False'
    }
]

const questionFalseTrueOptions = [
    {
        key: 'false',
        text: 'False'
    },
    {
        key: 'true',
        text: 'True'
    }
]

const questions = [
    {
        'category': 'Vehicles',
        'type': 'boolean',
        'difficulty': 'hard',
        'question': 'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
        'correct_answer': 'True',
        'incorrect_answers': [
            'False'
        ]
    },
    {
        'category': 'History',
        'type': 'boolean',
        'difficulty': 'hard',
        'question': 'Japan was part of the Allied Powers during World War I.',
        'correct_answer': 'True',
        'incorrect_answers': [
            'False'
        ]
    },
    {
        'category': 'History',
        'type': 'boolean',
        'difficulty': 'hard',
        'question': 'The Battle of Trafalgar took place on October 23rd, 1805',
        'correct_answer': 'False',
        'incorrect_answers': [
            'True'
        ]
    },
]

const questionsAfterTransformation = [
    {
        id: 0,
        category: 'Vehicles',
        question: 'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
        correctAnswer: 'true',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionFalseTrueOptions
    },
    {
        id: 1,
        category: 'History',
        question: 'Japan was part of the Allied Powers during World War I.',
        correctAnswer: 'true',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionFalseTrueOptions
    },
    {
        id: 2,
        category: 'History',
        question: 'The Battle of Trafalgar took place on October 23rd, 1805',
        correctAnswer: 'false',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionTrueFalseOptions
    }
]

const transformedQuestions = transformQuestions(questions)

const questionAnsweredWithTrue = [
    {
        id: 0,
        category: 'Vehicles',
        question: 'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
        correctAnswer: 'true',
        isQuestionAnsweredRight: true,
        answer: true,
        questionOptions: questionFalseTrueOptions
    },
    {
        id: 1,
        category: 'History',
        question: 'Japan was part of the Allied Powers during World War I.',
        correctAnswer: 'true',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionFalseTrueOptions
    },
    {
        id: 2,
        category: 'History',
        question: 'The Battle of Trafalgar took place on October 23rd, 1805',
        correctAnswer: 'false',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionTrueFalseOptions
    }
]

const questionAnsweredWithFalse = [
    {
        id: 0,
        category: 'Vehicles',
        question: 'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
        correctAnswer: 'true',
        isQuestionAnsweredRight: false,
        answer: false,
        questionOptions: questionFalseTrueOptions
    },
    {
        id: 1,
        category: 'History',
        question: 'Japan was part of the Allied Powers during World War I.',
        correctAnswer: 'true',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionFalseTrueOptions
    },
    {
        id: 2,
        category: 'History',
        question: 'The Battle of Trafalgar took place on October 23rd, 1805',
        correctAnswer: 'false',
        isQuestionAnsweredRight: false,
        answer: null,
        questionOptions: questionTrueFalseOptions
    }
]

describe('questions-hanleLoadedQuestionss reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
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
            })
    })

    it('should return the correct state after handling the questions loaded action', () => {
        expect(reducer({}, {
            type: Types.HANDLE_LOADED_QUESTIONS,
            questions
        })).toEqual({
            numberOfQuestions: questions.length,
            question: transformedQuestions[0],
            questions: transformedQuestions,
            originalQuestions: transformedQuestions,
        })
    })

    it('should return the correct questions after transforming the questions returned form backend', () => {
        expect(transformQuestions(questions))
            .toEqual(questionsAfterTransformation)
    })
})

describe('questions-isRightQuestion reducer', () => {
    it('should return true when the correct answer returned from the backend matches true', () => {
        expect(isRightQuestion(true, transformedQuestions[0]))
            .toBeTruthy()
    })

    it('should return true when the correct answer returned from the backend matches false', () => {
        expect(isRightQuestion(false, transformedQuestions[2]))
            .toBeTruthy()
    })

    it('should return false when the correct answer returned from the backend does not match true', () => {
        expect(isRightQuestion(false, transformedQuestions[0]))
            .toBeFalsy()
    })

    it('should return false when the correct answer returned from the backend does not match false', () => {
        expect(isRightQuestion(true, transformedQuestions[2]))
            .toBeFalsy()
    })
})

describe('questions-answerQuestion reducer', () => {
    it('should return wrong questions in the state when questions answer is true but it is sent false', () => {
        expect(reducer({
            index: 0,
            numberOfRightQuestions: 0,
            nextButtonDisabled: true,
            questions: questionsAfterTransformation
        }, {
            type: Types.ANSWER_QUESTION,
            value: false
        })).toEqual({
            index: 0,
            questions: questionAnsweredWithFalse,
            nextButtonDisabled: false,
            numberOfRightQuestions: 0,
        })
    })

    it('should return right questions in the state when questions answer is true but it is sent true', () => {
        expect(reducer({
            index: 0,
            numberOfRightQuestions: 0,
            nextButtonDisabled: true,
            questions: questionsAfterTransformation
        }, {
            type: Types.ANSWER_QUESTION,
            value: true
        })).toEqual({
            index: 0,
            questions: questionAnsweredWithTrue,
            nextButtonDisabled: false,
            numberOfRightQuestions: 1,
        })
    })
})

describe('questions-updateNumberOfRightQuestions reducer', () => {
    it('should return 1 when there is only one questions answered correct', () => {
        const numberOfRightQuestions = updateNumberOfRightQuestions(questionAnsweredWithTrue)
        expect(numberOfRightQuestions).toBe(1)
    })

    it('should return 0 when there is no question answered correct', () => {
        const numberOfRightQuestions = updateNumberOfRightQuestions(questionAnsweredWithFalse)
        expect(numberOfRightQuestions).toBe(0)
    })

    it('should return 0 when no questions are sent', () => {
        const numberOfRightQuestions = updateNumberOfRightQuestions(null)
        expect(numberOfRightQuestions).toBe(0)
    })

    it('should return 1 when there are two questions answered correct', () => {
        const questions = [
            {
                id: 0,
                category: 'Vehicles',
                question: 'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
                correctAnswer: 'true',
                questionAnswerLabel: 'Correct',
                answer: true,
                questionOptions: questionFalseTrueOptions
            },
            {
                id: 1,
                category: 'History',
                question: 'Japan was part of the Allied Powers during World War I.',
                correctAnswer: 'true',
                questionAnswerLabel: null,
                answer: null,
                questionOptions: questionFalseTrueOptions
            },
            {
                id: 2,
                category: 'History',
                question: 'The Battle of Trafalgar took place on October 23rd, 1805',
                correctAnswer: 'false',
                questionAnswerLabel: 'Correct',
                answer: false,
                questionOptions: questionTrueFalseOptions
            }
        ]

        const numberOfRightQuestions = updateNumberOfRightQuestions(questions)
        expect(numberOfRightQuestions).toBe(2)
    })
})

describe('questions-updateQuestionAnswer reducer', () => {
    it('should return wrong question when the correct answer is not false', () => {
        const newQuestions = updateQuestionAnswer(0, false, questionsAfterTransformation)
        expect(newQuestions).toEqual(questionAnsweredWithFalse)
    })

    it('should return right question when the correct answer is true', () => {
        const newQuestions = updateQuestionAnswer(0, true, questionsAfterTransformation)
        expect(newQuestions).toEqual(questionAnsweredWithTrue)
    })

    it('should return wrong question and questions array structure be different', () => {
        const newQuestions = updateQuestionAnswer(0, false, questionsAfterTransformation)
        expect(newQuestions).not.toEqual(questionAnsweredWithTrue)
    })

    it('should return wrong question and questions array structure be different', () => {
        const newQuestions = updateQuestionAnswer(0, true, questionsAfterTransformation)
        expect(newQuestions).not.toEqual(questionAnsweredWithFalse)
    })
})

describe('questions-playAgain reducer', () => {
    it('should return the initial state of the game', () => {
        expect(reducer({
            index: 3,
            currentQuestion: 4,
            displayResults: false,
            questionChanged: 0,
            nextButtonDisabled: false,
            questions: questionAnsweredWithFalse,
            question: questionAnsweredWithFalse[0],
            originalQuestions: questionsAfterTransformation,
            numberOfRightQuestions: 2
        }, {
            type: Types.PLAY_AGAIN
        })).toEqual({
            index: 0,
            currentQuestion: 1,
            displayResults: false,
            questionChanged: 0,
            nextButtonDisabled: true,
            questions: questionsAfterTransformation,
            question: questionsAfterTransformation[0],
            originalQuestions: questionsAfterTransformation,
            numberOfRightQuestions: 0
        })
    })
})

describe('questions-nextQuestion reducer', () => {
    it('should return the next question', () => {
        expect(reducer({
            index: 0,
            currentQuestion: 1,
            numberOfQuestions: 10,
            displayResults: false,
            questionChanged: 0,
            nextButtonDisabled: false,
            questions: questionsAfterTransformation,
            question: questionsAfterTransformation[0],
            originalQuestions: questionsAfterTransformation,
            numberOfRightQuestions: 0
        }, {
            type: Types.NEXT_QUESTION
        })).toEqual({
            index: 1,
            currentQuestion: 2,
            numberOfQuestions: 10,
            displayResults: false,
            questionChanged: 1,
            nextButtonDisabled: true,
            questions: questionsAfterTransformation,
            question: questionsAfterTransformation[1],
            originalQuestions: questionsAfterTransformation,
            numberOfRightQuestions: 0
        })
    })

    it('should return the same question when it is the last one', () => {
        expect(reducer({
            index: 9,
            currentQuestion: 10,
            numberOfQuestions: 10,
            displayResults: false,
            questionChanged: 9,
            nextButtonDisabled: false,
            questions: questionsAfterTransformation,
            question: questionsAfterTransformation[9],
            originalQuestions: questionsAfterTransformation,
            numberOfRightQuestions: 0
        }, {
            type: Types.NEXT_QUESTION
        })).toEqual({
            index: 10,
            currentQuestion: 10,
            numberOfQuestions: 10,
            displayResults: true,
            questionChanged: 10,
            nextButtonDisabled: true,
            questions: questionsAfterTransformation,
            question: questionsAfterTransformation[9],
            originalQuestions: questionsAfterTransformation,
            numberOfRightQuestions: 0
        })
    })
})