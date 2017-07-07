import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {User} from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {
    user: User;
    userState: Observable<User>;
    private objectStateSubscription: Subscription;
    constructor(private router: Router, private store: Store<User>) {
            this.userState = store.select("userReducer");
            this.objectStateSubscription = this.userState.subscribe((state) => {
            this.user = state;
            console.log("User: ", this.user);
        });
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.user) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}