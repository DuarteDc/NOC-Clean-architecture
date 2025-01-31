import { EmailService } from "../../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../../entities/log.entinty"
import { LogRepository } from "../../../repository/log.repository"

interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogsEmailUseCase {

    constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) { }


    async execute(to: string | Array<string>): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithStatusLogs(to)
            if (!sent)
                throw new Error('Email log not sent')

            const newLog = new LogEntity({
                message: 'Log email sent',
                level: LogSeverityLevel.low,
                origin: 'send-emil-logs.ts'
            })

            this.logRepository.saveLog(newLog)
            return true
        } catch (error) {
            const newLog = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-emil-logs.ts'
            })
            this.logRepository.saveLog(newLog)
            return false
        }
    }
}