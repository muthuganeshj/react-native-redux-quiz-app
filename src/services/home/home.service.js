import { Types } from '../../store/ducks/home/home'

const loadBasicInformation = async (dispatch, getState) => {
    const numberOfQuestions = getState().settings.numberOfQuestions
    const type = getState().settings.type
    const questionTypeOptions = getState().settings.questionTypeOptions
    const info = {
        numberOfQuestions,
        type,
        questionTypeOptions
    }

    dispatch({ type: Types.HANDLE_BASIC_INFORMATIONS, info })
}

export {
    loadBasicInformation
}