import { CheckServiceMultiple } from "./check-service-multiple"

describe('test CheckServiceMultiple UseCase', () => {


    test('should call successCallback and returns true', async () => {
        const mockMultipleRepository = [{
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }, {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }]

        const mockSuccessCallback = jest.fn()
        const mockErrorCallback = jest.fn()

        const checkMultipleService = new CheckServiceMultiple(mockMultipleRepository, mockSuccessCallback, mockErrorCallback);

        const successCheckService = await checkMultipleService.execute('https://www.google.com.mx');

        expect(successCheckService).toBeTruthy()
        expect(mockSuccessCallback).toHaveBeenCalledTimes(1)
        expect(mockErrorCallback).not.toHaveBeenCalled()

        expect(mockMultipleRepository[0].saveLog).toHaveBeenCalled()
        expect(mockMultipleRepository[1].saveLog).toHaveBeenCalled()
    })

    test('should call errorCallback and returns false', async () => {

        const mockMultipleRepository = [{
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }, {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }]

        const mockSuccessCallback = jest.fn()
        const mockErrorCallback = jest.fn()

        const checkMultipleService = new CheckServiceMultiple(mockMultipleRepository, mockSuccessCallback, mockErrorCallback);

        const successCheckService = await checkMultipleService.execute(crypto.randomUUID());

        expect(successCheckService).toBeFalsy()
        expect(mockSuccessCallback).not.toHaveBeenCalled()
        expect(mockErrorCallback).not.toHaveBeenCalledTimes(2)

        expect(mockMultipleRepository[0].saveLog).toHaveBeenCalled()
        expect(mockMultipleRepository[1].saveLog).toHaveBeenCalled()

    })


})