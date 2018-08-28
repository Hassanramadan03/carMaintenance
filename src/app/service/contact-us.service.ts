import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { MaintenanceType } from "../model/maintenance-type";
import { GlobalTokenService } from "./global-token.service";
import { Pagenation } from "../model/pagination";
import { ApiUrlService } from './api-url.service'

@Injectable()
export class ContactUsService {
  total: number;
  checkOut: String;
  type: MaintenanceType;
  pagenation: Pagenation;
  constructor(private http: Http, private tokenService: GlobalTokenService, private apiUrlService: ApiUrlService) { }


  getAllContacts(pagenation: Pagenation) {
    return this.http
      .post(this.apiUrlService.getApiUrl().getAllContactUs, pagenation, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  deleteContactById(id) {
    return this.http
      .get(this.apiUrlService.getApiUrl().deleteContactUs + id, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  readContactById(id) {
    return this.http
      .get(this.apiUrlService.getApiUrl().findContactUsById + id, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }
}
