import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { MaintenanceType } from "../model/maintenance-type";
import { GlobalTokenService } from "./global-token.service";
import { Pagenation } from "../model/pagination";

@Injectable()
export class ContactUsService {
  total: number;
  checkOut: String;
  type: MaintenanceType;
  pagenation: Pagenation;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }
   
 
  // Services

  getAllContacts(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://192.168.1.177:8080/getAllContactUs", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteContactById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://192.168.1.177:8080/deleteContactUs/" + id, {
        headers: header
      })
      .map(res => res.json());
  }

  readContactById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://192.168.1.177:8080/findContactUsById/" + id, {
        headers: header
      })
      .map(res => res.json());
  }
}
