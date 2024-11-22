import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entinty';
import { LogRepository as LogRepositoryContract } from '../../domain/repository/log.repository';

export class LogRepository implements LogRepositoryContract {

    constructor(private readonly logDatasource: LogDatasource) { }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.getLogs(severityLevel)
    }

}