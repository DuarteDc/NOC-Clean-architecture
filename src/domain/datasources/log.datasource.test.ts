import { LogEntity, LogSeverityLevel } from "../entities/log.entinty";
import { LogDatasource } from "./log.datasource";

describe('test log datasource', () => {

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'messga from log datasource',
        origin: 'log.datasource.test.ts',
    })

    class MockLogDatasource implements LogDatasource {
        async saveLog(_log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(_severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log]
        }

    }

    test('should test the abstract class to be implements LogDatasource methods', async () => {

        const mockLogDatasouce = new MockLogDatasource()

        expect(mockLogDatasouce).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDatasouce.getLogs).toBe('function')
        expect(typeof mockLogDatasouce.saveLog).toBe('function')


        await mockLogDatasouce.saveLog(log)

        const logs = await mockLogDatasouce.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)

    })



})