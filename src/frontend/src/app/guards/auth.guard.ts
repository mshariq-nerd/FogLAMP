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
    constructor(private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('access_token')){
            // active session available so return true
            return true;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}