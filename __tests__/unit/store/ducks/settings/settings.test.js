import reducer, { Types } from '../../../../../src/store/ducks/settings/settings'

describe('settings reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            numberOfQuestions: 10,
            level: 'medium',
            type: 'boolean',
            nickName: 'Wagner',
            questionTypeOptions: [],
            questionOptions: [],
            questionLevelOptions: [],
        })
    })

    it('should handle properly the new state', () => {
        expect(reducer({
            numberOfQuestions: 10,
            level: 'medium',
            type: 'boolean',
            nickName: 'Wagner',
            questionTypeOptions: [],
            questionOptions: [],
            questionLevelOptions: [],
        }, {
            type: Types.HANDLE_SETTINGS,
            savedState: {
                numberOfQuestions: 20,
                level: 'hard',
                type: 'multiple',
                nickName: 'Wagner 2',
                questionTypeOptions: [],
                questionOptions: [],
                questionLevelOptions: [],
            }
        })).toEqual({
            numberOfQuestions: 20,
            level: 'hard',
            type: 'multiple',
            nickName: 'Wagner 2',
            questionTypeOptions: [],
            questionOptions: [],
            questionLevelOptions: [],
        })
    })
})