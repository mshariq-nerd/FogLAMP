import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';

import { Observable } from 'rxjs/Rx';
import {Store} from '@ngrx/store';

import {User} from '../models/user';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'dummy.component.html',
})

export class DummyComponent {
    user: User;
    private timer:any = ''
    private xdata:{} = {}
    private errorMessage:any = ''
    options: Object;
    
    userState: Observable<User>;
   
    constructor(private router: Router, private authService: AuthService,  
    private store: Store<User>) {
            this.userState = store.select("userReducer");
            this.userState.subscribe((state) => {
            this.user = state;
        }); 
    }
   
     back() {
        this.router.navigate(['/home']);
    }
}
