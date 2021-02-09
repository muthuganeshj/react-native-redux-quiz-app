import { DEFAULT_TIME_OUT } from '../utils/constant.utils'

describe('History settings Screen', () => {
    beforeAll(async () => {
        await device.launchApp()

        await waitFor(element(by.text('SETTINGS'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
        await waitFor(element(by.text('History'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('History')).tap()
    })

    it('should have a list with quiz history', async () => {
        await waitFor(element(by.id('gameHistoryList'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })
})