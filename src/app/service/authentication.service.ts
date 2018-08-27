import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {

    myAccount: any;

    setToken(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    public token: string;
    public status;
    MyAccount: User = null;

    constructor(private http: Http, private route: ActivatedRoute,
        private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('geyushiUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string) {
        let header = new Headers();

        header.append('Content-Type', 'application/json');
        return this.http.post('http://192.168.1.177:8080/login', { username: username, password: password }, { headers: header })
            .map(res => res.json());
    }



    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('geyushiUser');

        this.router.navigate(['/login']);
    }
}