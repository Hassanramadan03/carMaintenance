import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GlobalTokenService } from "./global-token.service";
import { ApiUrlService } from './api-url.service'
@Injectable()
export class AboutService {

  constructor(private http: Http, private tokenService: GlobalTokenService, private apiUrlService: ApiUrlService) { }

  getAbout() {
    return this.http
      .get(this.apiUrlService.getApiUrl().getAboutUs, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }
  updateAbout(body) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post(this.apiUrlService.getApiUrl().updateAboutUs,JSON.stringify(body),this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

}
