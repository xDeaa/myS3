import nodemailer from 'nodemailer'
import { ForgotPassword, User } from '../entities';

export default class MailService {
    /**
     * Send an email
     */
    private static async sendEmail(
        to: string,
        subject: string,
        body: string,
    ): Promise<boolean> {
        const { EMAIL_USER, EMAIL_PASSWORD } = process.env
        if (!EMAIL_USER || !EMAIL_PASSWORD) {
            return false;
        }
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            },
        })

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"MyS3" <${EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject: `MyS3: ${subject}`, // Subject line
            html: body, // html body
        })
        return info !== undefined
    }

    /**
     * Send user email creation
     */
    public static sendUserEmailCreation(
        nickname: string,
        email: string,
    ): Promise<boolean> {
        return MailService.sendEmail(
            email,
            'Account creation',
            `
            Hello, ${nickname} !

            Your account has been successfully created ;)
            `,
        )
    }

    /**
     * Send user forgot password email
     */
    public static sendUserForgotPassword(
        user: User,
        forgotPass: ForgotPassword
    ): Promise<boolean> {
        return MailService.sendEmail(
            user.email,
            'Forgot password',
            `
            Hello, ${user.nickname} !

            It's seem that you forgot your password, to reset it follow this link: http://localhost/forgot_password?token=${forgotPass.token}
            `,
        )
    }

    /**
     * Send user password updated
     */
    public static sendUserPasswordUpdated(user: User): Promise<boolean> {
        return MailService.sendEmail(
            user.email,
            'Password Updated',
            `
            Hello, ${user.nickname} !

            Your password has been successfully updated !
            `,
        )
    }
}
