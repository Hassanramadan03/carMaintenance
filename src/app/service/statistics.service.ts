import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class StatisticsService {
  total: number;
  checkOut: String;

  constructor(private http: Http, private tokenService: GlobalTokenService) {}

  getStatistic() {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .get("http://localhost:8080/totalCount", { headers: header })
      .map(res => res.json());
  }
}
