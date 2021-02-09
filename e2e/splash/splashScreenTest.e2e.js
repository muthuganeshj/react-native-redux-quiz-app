import { DEFAULT_TIME_OUT } from '../utils/constant.utils'

describe('Splash Screen', () => {
    beforeAll(async () => {
        await device.launchApp();
    })

    it('should have a loading', async () => {
        await waitFor(element(by.id('loadingSplash'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a trivia game logo', async () => {
        await waitFor(element(by.id('logoSplash'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })
})
