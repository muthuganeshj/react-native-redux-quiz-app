import reducer, { Types } from '../../../../../src/store/ducks/home/home'

const questionTypeOptions = [
    {
        key: 'boolean',
        text: 'True or False'
    },
    {
        key: 'multiple',
        text: 'Multiple Choice'
    },
    {
        key: 'any',
        text: 'Mixed'
    }
]

const booleanText = 'True or False'
const multipleText = 'Multiple Choice'
const anyText = 'Mixed'

describe('home reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            intoductionText: ''
        })
    })

    it('should return text with 10 questions and True or False as question type when values are not provided', () => {
        expect(reducer({}, {
            type: Types.HANDLE_BASIC_INFORMATIONS,
            info: {
                numberOfQuestions: null,
                type: 'boolean',
                questionTypeOptions: []
            }
        })).toEqual({
            intoductionText: `You will be presented with 10 ${booleanText} questions.`
        })
    })

    it('should return text with 20 questions and True or False as question type', () => {
        expect(reducer({}, {
            type: Types.HANDLE_BASIC_INFORMATIONS,
            info: {
                numberOfQuestions: 20,
                type: 'boolean',
                questionTypeOptions
            }
        })).toEqual({
            intoductionText: `You will be presented with 20 ${booleanText} questions.`
        })
    })

    it('should return text with 30 questions and True or False as question type', () => {
        expect(reducer({}, {
            type: Types.HANDLE_BASIC_INFORMATIONS,
            info: {
                numberOfQuestions: 30,
                type: 'boolean',
                questionTypeOptions
            }
        })).toEqual({
            intoductionText: `You will be presented with 30 ${booleanText} questions.`
        })
    })

    it('should return text with 10 questions and True or False as question type', () => {
        expect(reducer({}, {
            type: Types.HANDLE_BASIC_INFORMATIONS,
            info: {
                numberOfQuestions: 10,
                type: 'boolean',
                questionTypeOptions
            }
        })).toEqual({
            intoductionText: `You will be presented with 10 ${booleanText} questions.`
        })
    })

    it('should return text with 10 questions and Multiple Choice as question type', () => {
        expect(reducer({}, {
            type: Types.HANDLE_BASIC_INFORMATIONS,
            info: {
                numberOfQuestions: 10,
                type: 'multiple',
                questionTypeOptions
            }
        })).toEqual({
            intoductionText: `You will be presented with 10 ${multipleText} questions.`
        })
    })

    it('should return text with 10 questions and Mixed as question type', () => {
        expect(reducer({}, {
            type: Types.HANDLE_BASIC_INFORMATIONS,
            info: {
                numberOfQuestions: 10,
                type: 'any',
                questionTypeOptions
            }
        })).toEqual({
            intoductionText: `You will be presented with 10 ${anyText} questions.`
        })
    })
})