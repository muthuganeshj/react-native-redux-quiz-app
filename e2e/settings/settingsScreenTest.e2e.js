import { DEFAULT_TIME_OUT } from '../utils/constant.utils'

describe('Settings Screen', () => {
    beforeAll(async () => {
        await device.launchApp()

        await waitFor(element(by.text('SETTINGS'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
    })

    it('should have a tab for game screen', async () => {
        await expect(element(by.text('Game'))).toBeVisible()
    })

    it('should have a tab for history screen', async () => {
        await expect(element(by.text('History'))).toBeVisible()
    })

    it('should have a tab for about screen', async () => {
        await expect(element(by.text('About'))).toBeVisible()
    })
})