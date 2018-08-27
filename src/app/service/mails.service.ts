import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { User } from "../model/user";
import { Image } from "../model/image";
import { Pagenation } from "../model/pagination";
import { GlobalTokenService } from "./global-token.service";
import { AdminEmail } from "../model/admin-emails";

@Injectable()
export class EmailService {
    total: number;
    pagenation: Pagenation;
    adminEmail: AdminEmail;
    constructor(private http: Http, private tokenService: GlobalTokenService) { }

    addEmail(email) {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        return this.http
            .get("http://41.187.117.153:8080/addAdminEmail/" + email, { headers: header })
            .map(res => res.json());
    }


    deleteEmail(id) {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        return this.http
            .get("http://41.187.117.153:8080/addAdminEmail/" + id, { headers: header })
            .map(res => res.json());
    }


    getAllEmails() {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        return this.http
            .get("http://41.187.117.153:8080/getAdminEmail", {
                headers: header
            })
            .map(res => res.json());
    }

}