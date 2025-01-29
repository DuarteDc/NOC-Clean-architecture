import { LogEntity, LogSeverityLevel } from "./log.entinty"

describe('test log entity', () => {
    const log = {
        message: 'Hello from test',
        origin: ' log.entity.ts',
        level: LogSeverityLevel.high,
        createdAt: new Date()
    }
    test('should create instance of LogEntity', () => {


        const newLog = new LogEntity(log)

        expect(newLog).toBeInstanceOf(LogEntity)
        expect(newLog).toEqual(log)


    })

    test('should create instance a LogEntity from a json', () => {
        const json = `{"level":"low","message":"Service https://google.com working","origin":"check-service-multiple.ts","createdAt":"2024-12-07T06:03:45.258Z"}`
        const log = LogEntity.fromJson(json)


        expect(log).toBeInstanceOf(LogEntity)

        expect(log.message).toBe("Service https://google.com working")
        expect(log.level).toBe("low")
        expect(log.origin).toBe("check-service-multiple.ts")
        expect(log.createdAt).toBeInstanceOf(Date)

    })

    test('should create instance a LogEntity from a object', () => {

        const newLog = LogEntity.fromObject(log)

        expect(newLog).toBeInstanceOf(LogEntity)
        expect(newLog).toEqual(log)

    })

})