import { combineReducers } from 'redux'

import quiz from './quiz/questions'
import settings from './settings/settings'
import home from './home/home'

export default combineReducers({
    quiz,
    settings,
    home
})