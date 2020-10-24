import { NewSaleDiffsByMonth } from 'src/api/newSaleDiff';

export interface EmailServiceInterface {
    sendSaleNotificationMail(email: string, newSales: NewSaleDiffsByMonth[]): void;
    sendMail(email: string, subject: string, text: string): void;
}
