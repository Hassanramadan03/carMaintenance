import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { MaintenanceType } from "../model/maintenance-type";
import { GlobalTokenService } from "./global-token.service";
import { Pagenation } from "../model/pagination";

@Injectable()
export class RequestQouteService {
  total: number;
  checkOut: String;
  type: MaintenanceType;
  pagenation: Pagenation;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }
   
 
  // Services

  getAllRequestQoutes(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://192.168.1.177:8080/getAllRequestQoute", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteRequestQouteById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://192.168.1.177:8080/deleteRequestQoute/" + id, {
        headers: header
      })
      .map(res => res.json());
  }

  readRequestQouteById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://192.168.1.177:8080/findRequestQouteById/" + id, {
        headers: header
      })
      .map(res => res.json());
  }
}
