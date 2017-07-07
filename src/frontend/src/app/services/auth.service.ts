import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class AuthService {
    // private instance variable to hold base url
    private BASE_URL = 'http://localhost:8081/api/'
    private LOGIN_URL = this.BASE_URL + "auth/login"
    private ME_URL = this.BASE_URL + "example/whoami"
    private DATA_URL = this.BASE_URL + "example/data"

    constructor(private http: Http) {}
    
    /**
     *  Login method 
     * @param username  User username
     * @param password  User Password 
     */
     login(username: string, password: string) {
        let headers = new Headers({'content-type': 'application/json'})
        let options = new RequestOptions({ headers: headers })
        return this.http.post(this.LOGIN_URL, JSON.stringify({username: username, password: password}), options)
            .map((response: Response) => {
               sessionStorage.setItem('access_token', response.json().access_token)
            })
            .catch((error:Response) => Observable.throw(error.json().message || 'Server error'))
        }

     /**
      * Get SignedIn User 
      * @param token
      */
      getWhoAmi(token: string){
        let headers = new Headers({'content-type': 'application/json'})
        headers.append("authorization", token)
        let options = new RequestOptions({ headers: headers })
        return this.http.get(this.ME_URL, options)
        .map(res => res.json())
        .catch((error:Response) => Observable.throw(error.json().message || 'Server error'));
      }

    /**
      * Get assets data 
      * @param token
      */
      getData(token: string){
        let headers = new Headers({'content-type': 'application/json'})
        headers.append("authorization", token)
        let options = new RequestOptions({ headers: headers })
        return this.http.get(this.DATA_URL, options)
        .map(response => response.json())
        .catch((error:Response) => Observable.throw(error.json().message || 'Server error'));
      }
}