import nodemailer from 'nodemailer'

export default class MailService {
    /**
     * Send an email
     */
    private static async sendEmail(
        to: string,
        subject: string,
        body: string,
    ): Promise<void> {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const { user, pass } = await nodemailer.createTestAccount()

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user, // generated ethereal user
                pass, // generated ethereal password
            },
        })

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to, // list of receivers
            subject, // Subject line
            html: body, // html body
        })

        console.log('Message sent: %s', info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    /**
     * Send user email creation
     */
    public static async sendUserEmailCreation(
        nickname: string,
        email: string,
    ): Promise<void> {
        return MailService.sendEmail(
            email,
            'Account creation',
            `
            Hello, ${nickname} !

            Your account has been successfully created ;)
            `,
        )
    }
}
