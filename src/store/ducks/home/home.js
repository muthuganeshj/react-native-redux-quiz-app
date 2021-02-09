import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
    intoductionText: ''
}

export const { Types, Creators } = createActions({
    handleBasicInformations: [ 'info' ]
})

function handleBasicInformations(state, action) {
    const { numberOfQuestions, type, questionTypeOptions } = action.info
    const filteredTypes = questionTypeOptions ? questionTypeOptions.filter(el => el.key === type) : []
    const questionText = filteredTypes && filteredTypes.length > 0 ? filteredTypes[0].text : 'True or False'

    return {
        ...INITIAL_STATE,
        intoductionText: `You will be presented with ${numberOfQuestions || 10} ${questionText} questions.`
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.HANDLE_BASIC_INFORMATIONS]: handleBasicInformations
})