import { DEFAULT_TIME_OUT } from '../utils/constant.utils'
import { goToEndOfQuestion } from '../utils/questions.utils'

describe('Quiz Screen', () => {
    beforeAll(async () => {
        await device.launchApp();

        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('BEGIN')).tap()
    })

    it('should have a headline of question', async () => {
        await waitFor(element(by.id('headline'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a next button', async () => {
        await waitFor(element(by.id('nextButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have false option', async () => {
        await waitFor(element(by.id('false'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have true option', async () => {
        await waitFor(element(by.id('false'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should select an option then click next', async () => {
        await waitFor(element(by.id('nextButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await waitFor(element(by.id('false'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('false')).tap()
        await element(by.id('nextButton')).tap()
    })

    it('should number of question counter be initially set to 1 of 10', async () => {
        await device.reloadReactNative()
        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('BEGIN')).tap()
        await waitFor(element(by.id('questionCounter'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await waitFor(element(by.text('1 of 10'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should number of question counter increase when next is clicked', async () => {
        await device.reloadReactNative()
        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('BEGIN')).tap()
        await waitFor(element(by.id('nextButton'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await waitFor(element(by.id('false'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('false')).tap()
        await element(by.id('nextButton')).tap()
        await waitFor(element(by.id('questionCounter'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await waitFor(element(by.text('2 of 10'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should go until the end of the questions', async () => {
        await device.reloadReactNative()
        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('BEGIN')).tap()

        await goToEndOfQuestion(10)
    })
})
