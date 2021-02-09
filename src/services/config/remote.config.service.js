import { remoteConfig, initializeApp } from './firebase.config'
import { saveQuestionOptions } from '../../services/settings/settings.service'

const loadRemoteConfig = async (dispatch, getState) => {
    let config
    try {
        await initializeApp()
        const questionOptions = JSON.parse(remoteConfig().getString('questionOptions'))
        const questionLevelOptions = JSON.parse(remoteConfig().getString('questionLevelOptions'))
        const questionTypeOptions = JSON.parse(remoteConfig().getString('questionTypeOptions'))
        config = {
            questionOptions,
            questionLevelOptions,
            questionTypeOptions
        }
    } catch(err) {
        config = {
            questionOptions: [
                {
                    'key': '10',
                    'text': '10'
                },
                {
                    'key': '20',
                    'text': '20'
                },
                {
                    'key': '30',
                    'text': '30'
                }
            ],
            questionLevelOptions: [
                {
                    'key': 'easy',
                    'text': 'Easy'
                },
                {
                    'key': 'medium',
                    'text': 'Medium'
                },
                {
                    'key': 'hard',
                    'text': 'Hard'
                },
                {
                    'key': 'any',
                    'text': 'Mixed'
                }
            ],
            questionTypeOptions: [
                {
                    'key': 'boolean',
                    'text': 'True or False'
                },
                {
                    'key': 'multiple',
                    'text': 'Multiple Choice'
                },
                {
                    'key': 'any',
                    'text': 'Mixed'
                }
            ]
        }
    }

    dispatch(saveQuestionOptions(config))
}

export {
    loadRemoteConfig
}