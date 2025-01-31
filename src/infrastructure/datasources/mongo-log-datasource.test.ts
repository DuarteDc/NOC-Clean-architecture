import mongoose from "mongoose"
import { envs } from "../../config/plugins/env.plugin"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entinty"
import { MongoLogDatasource } from "./mongo-log-datasource"

describe('Tetst mongoLogDatasource', () => {

    afterEach(async () => {
        await LogModel.deleteMany()
    })

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterAll(() => mongoose.connection.close())

    const mongoLogDatasource = new MongoLogDatasource()
    const log = {
        message: 'Test mongo saving',
        origin: 'mongo-log-datasource.ts',
        level: LogSeverityLevel.low,
        createdAt: new Date()
    }
    test('Test save log in MongoDB', async () => {

        const logSpy = jest.spyOn(console, 'log')

        await mongoLogDatasource.saveLog(log)

        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith("Test mongo saving")
    })

    test('should get logs', async () => {

        await mongoLogDatasource.saveLog(log)
        await mongoLogDatasource.saveLog(log)

        const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.low)

        expect(logs.length).toBe(2)
        expect(logs[1].level).toBe(LogSeverityLevel.low)
        expect(logs).toContainEqual(expect.any(LogEntity))

    })


})