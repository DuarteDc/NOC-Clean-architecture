import { LogEntity, LogSeverityLevel } from "../../entities/log.entinty"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    private readonly filePathExecution: string;

    constructor(private readonly logRepository: Array<LogRepository>, private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) {
        this.filePathExecution = this.getCurrentFilePath()
    }

    private callLogs(log: LogEntity) {
        this.logRepository.forEach(logRepositoty => {
            logRepositoty.saveLog(log)
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) throw new Error(`Error on check service ${url}`)
            this.successCallback && this.successCallback()
            const log = new LogEntity({ level: LogSeverityLevel.low, message: `Service ${url} working`, origin: this.filePathExecution })
            this.callLogs(log)
            return true;
        } catch (error) {
            const errorMessage = `${error}`
            const log = new LogEntity({ level: LogSeverityLevel.high, message: errorMessage, origin: this.filePathExecution })
            this.callLogs(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }
    }

    private getCurrentFilePath(): string {
        const absoluteFilePath = __filename
        const fileName = absoluteFilePath.split('/').pop()
        return fileName!
    }

}