import { Injectable } from "@angular/core";
import { from, generate, map, Observable, of } from "rxjs";
import { UserApiGateway } from "src/app/domain/models/user/gateway/user_api_gateway";
import { User } from "src/app/domain/models/user/user";

@Injectable({
    providedIn: 'root'
})
export class UserApiService extends UserApiGateway {
    login(username: String, password: String): Observable<User> {
        let user: User = { id: 1, username: "test01", password: "test01" }
        if (username == user.username && password == user.password) {
            return of(user);
        } else {
            return new Observable(observer => {
                observer.error("Usuario o contraseña incorrecta");
            });
        }
    }

}