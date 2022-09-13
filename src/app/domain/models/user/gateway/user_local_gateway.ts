import { Observable } from 'rxjs';
import { User } from '../user';

export abstract class UserLocalGateway {
    abstract getUser(): User | null;
    abstract saveUser(user: User): boolean;
    abstract removeUser(): boolean;

} 