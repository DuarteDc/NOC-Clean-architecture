import { CheckService } from "../domain/use-cases/checks/CheckService"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepository } from "../infrastructure/repositories/log.repository"
import { CronService } from "./cron/cron-service"

const fileSystemRepository = new LogRepository(new FileSystemDatasource())

export class Server {

    public static start() {
        console.log('Server runnig...')

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://google.com'
            new CheckService(fileSystemRepository, () => console.log(`${url} is ok`), error => console.log(error)).execute(url)
        })
    }

}