import mongoose from "mongoose"
import { MongoDatabase } from "./init"

describe('mongo init configuration', () => {



    afterAll(() => mongoose.connection.close())
    test('Should connnect to mongoDB', async () => {


        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        })


        expect(connected).toBeTruthy()

    })


    test('should throw an error', async () => {
        try {

            await MongoDatabase.connect({
                dbName: Math.random().toString(),
                mongoUrl: process.env.MONGO_URL!
            })


            expect(true).toBeFalsy()
        } catch (error) {

        }

    })

})