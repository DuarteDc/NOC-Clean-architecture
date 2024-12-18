import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entinty";


const prismaClient = new PrismaClient();

const severityLogEnum = {
    "low": SeverityLevel.LOW,
    "medium": SeverityLevel.MEDIUM,
    "high": SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityLogEnum[log.level]
        await prismaClient.logModel.create({
            data: {
                ...log,
                level,
            }
        })
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: severityLogEnum[severityLevel]
            }
        })
        return logs.map(LogEntity.fromObject)
    }

}