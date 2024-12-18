export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel
    message: string
    origin: string
    createdAt?: Date
}

export class LogEntity {

    public readonly level: LogSeverityLevel
    public readonly message: string
    public readonly origin: string
    public createdAt?: Date;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options
        this.level = level
        this.message = message
        this.origin = origin
        this.createdAt = createdAt
    }

    static fromJson = (json: string): LogEntity => {
        const { level, message, origin, createdAt } = JSON.parse(json)

        const log = new LogEntity({ level, message, origin, createdAt })
        log.createdAt = new Date(createdAt)
        return log
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {

        const { level, message, origin, createdAt } = object

        return new LogEntity({ level, message, origin, createdAt })
    }

}