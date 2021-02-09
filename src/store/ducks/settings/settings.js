import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
    numberOfQuestions: 10,
    level: 'medium',
    type: 'boolean',
    nickName: 'Wagner',
    questionTypeOptions: [],
    questionOptions: [],
    questionLevelOptions: [],
}

export const { Types, Creators } = createActions({
    handleSettings: [ 'savedState' ],
})

function handleSettings(state = INITIAL_STATE, action) {
    state = action.savedState ? action.savedState : state
    return {
        ...state
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.HANDLE_SETTINGS]: handleSettings
})