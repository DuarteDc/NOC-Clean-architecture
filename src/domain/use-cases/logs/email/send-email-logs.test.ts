import { LogEntity, LogSeverityLevel } from "../../../entities/log.entinty"
import { SendEmailLogs } from "./send-email-logs"

describe('test SendEmailLogs UseCase', () => {

    const mockEmailService = {
        sendEmailWithStatusLogs: jest.fn().mockReturnValue(true)
    }
    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks())
    test('Send email with file system logs and return true', async () => {


        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)

        const sendEmailSuccess = await sendEmailLogs.execute('duartedc17@gmail.com')

        expect(sendEmailSuccess).toBeTruthy()
        expect(mockEmailService.sendEmailWithStatusLogs).toHaveBeenCalledWith(expect.any(String))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

    test('send email with file system and fail process', async () => {

        mockEmailService.sendEmailWithStatusLogs.mockResolvedValue(false)

        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)

        const sendEmailSuccess = await sendEmailLogs.execute(crypto.randomUUID())

        expect(sendEmailSuccess).toBeFalsy()
        expect(mockEmailService.sendEmailWithStatusLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            message: 'Error: Email log not sent',
            level: LogSeverityLevel.high,
            origin: 'send-emil-logs.ts'
        })
    })


})