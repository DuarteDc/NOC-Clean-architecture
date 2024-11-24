export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public createdAt: Date;

    constructor(public level: LogSeverityLevel, public message: string) {
        this.createdAt = new Date()
    }

    static fromJson = (json: string): LogEntity => {
        const { level, message, createdAt } = JSON.parse(json)

        const log = new LogEntity(level, message)
        log.createdAt = new Date(createdAt)
        return log
    }

}