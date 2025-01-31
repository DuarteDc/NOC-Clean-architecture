import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'

interface SendMailOptions {
    to: string | Array<string>
    subject: string
    htmlBody: string,
    attachments: Array<Attachment>
}

interface Attachment {
    fileName: string,
    path: string
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { htmlBody, subject, to, attachments = [] } = options
        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithStatusLogs(to: string | Array<string>) {
        const subject = 'Server logs';
        const htmlBody = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Server logs</title>
                    </head>
                    <body>
                        <h1>Server Logs</h1>
                        <section>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, quia laboriosam, porro nesciunt molestias
                                aspernatur nemo ab sed nam fugit ullam quis odio. Eaque, repellat sapiente! Earum officiis blanditiis
                                veniam!</p>
                        </section>
                    </body>
                    </html>`;

        const attachments: Array<Attachment> = [
            { fileName: 'logs-all.log', path: './logs/logs-high.log' },
            { fileName: 'logs-low.log', path: './logs/logs-low.log' }
        ]

        return this.sendEmail({ to, subject, attachments, htmlBody })
    }

}