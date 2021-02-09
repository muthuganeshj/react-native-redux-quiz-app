import { DEFAULT_TIME_OUT } from '../utils/constant.utils'

describe('About settings Screen', () => {
    beforeAll(async () => {
        await device.launchApp()

        await waitFor(element(by.text('SETTINGS'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('SETTINGS')).tap()
        await waitFor(element(by.text('About'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
        await element(by.text('About')).tap()
    })

    it('should have a user profile picture', async () => {
        await waitFor(element(by.id('userProfilePicture'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a user name', async () => {
        await waitFor(element(by.id('userName'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a user location', async () => {
        await waitFor(element(by.id('userLocation'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a user description', async () => {
        await waitFor(element(by.id('userDescription'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })
})