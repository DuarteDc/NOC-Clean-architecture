
interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogsEmailUseCase {

    constructor() {

    }


    async execute(): Promise<boolean> {
        return true
    }
}