import { action, computed, makeAutoObservable, observable } from "mobx";
import { User } from "oidc-client";

export interface IAuthStore {
    user: User | null,
    isLoadingUser: boolean
}


 class AuthStore implements IAuthStore {
    user: User| null = null;
    get isLoadingUser() {
        return this.user != null && !this.user.expired;
    }

    storeUser(user: User) {
        console.log('set user to storage', user);
        this.user = user;
    }

    storeUserError() {
        console.log("store user error");
    }

    constructor(){
        makeAutoObservable(this)
    }

}

export default AuthStore;

