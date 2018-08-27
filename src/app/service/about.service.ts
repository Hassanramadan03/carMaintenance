import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class AboutService {
  
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  

  getAbout() {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://192.168.1.177:8080/aboutUs", {
        headers: header
      })
      .map(res => res.json());
  }

  
}
