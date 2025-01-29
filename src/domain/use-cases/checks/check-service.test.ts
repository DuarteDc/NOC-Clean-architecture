import { LogEntity } from "../../entities/log.entinty"
import { CheckService } from "./check-service"

describe('test CheckService UseCase', () => {

    beforeEach(() => jest.clearAllMocks())
    test('should call successCallback when fetch and returns true', async () => {

        const mockLogRepository = {
            saveLog: jest.fn(),
            getLogs: jest.fn(),
        }

        const successCallback = jest.fn()
        const errorCallback = jest.fn()

        const checkService = new CheckService(mockLogRepository, successCallback, errorCallback)

        const successCheckService = await checkService.execute('https://www.google.com.mx')
        expect(successCheckService).toBeTruthy()

        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })

    test('should call errorCallback when fail fetch and returns false', async () => {


        const mockLogRepository = {
            saveLog: jest.fn(),
            getLogs: jest.fn(),
        }

        const successCallback = jest.fn()
        const errorCallback = jest.fn()

        const checkService = new CheckService(mockLogRepository, successCallback, errorCallback)

        const successCheckService = await checkService.execute(crypto.randomUUID())
        expect(successCheckService).toBeFalsy()

        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })

})