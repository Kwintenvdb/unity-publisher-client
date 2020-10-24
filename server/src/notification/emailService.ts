import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { NewSaleDiffsByMonth } from 'src/api/newSaleDiff';
import { EmailServiceInterface } from './emailServiceInterface';

export class EmailService implements EmailServiceInterface {
    private readonly mailTransporter: Mail;

    constructor() {
        this.mailTransporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix'
        });
    }

    sendSaleNotificationMail(email: string, newSales: NewSaleDiffsByMonth[]) {
        const text = newSales.map(salesDiff => {
            const sales = salesDiff.newSales.map(sale => {
                return `${sale.numNewSales} new sales for ${sale.packageName}. New gross: ${sale.newGross}`;
            });
            return `${salesDiff.month.name}:\n` + sales.join('\n');
        }).join('\n\n');
        this.sendMail(email, 'New sales for your Unity Assets', text);
    }

    sendMail(email: string, subject: string, text: string) {
        this.mailTransporter.sendMail({
            from: 'unity-publisher-client@raspberrypi.com',
            to: email,
            subject: subject,
            text: text
        }, (err, info) => {
            if (err) {
                console.error(err);
            }
            console.log(info);
        });
    }
}