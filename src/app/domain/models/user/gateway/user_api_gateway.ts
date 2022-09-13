import { Observable } from 'rxjs';
import { User } from '../user';


export abstract class UserApiGateway {
    abstract login(username: String, password: String): Observable<User>;
} 