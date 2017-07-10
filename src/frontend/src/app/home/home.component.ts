import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';

import { Observable } from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {User} from '../models/user';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
})

export class HomeComponent {
    user: User;
    private timer:any = ''
    private xdata:{} = {}
    private errorMessage:any = ''
    options: Object;
    userState: Observable<User>;
   
    constructor(private router: Router, private authService: AuthService,  
    private store: Store<User>) {
            this.userState = store.select("userReducer");
            this.userState.subscribe((user) => {
                this.user = user;
            });
        this.options = {
            minValue: 0,
            maxValue: 255,
            // width: 300,
            // height: 300
        }
        this.options['data-type']="radial-gauge";
    }
     ngOnInit() {
         
     }
    
    /**
     *  Signout the current user
     */
     logOut() {
        // remove access token and logged in user from session storage
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    next(){
        this.router.navigate(['/dummy']);
    }
    
    startCollecting(){
        console.log("Collecting ...")
        let theToken = sessionStorage.getItem('access_token')
        this.authService.getData(theToken)
        .subscribe(
            (data) => { this.xdata = data; },
            (error) => { this.errorMessage = <any>error },
            () => console.log(this.xdata)
        );
        console.log(this.xdata)
    }
    start(){
        clearInterval(this.timer)
        this.timer = setInterval(function () {
            this.startCollecting()
        }.bind(this), 2000);  
    }
    stop(){
        clearInterval(this.timer)
    }

    ngOnDestroy() {
      clearInterval(this.timer)
    }
}
