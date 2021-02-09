import axios from 'axios'

import { Types } from '../../store/ducks/quiz/questions'

const opentdbServer = 'https://opentdb.com/api.php'
const loadQuestions = async (dispatch, getState) => {
    try {
        const { numberOfQuestions, level, type } = getState().settings
        let queryParams = `?amount=${numberOfQuestions}`
        // let queryParams = '?amount=1'

        if(level !== 'any') {
            queryParams += `&level=${level}`
        }

        if(type !== 'any') {
            queryParams += `&type=${type}`
        }

        const res = await axios.get(`${opentdbServer}${queryParams}`)
        dispatch({ type: Types.HANDLE_LOADED_QUESTIONS, questions: res.data.results })
    } catch(err) {
        console.log(err)
    }
}

export {
    loadQuestions
}