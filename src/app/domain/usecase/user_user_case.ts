import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserApiGateway } from '../models/user/gateway/user_api_gateway';
import { UserLocalGateway } from '../models/user/gateway/user_local_gateway';
import { User } from '../models/user/user';

@Injectable({
    providedIn: 'root'
})

export class UserUseCases {

    private user: BehaviorSubject<User | null>;
    constructor(private _userApiGateWay: UserApiGateway, private _userLocalGateway: UserLocalGateway) {
        this.user = new BehaviorSubject<User | null>(_userLocalGateway.getUser());
    }
    onlogin(username: String, password: String): Observable<User> {
        //TODO: En este sitio podríamos manejar las configuraciones 
        //en cache
        return this._userApiGateWay.login(username, password);
    }

    saveUser(user: User): void {
        this._userLocalGateway.saveUser(user);
        this.user.next(user)
    }
    getUser(): Observable<User | null> {
        return this.user.asObservable();
    }

    removeUser() {
        this._userLocalGateway.removeUser()
        this.user.next(null)
    }
    public get currentUserValue(): User | null {
        return this.user.value;
    }

}