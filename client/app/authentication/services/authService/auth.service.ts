import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {
    authToken: any;
    user: any;

    constructor(private http:Http) { }

    registerUser(newUser) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/register', newUser, {headers: headers})
            .map(res => res.json());
    }

    authenticateUser(user){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/authenticate', user,{headers: headers})
          .map(res => res.json());
    }

    getProfile() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('api/profile', {headers: headers})
          .map(res => res.json());
    }
    
    storeUserData(token, user){
        var t = new Date().getTime() + 60*60*1000;
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem("expires_at", JSON.stringify(t.valueOf()) );
        this.authToken = token;
        this.user = user;
    }

    loggedIn(){
        if (JSON.parse(localStorage.getItem("expires_at")) - new Date().getTime().valueOf() > 0)
            return true;
        else return false;
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}
