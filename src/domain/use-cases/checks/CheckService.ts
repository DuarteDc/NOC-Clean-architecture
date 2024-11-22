import { LogEntity, LogSeverityLevel } from "../../entities/log.entinty"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void


export class CheckService implements CheckServiceUseCase {

    constructor(private readonly logRepository: LogRepository, private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) {

    }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url)
            if (req.ok) throw new Error(`Error on check service ${url}`)
            this.successCallback()
            const log = new LogEntity(LogSeverityLevel.low, `Service ${url} working`)
            this.logRepository.saveLog(log)
            return true;
        } catch (error) {
            const errorMessage = `${error}`
            const log = new LogEntity(LogSeverityLevel.high, errorMessage)
            this.logRepository.saveLog(log)
            this.errorCallback(errorMessage)
            return false
        }

    }

}