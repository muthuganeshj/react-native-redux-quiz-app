import { DEFAULT_TIME_OUT } from '../utils/constant.utils'

describe('Game Settings Screen', () => {
    beforeAll(async () => {
        await device.launchApp()

        await waitFor(element(by.text('SETTINGS'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
    })

    it('should have number of questions', async () => {
        await expect(element(by.text('Number of questions'))).toBeVisible()
    })

    it('should have question level', async () => {
        await expect(element(by.text('Level'))).toBeVisible()
    })

    it('should have question type', async () => {
        await expect(element(by.text('Type'))).toBeVisible()
    })

    it('should have a nickname input text and counter matches', async () => {
        await waitFor(element(by.id('nickName'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('nickName')).clearText()
        await element(by.id('nickName')).typeText('Wagner')
        await waitFor(element(by.text('6 / 15'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a text with nick name updated', async () => {
        await waitFor(element(by.id('nickName'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('nickName')).clearText()
        await element(by.id('nickName')).typeText('Wagner Batista')
        await device.pressBack()
        await device.pressBack()
        await element(by.text('SETTINGS')).tap()
        await waitFor(element(by.id('nickName'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await expect(element(by.id('nickName'))).toHaveText('Wagner Batista')
        await waitFor(element(by.text('14 / 15'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.id('nickName')).clearText()
        await element(by.id('nickName')).typeText('Wagner')
        await device.pressBack()
        await device.pressBack()
        await element(by.text('SETTINGS')).tap()
        await waitFor(element(by.id('nickName'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await expect(element(by.id('nickName'))).toHaveText('Wagner')
        await waitFor(element(by.text('6 / 15'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have question number options', async () => {
        await element(by.text('10')).tap()
        await expect(element(by.text('10'))).toBeVisible()
        await expect(element(by.text('20'))).toBeVisible()
        await expect(element(by.text('30'))).toBeVisible()
        await device.pressBack()
    })

    it('should have question leve options', async () => {
        await element(by.text('Medium')).tap()
        await expect(element(by.text('Easy'))).toBeVisible()
        await expect(element(by.text('Medium'))).toBeVisible()
        await expect(element(by.text('Hard'))).toBeVisible()
        await expect(element(by.text('Mixed'))).toBeVisible()
        await device.pressBack()
    })

    it('should have question type options', async () => {
        await element(by.text('True or False')).tap()
        await expect(element(by.text('True or False'))).toBeVisible()
        await expect(element(by.text('Multiple Choice'))).toBeVisible()
        await expect(element(by.text('Mixed'))).toBeVisible()
        await device.pressBack()
    })

    it('should have a game explanation message with 20 questions', async () => {
        await element(by.text('10')).tap()
        await expect(element(by.text('20'))).toBeVisible()
        await element(by.text('20')).tap()
        await device.pressBack()
        await waitFor(element(by.text('You will be presented with 20 True or False questions.'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
    })

    it('should have a game explanation message with 30 questions', async () => {
        await element(by.text('20')).tap()
        await expect(element(by.text('30'))).toBeVisible()
        await element(by.text('30')).tap()
        await device.pressBack()
        await waitFor(element(by.text('You will be presented with 30 True or False questions.'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
        await element(by.text('30')).tap()
        await expect(element(by.text('10'))).toBeVisible()
        await element(by.text('10')).tap()
    })

    it('should have a game explanation message with Multiple Choice questions', async () => {
        await element(by.text('True or False')).tap()
        await expect(element(by.text('Multiple Choice'))).toBeVisible()
        await element(by.text('Multiple Choice')).tap()
        await device.pressBack()
        await waitFor(element(by.text('You will be presented with 10 Multiple Choice questions.'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
    })

    it('should have a game explanation message with Multiple Choice questions', async () => {
        await element(by.text('Multiple Choice')).tap()
        await expect(element(by.text('Mixed'))).toBeVisible()
        await element(by.text('Mixed')).tap()
        await device.pressBack()
        await waitFor(element(by.text('You will be presented with 10 Mixed questions.'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
        await element(by.text('Mixed')).tap()
        await expect(element(by.text('True or False'))).toBeVisible()
        await element(by.text('True or False')).tap()
        await device.pressBack()
        await waitFor(element(by.text('You will be presented with 10 True or False questions.'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })
})