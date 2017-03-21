import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    token: any;
    user: any;

    constructor(private http: Http) { }

    register(user) {
        const jsonUser = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/users/register', jsonUser, requestOptions)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw(err));
    }

    login(username, password) {
        const loginDetails = {
            'username': username,
            'password': password
        };
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });


        return this.http.post('http://localhost:3000/users/login', loginDetails, requestOptions)
            .map((res: Response) => res.json());
    }

    profile() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ headers: headers });

        headers.append('Authorization', localStorage.getItem('token_id'));

        return this.http.get('http://localhost:3000/users/profile', requestOptions)
            .map((res: Response) => res.json());
    }

    storeUserToken(token, user) {
        this.token = localStorage.setItem('token_id', token);
        this.user = localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.clear();
    }

    loggedIn() {
        return tokenNotExpired('token_id');
    }
}
