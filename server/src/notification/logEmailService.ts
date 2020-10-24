import { NewSaleDiffsByMonth } from 'src/api/newSaleDiff';
import { EmailServiceInterface } from './emailServiceInterface';

export class LogEmailService implements EmailServiceInterface {
    sendSaleNotificationMail(email: string, newSales: NewSaleDiffsByMonth[]): void {
        console.log('LOG: New sales', newSales);

    }
    sendMail(email: string, subject: string, text: string): void {
        console.log(`LOG: Sending email to ${email}, subject: ${subject}, text: ${text}`);
    }
}