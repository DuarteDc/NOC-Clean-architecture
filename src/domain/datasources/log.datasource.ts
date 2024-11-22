import { LogEntity, LogSeverityLevel } from "../entities/log.entinty";

export abstract class LogDatasource {

    abstract saveLog(log: LogEntity): void;
    abstract getLogs(severityLevel: LogSeverityLevel): LogEntity[];

}