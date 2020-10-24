import { Repository } from 'src/repository';
import { UserData } from './userData';

export class UserService {
    constructor(private readonly repository: Repository) {
    }

    public getUserData(): UserData {
        return this.repository.getUserData();
    }

    public setEmailAlertsEnabled(email: string, enabled: boolean) {
        this.repository.setEmailAlertsEnabled(email, enabled);
    }
}