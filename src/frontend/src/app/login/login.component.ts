import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthService } from '../services/index';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx'

import {User} from '../models/user';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService, private store: Store<User>) {}

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }        

   /**
    *  login user
    */
   login() {
    this.authService.login(this.model.username, this.model.password).
    subscribe(
      data => {
        let token = sessionStorage.getItem("access_token")
        // Get SignedIn user details
        this.authService.getWhoAmi(token)
        .subscribe(
            data=>{
                console.log("CURRENT_USER", data);
                this.store.dispatch({ 
                    type: 'CURRENT_USER',
                    payload: data});
                this.router.navigate([this.returnUrl]);
             });
      },
      error => {
          this.alertService.error(error);
      });
    }
}
