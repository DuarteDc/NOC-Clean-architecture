import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entinty';

export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'


    constructor() {
        this.createLogsPath()
    }

    private createLogsPath = (): void => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, '')
        })

    }

    saveLog(newLog: LogEntity): void {
        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson)

        if (newLog.level === LogSeverityLevel.low)
            return

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8')
        return content.split('\n').map(LogEntity.fromJson)
    }

    getLogs(severityLevel: LogSeverityLevel): LogEntity[] {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.mediumLogsPath)

            default:
                throw new Error(`Level ${severityLevel} not implemented`)
        }

    }

}