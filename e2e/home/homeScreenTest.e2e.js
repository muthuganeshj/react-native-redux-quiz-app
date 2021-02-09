import { DEFAULT_TIME_OUT } from '../utils/constant.utils'

describe('Start Game Screen', () => {
    beforeAll(async () => {
        await device.launchApp()
    })

    it('should have a welcome message', async () => {
        await waitFor(element(by.text('Welcome to the Trivia Challenge!'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a game explanation message', async () => {
        await waitFor(element(by.text('You will be presented with 10 True or False questions.'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a challenge game message', async () => {
        await waitFor(element(by.text('Can you score 100%?'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a begin button', async () => {
        await waitFor(element(by.text('BEGIN'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })

    it('should have a settings button', async () => {
        await waitFor(element(by.text('SETTINGS'))).toBeVisible().withTimeout(DEFAULT_TIME_OUT)
    })
})
