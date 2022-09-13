import { Injectable } from "@angular/core";
import { from, generate, map, Observable, of } from "rxjs";
import { UserLocalGateway } from "src/app/domain/models/user/gateway/user_local_gateway";
import { User } from "src/app/domain/models/user/user";
import { NAME_STORAGE } from "../../helpers/maps/common/name_store";

@Injectable({
    providedIn: 'root'
})
export class UserLocalService extends UserLocalGateway {
    getUser(): User | null {
        let user: User | null = null;

        let res = localStorage.getItem(NAME_STORAGE.user_store);
        if (res == null) {
            user = null;
        } else {
            user = JSON.parse(res)
        }
        return user
    }
    saveUser(user: User): boolean {
        localStorage.setItem(NAME_STORAGE.user_store, JSON.stringify(user))
        return true
    }
    removeUser(): boolean {

        localStorage.removeItem(NAME_STORAGE.user_store)
        return true;
    }


}