import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'


interface SendMailOptions {
    to: string
    subject: string
    htmlBody: string
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
        const { htmlBody, subject, to } = options
        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            })
            return true
        } catch (error) {
            return false
        }
    }



}