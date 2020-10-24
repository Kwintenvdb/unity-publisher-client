import { EmailService } from './emailService';
import { EmailServiceInterface } from './emailServiceInterface';
import { LogEmailService } from './logEmailService';

export function createEmailService(): EmailServiceInterface {
    if (process.env.NODE_ENV === 'production') {
        console.log('PROD mode, creating real email service.');
        return new EmailService();
    }
    console.log('DEV mode, creating log email service.');
    return new LogEmailService();
}
