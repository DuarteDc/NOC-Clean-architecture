import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('log model testing', () => {

    beforeAll(async () => MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: process.env.MONGO_URL!,
    }))

    afterAll(() => mongoose.connection.close())

    test('should return any logModel', async () => {

        const logData = {
            origin: 'jest.logmodel.test',
            level: 'low',
            message: 'New log form test'
        }

        const log = await LogModel.create(logData)

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }))
        await LogModel.findByIdAndDelete(log.id)
    })

    test('should return the schema object', () => {
        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function), required: true },
                level: {
                    type: expect.any(Function),
                    enum: ['low', 'medium', 'high'],
                    default: 'low'
                },
                createdAt: expect.any(Object)
            }
        ))
    })
});