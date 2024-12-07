import { CheckService } from "../domain/use-cases/checks/check-service"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log-datasource"
import { LogRepository } from "../infrastructure/repositories/log.repository"
import { CronService } from "./cron/cron-service"

const mongoLogRepository = new LogRepository(
    // new FileSystemDatasource()
    new MongoLogDatasource()
)

export class Server {

    public static start() {
        console.log('Server runnig...')

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://google.com'
            new CheckService(mongoLogRepository,
                () => console.log(`${url} is ok`),
                error => console.log(error))
                .execute(url)
        })
    }

}