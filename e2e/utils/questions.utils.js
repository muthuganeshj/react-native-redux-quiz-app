import { DEFAULT_TIME_OUT } from './constant.utils'

export async function goToEndOfQuestion(numberOfQuestions) {
    for (let i = 1; i <= numberOfQuestions; i++) {
        await waitFor(element(by.id('nextButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await waitFor(element(by.id('false'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)

        await waitFor(element(by.id('questionCounter'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await expect(element(by.id('questionCounter'))).toHaveText(`${i} of ${numberOfQuestions}`)

        await element(by.id('false')).tap()
        await element(by.id('nextButton')).tap()
    }
}