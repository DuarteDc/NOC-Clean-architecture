import { envs } from "./env.plugin"

describe('envs.plugin.ts', () => {


    test('should return env options', () => {

        console.log(envs)
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'duartedc17@gmail.com',
            MAILER_SECRET_KEY: 'wrfg pfon gssf rfrc',
            PROD: false,
            MONGO_URL: 'mongodb://duarte-test:password-test@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'duarte-test',
            MONGO_PASS: 'password-test'
        })
    })



    test('should return error if not found .env', async () => {

        jest.resetModules()

        process.env.PORT = 'xD'

        try {
            await import('./env.plugin');
            expect(true).toBe(false)

        } catch (error) {
            expect(`${error}`).toContain('EnvVarError: env-var: \"PORT\" should be a valid integer')
        }




    })

})
