import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log-datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepository } from "../infrastructure/repositories/log.repository"
import { CronService } from "./cron/cron-service"

const mongoLogRepository = new LogRepository(
    new MongoLogDatasource()
)
const fileSystemLogRepository = new LogRepository(
    new FileSystemDatasource()
)
const postgreLogRepository = new LogRepository(
    new PostgresLogDatasource()
)

export class Server {

    public static start() {
        console.log('Server runnig...')

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://google.com'
            new CheckServiceMultiple([mongoLogRepository, fileSystemLogRepository, postgreLogRepository],
                () => console.log(`${url} is ok`),
                error => console.log(error))
                .execute(url)
        })
    }

}