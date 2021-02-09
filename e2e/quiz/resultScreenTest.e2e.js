import { DEFAULT_TIME_OUT } from '../utils/constant.utils'
import { goToEndOfQuestion } from '../utils/questions.utils'

describe('Quiz Screen', () => {
    beforeAll(async () => {
        await device.launchApp();

        await device.reloadReactNative()

        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('BEGIN')).tap()
        await goToEndOfQuestion(10)
    })

    it('should see the result score title', async () => {
        await waitFor(element(by.id('scoreTitle'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should see the result score', async () => {
        await waitFor(element(by.id('score'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should see the play again button', async () => {
        await waitFor(element(by.id('plaAgainButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should see the new game button', async () => {
        await waitFor(element(by.id('newGameButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should see the result list', async () => {
        await waitFor(element(by.id('resultList'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should see the quiz from begining', async () => {
        await waitFor(element(by.id('resultList'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('plaAgainButton')).tap()
        await waitFor(element(by.id('headline'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should see the start game screen', async () => {
        await device.reloadReactNative()
        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('BEGIN')).tap()
        await goToEndOfQuestion(10)

        await waitFor(element(by.id('newGameButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('newGameButton')).tap()
        await waitFor(element(by.id('welcomeMessage'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })
})