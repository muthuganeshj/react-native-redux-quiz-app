import AsyncStorage from '@react-native-community/async-storage'
import { Types } from '../../store/ducks/settings/settings'

import { loadBasicInformation } from '../home/home.service'

const saveNumberOfQuestions = (value) => {
    return (disptach, getState) => {
        const state = {
            ...getState().settings,
            numberOfQuestions: value
        }

        saveSettingsState(disptach, state)
    }
}

const saveQuestionLevel = (value) => {
    return (disptach, getState) => {
        const state = {
            ...getState().settings,
            level: value
        }

        saveSettingsState(disptach, state)
    }
}

const saveQuestionType = (value) => {
    return (disptach, getState) => {
        const state = {
            ...getState().settings,
            type: value
        }

        saveSettingsState(disptach, state)
    }
}

const saveNickName = (value) => {
    return (disptach, getState) => {
        const state = {
            ...getState().settings,
            nickName: value
        }

        saveSettingsState(disptach, state)
    }
}

const saveQuestionOptions = (config) => {
    const { questionOptions, questionLevelOptions, questionTypeOptions } = config
    return (disptach, getState) => {
        const state = {
            ...getState().settings,
            questionOptions,
            questionLevelOptions,
            questionTypeOptions
        }
        saveSettingsState(disptach, state)
    }
}

const saveSettingsState = (disptach, state) => {
    disptach({ type: Types.HANDLE_SETTINGS, savedState: state })
    AsyncStorage.setItem(
        'settingsState',
        JSON.stringify({
            state,
        }),
    );
    disptach(loadBasicInformation)
}

const loadSettingsState = async (disptach, getState) => {
    try {
        const stateJson = await AsyncStorage.getItem('settingsState')
        const savedState = JSON.parse(stateJson) || getState().settings;

        disptach({ type: Types.HANDLE_SETTINGS, savedState: savedState.state })
    } catch(err) {
        console.log(err)
    }
}

export {
    loadSettingsState,
    saveNumberOfQuestions,
    saveQuestionLevel,
    saveQuestionType,
    saveNickName,
    saveQuestionOptions
}