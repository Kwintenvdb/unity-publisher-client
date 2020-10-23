import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class EmailService {
    private readonly mailTransporter: Mail;

    constructor() {
        this.mailTransporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix'
        });

        // transporter.sendMail({
        //     from: 'unity-publisher-client@raspberrypi.com',
        //     to: 'kwintenvdberghe@gmail.com',
        //     subject: 'my test email',
        //     text: 'test email contents 123',
        //     // @ts-ignore
        //     path: '/usr/sbin/sendmail'
        // }, (err, info) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     console.log(info);
        // });
    }

    sendSaleNotificationMail() {
        
    }

    sendMail(subject: string, text: string) {
        this.mailTransporter.sendMail({
            from: 'unity-publisher-client@raspberrypi.com',
            to: 'kwintenvdberghe@gmail.com',
            subject: subject,
            text: text,
            // @ts-ignore
            // path: '/usr/sbin/sendmail'
        }, (err, info) => {
            if (err) {
                console.error(err);
            }
            console.log(info);
        });
    }
}